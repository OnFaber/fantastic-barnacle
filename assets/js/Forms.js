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
export { Form, SignUpForm, SignInForm };
