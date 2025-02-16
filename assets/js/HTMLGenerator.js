import Sidebar from "./Sidebar.js";

class HTMLGenerator {
    //Metodo che genera un elemento HTML e lo inserisce
    //Come figlio di indice index del parent indicato (se non fornito, come ultimo)
    //E ne restituisce il riferimento
    static generateChildAtPosition (parent, elementType="div", innerHTML="", elementID="", elementClass="", index=-1) {
        //Creazione dell'elemento
        let element = document.createElement(elementType);
        //Aggiunta della classe
        if (elementClass != "") element.classList.add(elementClass);
        //Aggiunta dell'HTML interno
        element.innerHTML = innerHTML;
        //Aggiunta di un id univoco all'elemento
        if (elementID != "") element.id = elementID;
        //Aggiunta dell'elemento all'interno del genitore
        if ((index) >= 0 && (index < parent.children.length)) { //All'indice indicato se valido
            parent.insertBefore(element, parent.children[index]);
        } else { //Altrimenti come ultimo figlio
            parent.appendChild(element);
        }
        //Restituisco il riferimento all'elemento creato
        return element;
    }
    
    //Metodo che genera un elemento HTML e lo appende
    //Come ultimo figlio del parent indicato
    //E ne restituisce il riferimento
    static generateLastChild (parent, elementType="div", innerHTML="", elementID="", elementClass="") {
        let element = this.generateChildAtPosition (parent, elementType, innerHTML, elementID, elementClass, -1);
        return element;
    }
    
    //Metodo che genera gli elementi della sidebar
    //Prende in input la pagina corrente e lo stato di login
    static populateSidebar (currentPage, isLoggedIn, showingOwnLibrary = false) {
        //Aggiunge event listener ai bottoni della sidebar
        Sidebar.addListeners();
        const sidebarList = document.getElementById("sidebarList");
        
        if (currentPage == "library") {
            this.generateLastChild(sidebarList, "li", "<a href='./index.html'>Homepage</a>");
            if (isLoggedIn && !showingOwnLibrary) this.generateLastChild(sidebarList, "li", "<a href='./library.html?user=me'>Library</a>");
            this.#showAccountLink(isLoggedIn);
        }
        if (currentPage == "homepage") {
            if (isLoggedIn) this.generateLastChild(sidebarList, "li", "<a href='./library.html?user=me'>Library</a>");
            this.#showAccountLink(isLoggedIn);
        }
        if (currentPage == "account") {
            this.generateLastChild(sidebarList, "li", "<a href='./index.html'>Homepage</a>");
            this.generateLastChild(sidebarList, "li", "<a href='./library.html?user=me'>Library</a>");
        }
    }
    
    //Genera html per link a sign in e sign up oppure your account
    static #showAccountLink (isLoggedIn) {
        if (!isLoggedIn) {
            this.generateLastChild(sidebarList, "li", "<a href='./sign-in.html'>Sign in</a>");
            this.generateLastChild(sidebarList, "li", "<a href='./sign-up.html'>Sign up</a>");
        } else {
            this.generateLastChild(sidebarList, "li", "<a href='./account.html'>Account</a>");
        }
    }
}

export default HTMLGenerator;