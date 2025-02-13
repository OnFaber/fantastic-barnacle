//--Blocco eseguito al caricamento dello script
//Controllo se sulla pagina corrente c'è il bottone di logout
const logOutButton = document.getElementById("logOutButton");
//Se c'è aggiunto un event listener per il click
if (logOutButton != null) document.getElementById("logOutButton").addEventListener("click", logOut);

//Controllo se l'utente è loggato
let authenticatedUserLocal = JSON.parse(localStorage.getItem("authenticatedUser"));
let authenticatedUserSession = JSON.parse(sessionStorage.getItem("authenticatedUser"));
if (authenticatedUserSession != null) {
    console.log("Ciao, sei loggato come "+authenticatedUserSession);
} else if (authenticatedUserLocal != null) {
    console.log("Ciao, sei loggato come "+authenticatedUserLocal);
} else {
    console.log("Non sei loggato");
}

//--Funzioni legate a eventi
function logOut (event) { //Ascolta l'evento click di #logOutButton
    let authenticatedUserLocal = JSON.parse(localStorage.getItem("authenticatedUser"));
    let authenticatedUserSession = JSON.parse(sessionStorage.getItem("authenticatedUser"));
    if (authenticatedUserSession != null) {
        sessionStorage.removeItem("authenticatedUser");
        window.location.href = "./index.html";
    } else if (authenticatedUserLocal != null) {
        localStorage.removeItem("authenticatedUser");
        window.location.href = "./index.html";
    }
}