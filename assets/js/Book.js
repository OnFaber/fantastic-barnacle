class Book {
    constructor (title, author) {
        this.title = String(title);
        this.author = String(author);
        this.uniqueID = this.title+"-"+this.author;
    }
}

export default Book;