import { whoIsLoggedIn } from "./account-handler.js";
import User from "./User.js"
import Book from "./Book.js"
import NoticeHandler from "./NoticeHandler.js";

//--Parte di script che viene eseguita subito
const loggedInUser = whoIsLoggedIn();
if (loggedInUser != null) {
    var user = new User();
    user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
} else {
    window.location.href = "./sign-in.html";
}

//--Dichiarazione funzioni
function areBooksEqual (firstBook, secondBook) {
    if ((firstBook.title == secondBook.title) && (firstBook.author == secondBook.author)) {
        return true;
    } else {
        return false;
    }
}
//--Event listener
document.getElementById("addBookButton").addEventListener("click", addBook);

//--Funzioni legate a event listener
function addBook () { //Ascolta l'evento click su #addBookButton
    let newBook = new Book ("title", "author");
    console.log(user.library);
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
    }
}