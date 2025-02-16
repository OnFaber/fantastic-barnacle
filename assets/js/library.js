import AccountHandler from "./AccountHandler.js";
import User from "./User.js"
import Book from "./Book.js"
import NoticeHandler from "./NoticeHandler.js";
import { AddBookForm } from "./Forms.js";
import HTMLGenerator from "./HTMLGenerator.js";

//--Parte di script che viene eseguita subito
//Leggo dall'url quale libreria va mostrata
const urlParams = new URLSearchParams(window.location.search);
const hasUserParam = urlParams.has("user");
var showingOwnLibrary = true;
var loggedInUser = AccountHandler.whoIsLoggedIn() //Restituisce l'username dell'utente loggato (null se nessuno)
if (hasUserParam) { //Se l'url indica una libreria
    const userParam = urlParams.get("user");
    if (userParam == "me") { //user=me quando l'utente loggato va sulla sua libreria dalla homepage
        if (loggedInUser == null) { //Se non c'è nessun utente loggato (inatteso in questa situazione)
            window.location.href = "./sign-in.html" //Reindirizzo al login
        } else { //Se è loggato carico i suoi dati
            var user = new User();
            user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
        }
    } else { //Se user!=me devo controllare di quale utente devo mostrare la libreria
        if ((loggedInUser != null) && (userParam == loggedInUser)) { //Anche se il parametro user!=me la libreria potrebbe comunque essere la sua
            //In questo caso lo reindirizzo alla sua con user=me
            window.location.href = "./library.html?user=me"
        } else { //Se la libreria non è dell'utente attuale
            showingOwnLibrary = false; //Flag che indica che la libreria da mostrare non è dell'utente attuale
            var username = userParam;
            var user = new User();
            user = JSON.parse(localStorage.getItem(`user+${username}`));
            if (user == null) { //Se la libreria richiesta è di un utente che non esiste
                //Lo reindirizzo alla sua libreria (questo lo riporta al login se non loggato)
                window.location.href = "./library.html?user=me"
            }
        }
    }
} else { //Se l'url non indica nessuna libreria (inatteso) reindirizzo alla homepage
    window.location.href = "./index.html";
}

//Mostro la libreria richiesta
if (showingOwnLibrary) { //Se è la libreria dell'utente loggato
    updateBookList(); //Carico la lista dei libri
} else { //Se sta visualizzando la libreria di qualcun'altro
    document.getElementById("addBookForm").classList.add("hidden"); //Nascondo il form di aggiunta libri
    //Carico la lista dei libri e ne salvo la lunghezza
    const libraryLenght = updateBookList();
    //Modifico il titolo della pagina
    document.getElementById("libraryTitle").innerText = `${username}'s library`;
    //Modifico l'header primario per mostrare il nome dell'utente
    document.getElementById("libraryIdentifierPrimaryHeader").innerText = `${username}'s library`;
    //Modifico l'header secondario per mostrare il nome dell'utente o indicare che non ci sono libri
    if (libraryLenght != 0) {
        document.getElementById("libraryIdentifierSecondaryHeader").innerText = `${username}'s books:`;
    } else {
        document.getElementById("libraryIdentifierSecondaryHeader").innerText = `${username} doesn't have any book yet`;
    }
    //Mostro un messaggio che indica che si sta visualizzando una libreria altrui
    NoticeHandler.showMessage(null, "This is not <a href='./library.html?user=me'>your library<a>", 0, true);
}
//Istanzio l'oggetto form
const addBookForm = new AddBookForm(document.addBookForm);

//--Dichiarazione funzioni
function areBooksEqual (firstBookID, secondBookID) {
    if (firstBookID == secondBookID) {
        return true;
    } else {
        return false;
    }
}

function updateBookList () { //Mostra la lista dei libri e ne ritorna la lunghezza
    let booksList = document.getElementById("booksList");
    let bookListEntry;
    //Pulisco tutta la lista per poi riscriverla
    booksList.innerHTML = '';
    //Ciclo su tutti i libri per creare ogni li
    for (let i=0; i<user.library.length; i++) {
        //Controllo se il libro ha un url per la copertina
        //E in caso positivo creo l'html da inserire nel li
        if (user.library[i].coverImageSrc!="") {
            var img = `<div class="coverImageContainer">
            <img src=${user.library[i].coverImageSrc} class="coverImage">
            </div>`
        } else {
            img = "";
        }
        //Creazione del li
        let innerHTML =
        `<div class="bookContainer">
        <!-- Qui viene inserito il div per l'img di copertina se presente -->
        ${img}
        <!-- -->
        <div class="bookInfoContainer">
        ${user.library[i].title} (${user.library[i].author})
        </div>
        <button class="removeBookButton">Remove</button>
        </div>`;
        let bookListEntry = HTMLGenerator.generateLastChild (booksList, "li", innerHTML, user.library[i].uniqueID, "bookListEntry")
        if (showingOwnLibrary) { //Solo se la libreria visualizzata è quella dell'utente loggato
            //Assegno al bottone un id derivato da quello del li che indica il libro
            //In modo da poter recuperare l'id del li da event.target.id del bottone
            //In particolare lo recupero togliendo gli ultimi 7 caratteri (-button)
            bookListEntry.querySelector("button").id = `${user.library[i].uniqueID}-button`;
            //--Aggiungo event listener per rimuovere il libro quando viene cliccato il bottone
            document.getElementById(`${user.library[i].uniqueID}-button`).addEventListener("click", removeBook);
        } else { //Altrimenti, se sto visualizzando la libreria di un altro utente, nascondo il bottone
            bookListEntry.querySelector("button").classList.add("hidden");
        }
    }
    return user.library.length;
}
//--Event listener
document.addBookForm.addEventListener("submit", addBook);

//--Funzioni legate a event listener
function addBook (event) { //Ascolta l'evento submit del form addBookForm
    event.preventDefault();
    let titleField = addBookForm.titleField, title = titleField.value;
    let authorField = addBookForm.authorField, author = authorField.value;
    let coverImageSrcField = addBookForm.coverImageSrcField, coverImageSrc = coverImageSrcField.value;
    if (title != "" && author != "") {
        let newBook = new Book (title, author, coverImageSrc);
        let isNew = true;
        
        for (let i=0; i<user.library.length; i++) {
            if (areBooksEqual(newBook.uniqueID, user.library[i].uniqueID)) {
                NoticeHandler.showError(null, "Book already exists", 3000)
                isNew = false;
                break;
            }
        }
        if (isNew) {
            user.library.push(newBook);
            document.addBookForm.title.value = "";
            document.addBookForm.author.value = "";
            document.addBookForm.coverImageSrc.value="";
            localStorage.setItem(`user+${loggedInUser}`, JSON.stringify(user));
            updateBookList();
        }
    } else if (title == "" ) {
        NoticeHandler.showError(addBookForm.titleField, "Empty title", 3000);
    } else if (author == "") {
        NoticeHandler.showError(addBookForm.authorField, "Empty author", 3000)
    }
}

function removeBook (event) {  //Ascolta l'evento click sul bottone associato al libro
    //Recupero il uniqueID del libro da rimuovere. L'id del bottone che genera l'evento
    //è come quello del libro ma con 7 caratteri in più alla fine
    const targetBookId = (event.target.id).slice(0,-7);
    //Scorro l'array e tolgo il libro con uniqueId che corrisponde a quello derivato dal bottone cliccato
    for (let i=0; i<user.library.length; i++) {
        if (areBooksEqual(user.library[i].uniqueID, targetBookId)) {
            user.library.splice(i, 1);
            break
        }
    }
    //Riscrivo la lista dei libri in storage
    localStorage.setItem(`user+${loggedInUser}`, JSON.stringify(user));
    //Pulisce e riscrive la lista dei libri ora che è stata aggiornata
    updateBookList()
}