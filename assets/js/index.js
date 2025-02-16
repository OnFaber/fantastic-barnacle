import AccountHandler from "./AccountHandler.js";
import User from "./User.js";

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