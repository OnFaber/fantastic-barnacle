class HTMLGenerator {
    //Metodo che genera un elemento HTML e lo appende
    //Come ultimo figlio del parent indicato
    static generateLastChild (parent, elementType="div", innerHTML="", elementID="", elementClass="") {
        //Creazione dell'elemento
        let element = document.createElement(elementType);
        //Aggiunta della classe
        if (elementClass != "") bookListEntry.classList.add("bookListEntry");
        //Aggiunta dell'HTML interno
        element.innerHTML = innerHTML;
        //Aggiunta dell'elemento all'interno del genitore (come ultimo figlio)
        parent.appendChild(element);
        //Aggiunta di un id univoco all'elemento
        if (elementID != "") element.id = elementID;
    }
}

export default HTMLGenerator;