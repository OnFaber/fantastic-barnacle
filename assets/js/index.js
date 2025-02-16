import AccountHandler from "./AccountHandler.js";
import User from "./User.js";
import HTMLGenerator from "./HTMLGenerator.js";

//--Parte di script eseguita subito
//-Decido cosa mostrare in base allo stato di login
//Controllo se l'utente è loggato e con che account
const loggedInUser = AccountHandler.whoIsLoggedIn(); //Restituisce l'username dell'utente loggato (null se nessuno)
var isLoggedIn = (loggedInUser != null) //Se è loggato ho true
//-Mostro la lista degli utenti o l'avviso che non ce ne sono
//Prendo l'elemento main della homepage
let indexMain = document.getElementById("indexMain")
//Carico la lista di tutti gli utenti registrati
let registeredUsers = AccountHandler.loadUsers();
if (registeredUsers.length == 0) { //--Se non ci sono utenti registrati
  //Mostro l'header che indica mancanza di utenti
  HTMLGenerator.generateLastChild (indexMain, "h2", "There are no users yet...");
} else { //--Se ci sono utenti registrati
  //Ordino l'array degli utenti registrati
  //Secondo l'ordine discendente del numero di libri nella loro libreria
  registeredUsers.sort((a, b) => b.library.length - a.library.length);
  //Genero una lista in cui mostrarli
  const header = HTMLGenerator.generateLastChild (indexMain, "h2");
  const usersList = HTMLGenerator.generateLastChild(header, "ul", `Top ${Math.min(10, AccountHandler.countUsers())} users:`, "homepageUserList");
  //Inserisco nella lista i primi 10
  for (let i=0; i<Math.min(10, AccountHandler.countUsers()); i++) {
    //Carico username e numero di libri in libreria di ogni utente
    let thisUserUsername = registeredUsers[i].credentials.username;
    const thisUserLibraryLength = registeredUsers[i].library.length
    let thisUserLibraryHref = `./library.html?user=${thisUserUsername}`;
    if (isLoggedIn) { //Se c'è un utente loggato
      let user = new User();
      user = new User();
      user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
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
//Popolo la sidebar e aggiungo gli event listener
HTMLGenerator.populateSidebar("homepage", isLoggedIn);