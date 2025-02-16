class HTMLGenerator {
    //Metodo che genera un elemento HTML e lo appende
    //Come ultimo figlio del parent indicato
    //E ne restituisco il riferimento
    static generateLastChild (parent, elementType="div", innerHTML="", elementID="", elementClass="") {
        //Creazione dell'elemento
        let element = document.createElement(elementType);
        //Aggiunta della classe
        if (elementClass != "") element.classList.add(elementClass);
        //Aggiunta dell'HTML interno
        element.innerHTML = innerHTML;
        //Aggiunta dell'elemento all'interno del genitore (come ultimo figlio)
        parent.appendChild(element);
        //Aggiunta di un id univoco all'elemento
        if (elementID != "") element.id = elementID;
        //Restituisco il riferimento all'elemento creato
        return element;
    }
    
    //Metodo che genera gli elementi della sidebar
    //Prende in input la pagina corrente e lo stato di login
    static populateSidebar (currentPage, isLoggedIn) {
        const sidebarList = document.getElementById("sidebarList");

        if (currentPage == "library") {
            this.generateLastChild(sidebarList, "li", "<a href='./index.html'>Homepage<a>");
            this.#showAccountLink(isLoggedIn);
        }
        if (currentPage == "homepage") {
            if (isLoggedIn) this.generateLastChild(sidebarList, "li", "<a href='./library.html?user=me'>Your library<a>");
            this.#showAccountLink(isLoggedIn);
        }
    }

    //Genera html per link a sign in o your account
    static #showAccountLink (isLoggedIn) {
        if (!isLoggedIn) {
            this.generateLastChild(sidebarList, "li", "<a href='./sign-in.html'>Sign in<a>");
        } else {
            this.generateLastChild(sidebarList, "li", "<a href='./account.html'>Your account<a>");
        }
    }
}

export default HTMLGenerator;