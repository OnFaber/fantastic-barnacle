class Form {
  constructor(formElement) {
    this.form = formElement;
  }
}

class SignUpForm extends Form {
  constructor(formElement) {
    super(formElement);
    this.emailField = this.form.email;
    this.passwordField = this.form.password;
    this.privacyPolicyCheckbox = this.form.privacyPolicyCheckbox;
    this.privacyPolicyCustomCheckbox = document.getElementById("signUpFormCustomCheckbox");
  }
}

class SignInForm extends Form {
  constructor(formElement) {
    super(formElement);
    this.emailField = this.form.email;
    this.passwordField = this.form.password;
    this.rememberMeCheckbox = this.form.rememberMeCheckbox;
    this.rememberMeCustomCheckbox = document.getElementById("signUpFormCustomCheckbox");
  }
}

class ResetPasswordForm extends Form {
  constructor (formElement) {
    super(formElement);
    this.emailField = this.form.email;
    this.resetCodeField = this.form.resetCode;
    this.passwordField = this.form.password;
  }
}

class AddBookForm extends Form {
  constructor (formElement) {
    super(formElement)
    this.titleField = this.form.title;
    this.authorField = this.form.author;
  }
}
export { Form, SignUpForm, SignInForm, ResetPasswordForm, AddBookForm };
