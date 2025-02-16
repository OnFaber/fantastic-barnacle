class Form {
  constructor(formElement) {
    this.form = formElement;
  }
}

class SignUpForm extends Form {
  constructor(formElement) {
    super(formElement);
    this.usernameField = this.form.username;
    this.emailField = this.form.email;
    this.passwordField = this.form.password;
    this.privacyPolicyCheckbox = this.form.privacyPolicyCheckbox;
    this.privacyPolicyCustomCheckbox = document.getElementById("signUpFormCustomCheckbox");
  }
}

class SignInForm extends Form {
  constructor(formElement) {
    super(formElement);
    this.usernameField = this.form.username;
    this.passwordField = this.form.password;
    this.rememberMeCheckbox = this.form.rememberMeCheckbox;
    this.rememberMeCustomCheckbox = document.getElementById("signInFormCustomCheckbox");
  }
}

class ResetPasswordForm extends Form {
  constructor (formElement) {
    super(formElement);
    this.usernameField = this.form.username;
    this.resetCodeField = this.form.resetCode;
    this.passwordField = this.form.password;
  }
}

class AddBookForm extends Form {
  constructor (formElement) {
    super(formElement)
    this.titleField = this.form.title;
    this.authorField = this.form.author;
    this.coverImageSrcField = this.form.coverImageSrc;
  }
}
export { Form, SignUpForm, SignInForm, ResetPasswordForm, AddBookForm };
