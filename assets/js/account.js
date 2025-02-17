import HTMLGenerator from "./HTMLGenerator.js"
import AccountHandler from "./AccountHandler.js"
import NoticeHandler from "./NoticeHandler.js";

//--Blocco eseguito al caricamento dello script
//Popola la sidebar e aggiunge event listener ai suoi bottoni
HTMLGenerator.populateSidebar("account", true);
//Genero l'header h1 con il nome dell'utente
const main = document.getElementById("accountMain")
const username = AccountHandler.whoIsLoggedIn(); //Non posso aver e null perchè questa pagina non si carica se non loggato
const h1InnerHtml = `${username}'s account`
const h1 = HTMLGenerator.generateChildAtPosition(main, "h1", h1InnerHtml, 1);
//Genero l'header h2 con la data di registrazione
const registrationTime = AccountHandler.getRegistrationTime();
const registrationDate =`${registrationTime.getDate()}/${registrationTime.getMonth()+1}/${registrationTime.getFullYear()}`;
const h2InnerHtml = `Registered on ${registrationDate}`
const h2 = HTMLGenerator.generateAdjacentElement(h1, "div", h2InnerHtml, "registrationDateDiv");

//--Event listener
document.getElementById("logOutButton").addEventListener("click", AccountHandler.logout);
document.getElementById("deleteAccountButton").addEventListener("click", showDeletionConfirmation);
document.getElementById("resetCodeButton").addEventListener("click", showResetCode);

//--Funzioni legate a eventi
function showDeletionConfirmation (event) {
    const thisButton = event.target;
    HTMLGenerator.generateAdjacentElement(thisButton, "div", "Click again to confirm", "deletionConfirmationDiv");
    thisButton.removeEventListener("click", showDeletionConfirmation);
    //Qui serve una funzione freccia perchè AccountHandler.deleteAccount
    //Usa this cercando un metodo della sua classe
    thisButton.addEventListener("click", () => AccountHandler.deleteAccount());
}

function showResetCode (event) {
    const resetCode = AccountHandler.getResetCode();
    const thisButton = event.target;
    thisButton.removeEventListener("click", showResetCode);
    const div = HTMLGenerator.generateAdjacentElement(thisButton, "div", `Your reset code is ${resetCode}`, "resetCodeDiv");
    setTimeout ( () => {
        div.remove();
        thisButton.addEventListener("click", showResetCode);
    }, 3000)
}