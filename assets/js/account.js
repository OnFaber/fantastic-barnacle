import HTMLGenerator from "./HTMLGenerator.js"
import AccountHandler from "./AccountHandler.js"

//--Blocco eseguito al caricamento dello script
//Popola la sidebar e aggiunge event listener ai suoi bottoni
HTMLGenerator.populateSidebar("account", true);

//--Event listener
document.getElementById("logOutButton").addEventListener("click", AccountHandler.logout);

//--Funzioni legate a eventi