class AccountHandler {
    //Controllo che utente è loggato
    static whoIsLoggedIn () {
        let authenticatedUserSession = JSON.parse(localStorage.getItem("authenticatedUser"));
        if (authenticatedUserSession != null) {
            return authenticatedUserSession; //Ritorno l'username dell'utente loggato
        }
        let authenticatedUserLocal = JSON.parse(sessionStorage.getItem("authenticatedUser")); 
        if (authenticatedUserLocal != null) {
            return authenticatedUserLocal; //Ritorno l'username dell'utente loggato
        }
        return null; //Ritorno null se non è loggato nessun utente
    }
}

export default AccountHandler;