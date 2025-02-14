import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";
import { SignUpForm } from "./Forms.js";
import User from "./User.js";

const signUpForm = new SignUpForm(document.signUpForm);
document.signUpForm.addEventListener("submit", checkFormInputs);
document.getElementById("privacyPolicyHref").addEventListener("click", () => {
  signUpForm.privacyPolicyCheckbox.disabled = false;
});

function checkFormInputs(event) {
  event.preventDefault();
  let isValid = true;
  const emailValue = signUpForm.emailField.value,
    passwordValue = signUpForm.passwordField.value;
  //Validazione email
  const emailError = Validators.validateEmail(emailValue);
  if (emailError != "") {
    isValid = false;
    ErrorHandler.showError(signUpForm.emailField, emailError, 3000);
  } else {
    if (localStorage.getItem(`user+${emailValue}`) != null) {
      isValid = false;
      ErrorHandler.showError(
        signUpForm.emailField,
        "E-Mail already used",
        3000,
      );
    }
  }

  if (isValid) {
    //Validazione password
    const passwordError = Validators.validatePassword(passwordValue);
    if (passwordError.length > 0) {
      isValid = false;
      passwordError.forEach((message) => {
        ErrorHandler.showError(signUpForm.passwordField, message, 3000);
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
        privacyPolicyError,
        3000,
      );
    } else {
      signUpForm.privacyPolicyCustomCheckbox.classList.remove("error");
    }
  }
  //Se è tutto valido, registro l'utente
  if (isValid) {
    const date = new Date();
    const registrationTime = date.getTime(); // sembra inutilizzato...
    const resetCode = Math.round(Math.random() * (10000 - 1000) + 1000);
    // registration time conviene inizializzarlo nella classe user direttamente?
    const user = new User(emailValue, passwordValue, resetCode, date);
    localStorage.setItem(
      `user+${user.credentials.email}`,
      JSON.stringify(user),
    );
    redirect(`/sign-in.html?newUser=${encodeURIComponent(emailValue)}`);
  }
}

function redirect(url) {
  window.location.href = url;
}
