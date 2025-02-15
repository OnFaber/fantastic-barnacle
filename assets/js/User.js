class User {
  constructor(email, password, username, resetCode) {
    this.credentials = {
      email: email,
      password: password,
      username: username,
      resetCode: resetCode,
    };
    this.registrationTime = new Date();
    this.library = [];
  }
}

export default User;
