import { whoIsLoggedIn } from "./account-handler.js";
import User from "./User.js"
import Book from "./Book.js"
import NoticeHandler from "./NoticeHandler.js";
import { AddBookForm } from "./Forms.js";

//--Parte di script che viene eseguita subito
//Leggo dall'url quale libreria va mostrata
const urlParams = new URLSearchParams(window.location.search);
const hasUserParam = urlParams.has("user");
var showingOwnLibrary = true;
var loggedInUser = whoIsLoggedIn() //Restituisce la mail dell'utente loggato (null se nessuno)
if (hasUserParam) { //Se l'url indica una libreria
    const userParam = urlParams.get("user");
    if (userParam == "me") { //user=me quando l'utente loggato va sulla sua libreria dalla homepage
        if (loggedInUser == null) { //Se non c'è nessun utente loggato (inatteso in questa situazione)
            window.location.href = "./index.html" //Reindirizzo alla homepage
        } else { //Se è loggato carico i suoi dati
            var user = new User();
            user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
        }
    } else { //Se user!=me devo controllare di quale utente devo mostrare la libreria
        if ((loggedInUser != null) && (userParam == loggedInUser)) { //Anche se il parametro user!=me la libreria potrebbe comunque essere la sua
            window.location.href = "./library.html?user=me" //In questo caso lo reindirizzo alla sua
        } else { //Se la libreria non è dell'utente attuale
            showingOwnLibrary = false; //Flag che indica che la libreria da mostrare non è dell'utente attuale
            const email = userParam;
            var user = new User();
            user = JSON.parse(localStorage.getItem(`user+${email}`));
            if (user == null) { //Se la libreria richiesta è di un utente che non esiste
                window.location.href = "./library.html?user=me" //Lo reindirizzo alla sua (homepage se non loggato)
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
    NoticeHandler.showMessage(null, "This is not your library", 3000);
    updateBookList(); //Carico la lista dei libri
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

function updateBookList () {
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
        bookListEntry = document.createElement('li');
        bookListEntry.classList.add("bookListEntry")
        bookListEntry.innerHTML =
        `<div class="bookContainer">
        <!-- Qui viene inserito il div per l'img di copertina se presente -->
        ${img}
        <!-- -->
        <div class="bookInfoContainer">
        ${user.library[i].title} (${user.library[i].author})
        </div>
        <button class="removeBookButton">Remove</button>
        </div>`;
        //Aggiunta del li alla lista
        booksList.appendChild(bookListEntry);
        //Aggiunta di un id univoco al li appena creato
        
        bookListEntry.id = user.library[i].uniqueID;
        
        //Assegno al bottone un id derivato da quello del li che indica il libro
        //In modo da poter recuperare l'id del li da event.target.id del bottone
        //In particolare lo recupero togliendo gli ultimi 7 caratteri (-button)
        bookListEntry.querySelector("button").id = `${user.library[i].uniqueID}-button`;
        //--Event listener per rimuovere il libro quando viene cliccato il bottone
        document.getElementById(`${user.library[i].uniqueID}-button`).addEventListener("click", removeBook);
    }
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