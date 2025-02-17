class Book {
    constructor (title, author, coverImageSrc="") {
        this.title = String(title);
        this.author = String(author);
        this.coverImageSrc = coverImageSrc;
        this.uniqueID = (this.title+"-"+this.author).replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1') // Escapa i caratteri speciali
        .replace(/(^[0-9])/, '\\$1') // Escapa il primo carattere se è un numero
        .replace(/ /g, '-'); // Sostituisce gli spazi con '-'
    }
}

export default Book;