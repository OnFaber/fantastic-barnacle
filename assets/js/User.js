class User {
  constructor(email, password, resetCode, library = []) {
    this.credentials = {
      email: email,
      password: password,
      resetCode: resetCode,
    };
    this.registrationTime = new Date();
    this.library = library;
  }
}

export default User;
