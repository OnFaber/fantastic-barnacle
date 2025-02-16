//--Blocco eseguito al caricamento dello script
document.getElementById("logOutButton").addEventListener("click", logOut);

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