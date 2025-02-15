import NoticeHandler from "./NoticeHandler.js";
import { SignInForm } from "./Forms.js";

//--Parte dello script eseguita al caricamento
//Controllo se l'utente si è appena registrato per mostrargli il messaggio di successo
const urlParams = new URLSearchParams(window.location.search);
const redirectedSignUp = urlParams.has("newUser");
if (redirectedSignUp) {
  const email = urlParams.get("newUser");
  const user = JSON.parse(localStorage.getItem(`user+${email}`));
  const resetCode = user.credentials.resetCode;
  NoticeHandler.showSuccess(null, `Signed up successfully.\nLog in now`, 5000);
}

//--Event listener
const signInForm = new SignInForm(document.signInForm);
document.signInForm.addEventListener("submit", checkFormInputs);

function checkFormInputs(event) {
  event.preventDefault();
  let isAuthenticated = true;
  const emailValue = signInForm.emailField.value;
  const user = JSON.parse(localStorage.getItem(`user+${emailValue}`));
  if (user != null) { //Questo fa anche da validazione della mail per via del modo in cui è costruita la key
    const savedPassword = user.credentials.password;

    //Validazione password
    if (savedPassword != signInForm.passwordField.value) {
      isAuthenticated = false;
      NoticeHandler.showError(signInForm.passwordField, "Wrong password", 3000);
    }

    //Controllo remember me
    let rememberMe = false;
    if (signInForm.rememberMeCheckbox.checked) {
      rememberMe = true;
    }

    //Autenticazione (se la validazione password va a buon fine)
    if (isAuthenticated) {
      if (rememberMe) {
        localStorage.setItem(`authenticatedUser`, JSON.stringify(emailValue));
        redirect(`/index.html`);
      } else {
        sessionStorage.setItem(`authenticatedUser`, JSON.stringify(emailValue));
        redirect(`/index.html`);
      }
    }
  } else {
    NoticeHandler.showError(signInForm.emailField, "User not found", 3000);
  }
}

function redirect(url) {
  window.location.href = url;
}
