class User {
  constructor(email, password, resetCode, registrationDate, library = []) {
    this.credentials = {
      email: email,
      password: password,
      resetCode: resetCode,
    };
    this.registrationDate = registrationDate;
    this.library = library;
  }
}

export default User;
