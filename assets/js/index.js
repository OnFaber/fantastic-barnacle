import AccountHandler from "./AccountHandler.js";
import User from "./User.js";
import HTMLGenerator from "./HTMLGenerator.js";

//--Costanti
const openBtn = document.getElementById("open_sidebar");
const closeBtn = document.getElementById("close_sidebar");
const sidebar = document.querySelector(".sidebar");

//--Event listener
openBtn.addEventListener("click", () => {
  sidebar.classList.remove("hidden");
  openBtn.classList.add("hidden");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.add("hidden");
  openBtn.classList.remove("hidden");
});

//--Funzioni eseguite subito
//-Decido cosa mostrare in base allo stato di login
//Controllo se l'utente è loggato e con che account
const loggedInUser = AccountHandler.whoIsLoggedIn();
let user = null;
if (loggedInUser != null) { //Se è loggato
  //Carico i suoi dati dal local storage
  user = new User();
  user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
  //Inserisco il link al suo account
  document.getElementById("homepageYourAccountHref").innerHTML =
    "<a href='./account.html'>Your account<a>";
} else {
  //Se non è loggato
  //Nascondo il link alla propria libreria
  document.getElementById("indexYourLibraryListItem").classList.add("hidden");
  //Inserisco il link alla pagina di sign in
  document.getElementById("homepageYourAccountHref").innerHTML =
    "<a href='./sign-in.html'>Sign in<a>";
}

//-Mostro la lista degli utenti o l'avviso che non ce ne sono
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
    //Carico username e numero di libri in libreria di ogni utente
    let thisUserUsername = registeredUsers[i].credentials.username;
    const thisUserLibraryLength = registeredUsers[i].library.length
    let thisUserLibraryHref = `./library.html?user=${thisUserUsername}`;
    if (user != null) { //Se c'è un utente loggato
      if (user.credentials.username == thisUserUsername) { //Controllo se è questo utente
        thisUserUsername += " (you)"; //Se lo è appendo "(you)" all'username che mostrerò
        thisUserLibraryHref = `./library.html?user=me`; //E modifico il link per indirizzare alla sua libreria
      }
    }
    //Costruisco le informazioni da mostrare sull'utente 
    const userDisplayedInfo = `<a href="${thisUserLibraryHref}">${thisUserUsername}</a> - ${thisUserLibraryLength} books`;
    //Genero la list entry con le informazioni sull'utente
    HTMLGenerator.generateLastChild(usersList, "li", userDisplayedInfo);
  }
}