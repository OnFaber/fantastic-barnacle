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
    
    //Effettua il logout
    static logout () {
        let authenticatedUserSession = JSON.parse(sessionStorage.getItem("authenticatedUser"));
        if (authenticatedUserSession != null) {
            sessionStorage.removeItem("authenticatedUser");
            window.location.href = "./index.html";
        } else {
            localStorage.removeItem("authenticatedUser");
            window.location.href = "./index.html";
        }
    }
    
    //Carica la lista di tutti gli utenti registrati
    static loadUsers () {
        let registeredUsers = [];
        for (let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key != "authenticatedUser") registeredUsers[i] = JSON.parse(localStorage.getItem(key));
        }
        return registeredUsers;
    }
    
    //Ritorna il numero di utenti registrati
    static countUsers () {
        let count = 0;
        for (let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key != "authenticatedUser") count++;
        }
        return count;
    }
}

export default AccountHandler;