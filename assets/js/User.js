class User {
    constructor (email, password, registrationDate, library = []) {
        this.credentials = {
            email: email,
            password: password,
        }
        this.registrationDate = registrationDate;
        this.library = library;
    }
}

export default User;