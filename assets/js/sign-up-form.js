import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";
import { SignUpForm } from "./Forms.js";
import User from "./User.js"

const signUpForm = new SignUpForm(document.signUpForm);
document.signUpForm.addEventListener("submit", checkFormInputs);
document
.getElementById("privacyPolicyHref")
.addEventListener("click", () => {
  signUpForm.privacyPolicyCheckbox.disabled = false;
});

function checkFormInputs(event) {
  event.preventDefault();
  let isValid = true;
  
  //Validazione email
  const email = signUpForm.email.value;
  const emailError = Validators.validateEmail(email);
  if (emailError != "") {
    isValid = false;
    ErrorHandler.showError(signUpForm.email, emailError, 3000);
  } else {
    if (localStorage.getItem(`user+${email}`) != null) {
      ErrorHandler.showError(signUpForm.email, "E-Mail already used", 3000);
    }
  }
  
  if (isValid) {
    //Validazione password
    const password = signUpForm.password.value;
    const passwordError = Validators.validatePassword(password);
    if (passwordError.length > 0) {
      isValid = false;
      passwordError.forEach((message) => {
        ErrorHandler.showError(signUpForm.password, message, 3000);
      });
    }
  }
  if (isValid) { 
    //Validazione checkbox
    const privacyPolicyError = Validators.validatePrivacyPolicy(
      signUpForm.privacyPolicyCheckbox,
    );
    if (privacyPolicyError !== "") {
      isValid = false;
      signUpForm.privacyPolicyCustomCheckbox.classList.add("error");
      ErrorHandler.showError(
        signUpForm.privacyPolicyCustomCheckbox.closest(
          ".customCheckboxContainer",
        ),
        privacyPolicyError, 3000
      );
    } else {
      signUpForm.privacyPolicyCustomCheckbox.classList.remove("error");
    }
  }
  
  if (isValid) {
    const user = new User (signUpForm.email.value, signUpForm.password.value);
    localStorage.setItem(`user+${user.credentials.email}`, JSON.stringify(user));
    redirect(`/sign-in.html`);
  }
}

function redirect(url) {
  window.location.href = url;
}