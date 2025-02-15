import { whoIsLoggedIn } from "./account-handler.js";
import User from "./User.js"
import Book from "./Book.js"
import NoticeHandler from "./NoticeHandler.js";

//--Parte di script che viene eseguita subito
//Controllo se l'utente è loggato e con che account
const loggedInUser = whoIsLoggedIn();
let isLoggedIn = true;
if (loggedInUser != null) {
    var user = new User();
    user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
} else {
    isLoggedIn = false;
    window.location.href = "./sign-in.html";
}
//Controllo i libri nella libreria per mostrarli
if (isLoggedIn) {
    updateBookList(0);
}

//--Dichiarazione funzioni
function areBooksEqual (firstBook, secondBook) {
    if ((firstBook.title == secondBook.title) && (firstBook.author == secondBook.author)) {
        return true;
    } else {
        return false;
    }
}

function updateBookList (startingIndex) {
    let library = user.library;
    var booksList = document.getElementById("booksList");
    var bookListEntry;
    var bookListEntryText;
    
    for (let i=startingIndex; i<library.length; i++) {
        bookListEntry = document.createElement('li');
        bookListEntryText = document.createTextNode(`${library[i].title} (${library[i].author})`);
        bookListEntry.appendChild(bookListEntryText);
        booksList.appendChild(bookListEntry);
        document.querySelector("#booksList li:last-child").id = library[i].uniqueID;
    }
}
//--Event listener
document.getElementById("addBookButton").addEventListener("click", addBook);

//--Funzioni legate a event listener
function addBook () { //Ascolta l'evento click su #addBookButton
    let titolo = Math.random();
    let autore = Math.random();
    let newBook = new Book (titolo, autore);
    let library = user.library;
    let isNew = true;
    
    for (let i=0; i<library.length; i++) {
        if (areBooksEqual(newBook, library[i])) {
            NoticeHandler.showError(null, "Book already exists", 3000)
            isNew = false;
            break;
        }
    }
    if (isNew) {
        user.library.push(newBook);
        localStorage.setItem(`user+${loggedInUser}`, JSON.stringify(user));
        updateBookList(library.length-1);
    }
}

function removeBook () {

}