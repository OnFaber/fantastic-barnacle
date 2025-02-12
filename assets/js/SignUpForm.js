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

    document
      .getElementById("privacyPolicyHref")
      .addEventListener("click", () => {
        this.privacyPolicyCheckbox.disabled = false;
      });
  }
}

export { Form, SignUpForm };
