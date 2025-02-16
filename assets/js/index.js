import AccountHandler from "./AccountHandler.js";
import User from "./User.js";
import HTMLGenerator from "./HTMLGenerator.js";

//--Costanti
const toggleBtn = document.getElementById("toggle_sidebar");
const closeBtn = document.getElementById("close_sidebar");
const sidebar = document.querySelector(".sidebar");

//--Event listener
toggleBtn.addEventListener("click", () => {
  sidebar.classList.remove("hidden");
  toggleBtn.classList.add("hidden");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.add("hidden");
  toggleBtn.classList.remove("hidden");
});

//--Funzioni eseguite subito
//Prendo l'elemento main della homepage
let indexMain = document.getElementById("indexMain")
//Carico la lista di tutti gli utenti registrati
let registeredUsers = AccountHandler.loadUsers();
if (registeredUsers.length == 0) { //--Se non sono utenti registrati
  //-Mostro l'immagine di sfondo
  indexMain.classList.remove("noImage");
  //-E l'header che indica mancanza di utenti
  HTMLGenerator.generateLastChild (indexMain, "h1", "There are no users yet...");
} else { //--Se ci sono utenti registrati
  //Ordino l'array degli utenti registrati
  //Secondo l'ordine discendente del numero di libri nella loro libreria
  registeredUsers.sort((a, b) => b.library.length - a.library.length);
  //Genero una lista in cui mostrarli
  const header = HTMLGenerator.generateLastChild (indexMain, "h1", "");
  const usersList = HTMLGenerator.generateLastChild(header, "ul", `Top ${Math.min(10, registeredUsers.length)} users:`);
  //Inserisco nella lista i primi 10
  for (let i=0; i<Math.min(10, registeredUsers.length); i++) {
    const userDisplayedInfo = `${registeredUsers[i].credentials.username} - ${registeredUsers[i].library.length} books`;
    console.log (userDisplayedInfo);
    HTMLGenerator.generateLastChild(usersList, "li", userDisplayedInfo);
  }
}

//Controllo se l'utente è loggato e con che account
const loggedInUser = AccountHandler.whoIsLoggedIn();
if (loggedInUser != null) { //Se è loggato
  //Carico i suoi dati dal local storage
  var user = new User();
  user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
  //Inserisco il link al suo account
  document.getElementById("homepageYourAccountHref").innerHTML = "<a href='./account.html'>Your account<a>";
} else { //Se non è loggato
  //Nascondo il link alla propria libreria
  document.getElementById("indexYourLibraryListItem").classList.add("hidden");
  //Inserisco il link alla pagina di sign in
  document.getElementById("homepageYourAccountHref").innerHTML = "<a href='./sign-in.html'>Sign in<a>";
}