class User {
  constructor(username, email, password, resetCode) {
    this.credentials = {
      username: username,
      email: email,
      password: password,
      resetCode: resetCode,
    };
    this.registrationTime = new Date();
    this.library = [];
  }
}

export default User;
