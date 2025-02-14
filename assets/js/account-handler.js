//--Blocco eseguito al caricamento dello script
//Controllo se sulla pagina corrente c'è il bottone di logout
const logOutButton = document.getElementById("logOutButton");
//Se c'è aggiunto un event listener per il click
if (logOutButton != null) document.getElementById("logOutButton").addEventListener("click", logOut);

//Controllo che utente è loggato
export function whoIsLoggedIn () {
    let authenticatedUserSession = JSON.parse(localStorage.getItem("authenticatedUser"));
    if (authenticatedUserSession != null) {
        return authenticatedUserSession;
    }
    let authenticatedUserLocal = JSON.parse(sessionStorage.getItem("authenticatedUser")); 
    if (authenticatedUserLocal != null) {
        return authenticatedUserLocal;
    }
    return null;
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