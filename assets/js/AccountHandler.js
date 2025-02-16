class AccountHandler {
    //Controlla quale utente è loggato
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
    
    //Carica la lista di tutti gli utenti registrati
    static loadUsers () {
        let registeredUsers = [];
        for (let i=0; i<localStorage.length; i++) {
            registeredUsers[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
        return registeredUsers;
    }
}

export default AccountHandler;