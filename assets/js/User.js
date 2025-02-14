class User {
  constructor(email, password, resetCode) {
    this.credentials = {
      email: email,
      password: password,
      resetCode: resetCode,
    };
    this.registrationTime = new Date();
    this.library = [];
  }
}

export default User;
