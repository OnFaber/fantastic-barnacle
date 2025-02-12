class Form {
  constructor(formElement) {
    this.form = formElement;
    this.email = this.form.email;
    this.password = this.form.password;
  }
}

class SignUpForm extends Form {
  constructor(formElement) {
    super(formElement);
    this.privacyPolicyCheckbox = this.form.privacyPolicyCheckbox;
    this.privacyPolicyCustomCheckbox = document.getElementById(
      "signUpFormCustomCheckbox",
    );
  }
}

class SignInForm extends Form {
  constructor(formElement) {
    super(formElement);
    this.rememberMeCheckbox = this.form.rememberMeCheckbox;
    this.rememberMeCustomCheckbox = document.getElementById("signUpFormCustomCheckbox",
    );
  }
}
export { Form, SignUpForm, SignInForm };
