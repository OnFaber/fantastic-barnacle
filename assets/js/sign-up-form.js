import NoticeHandler from "./NoticeHandler.js";
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
  passwordValue = signUpForm.passwordField.value,
  usernameValue = signUpForm.usernameField.value;
  
  //Validazione username
  const usernameError = Validators.validateUsername(usernameValue);
  if (usernameError != "") {
    isValid = false;
    NoticeHandler.showError(signUpForm.usernameField, usernameError, 3000);
  }
  //Validazione email
  if (isValid) {
    const emailError = Validators.validateEmail(emailValue);
    if (emailError != "") {
      isValid = false;
      NoticeHandler.showError(signUpForm.emailField, emailError, 3000);
    }
  }
  
  /*if (isValid) {
    //Validazione password
    const passwordError = Validators.validatePassword(passwordValue);
    if (passwordError != "") {
      isValid = false;
      NoticeHandler.showError(signUpForm.passwordField, passwordError, 3000);
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
      NoticeHandler.showError(
        signUpForm.privacyPolicyCustomCheckbox.closest(
          ".customCheckboxContainer",
        ),
        privacyPolicyError,
        3000,
      );
    } else {
      signUpForm.privacyPolicyCustomCheckbox.classList.remove("error");
    }
  }*/
  //Se è tutto valido, registro l'utente
  if (isValid) {
    const date = new Date();
    //Genero un numero casuale di 4 cifre come codice di reset password
    const resetCode = Math.round(Math.random() * (10000 - 1000) + 1000);
    const user = new User(usernameValue, emailValue, passwordValue, resetCode);
    localStorage.setItem(`user+${usernameValue}`,JSON.stringify(user));
    //E lo reindirizzo al login con un parametro nell'URL che indica che si è appena registrato
    redirect(`/sign-in.html?newUser=${encodeURIComponent(usernameValue)}`);
  }
}

function redirect(url) {
  window.location.href = url;
}
