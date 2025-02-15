import { whoIsLoggedIn } from "./account-handler.js";
import User from "./User.js"
import Book from "./Book.js"
import NoticeHandler from "./NoticeHandler.js";
import { AddBookForm } from "./Forms.js";

//--Parte di script che viene eseguita subito
//Controllo se l'utente è loggato e con che account
const loggedInUser = whoIsLoggedIn();
if (loggedInUser != null) {
    var user = new User();
    user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
    updateBookList(0); //Se è loggato mostro la lista dei libri
} else {
    window.location.href = "./sign-in.html"; //Se non è loggato lo reindirizzo al login
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

    booksList.innerHTML = '';
    
    for (let i=0; i<user.library.length; i++) {
        bookListEntry = document.createElement('li');
        bookListEntry.classList.add("bookListEntry")
        bookListEntry.innerHTML =
        `<div class="bookContainer">
        <div class="coverImageContainer">
        <img src=${user.library[i].coverImageSrc} class="coverImage">
        </div>
        <div class="bookInfoContainer">
        ${user.library[i].title} (${user.library[i].author})
        </div>
        </div>`;

        booksList.appendChild(bookListEntry);
        document.querySelector("#booksList li:last-child").id = user.library[i].uniqueID;
        document.getElementById(user.library[i].uniqueID).addEventListener("click", removeBook); //--Event listener
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

function removeBook (event) {  //Ascolta l'evento click -al momento- sulla scritta che indica il libro
    for (let i=0; i<user.library.length; i++) {
        if (areBooksEqual(user.library[i].uniqueID, event.target.id)) {
            user.library.splice(i, 1);
            break
        }
    }
    localStorage.setItem(`user+${loggedInUser}`, JSON.stringify(user));
    updateBookList()
}