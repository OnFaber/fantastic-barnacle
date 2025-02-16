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
}

export default HTMLGenerator;