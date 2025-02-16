import HTMLGenerator from "./HTMLGenerator.js"
import AccountHandler from "./AccountHandler.js"

//--Blocco eseguito al caricamento dello script
//Popola la sidebar e aggiunge event listener ai suoi bottoni
HTMLGenerator.populateSidebar("account", true);

let main = document.getElementById("accountMain")
let username = AccountHandler.whoIsLoggedIn(); //Non posso aver e null perchè questa pagina non si carica se non loggato
let h1InnerHtml = `${username}'s account`
HTMLGenerator.generateChildAtPosition(main, "h1", h1InnerHtml, 1);

//--Event listener
document.getElementById("logOutButton").addEventListener("click", AccountHandler.logout);
document.getElementById("deleteAccountButton").addEventListener("click", showDeletionConfirmation);

//--Funzioni legate a eventi
function showDeletionConfirmation (event) {
    const thisButton = event.target;
    HTMLGenerator.generateAdjacentElement(thisButton, "div", "Click again to confirm", "deletionConfirmationDiv");
    thisButton.removeEventListener("click", showDeletionConfirmation);
    //Qui serve una funzione freccia perchè AccountHandler.deleteAccount
    //Usa this cercando un metodo della sua classe
    thisButton.addEventListener("click", () => AccountHandler.deleteAccount());
}