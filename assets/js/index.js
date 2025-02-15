import { whoIsLoggedIn } from "./account-handler.js";
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
const loggedInUser = whoIsLoggedIn();
if (loggedInUser != null) { //Se è loggato
  var user = new User();
  user = JSON.parse(localStorage.getItem(`user+${loggedInUser}`));
} else { //Se non è loggato
  document.getElementById("indexYourLibraryListItem").classList.add("hidden"); //Nascondo il link alla propria libreria
}