class Book {
    constructor (title, author, coverImageSrc="") {
        this.title = String(title);
        this.author = String(author);
        this.coverImageSrc = coverImageSrc;
        this.uniqueID = (this.title+"-"+this.author).split(" ").join("-");
    }
}

export default Book;