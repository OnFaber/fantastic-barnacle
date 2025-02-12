import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";
import { SignUpForm } from "./SignUpForm.js";

const signUpForm = new SignUpForm(document.signUpForm);
/**
 * Funzione che gestisce l'evento di submit del form di registrazione.
 * Esegue la validazione dei campi di input (password, email e privacy policy) e
 * mostra i messaggi di errore appropriati utilizzando la classe `ErrorHandler`.
 * Se uno dei campi non è valido, impedisce l'invio del form.
 *
 * @param {Event} event - L'evento di submit del form. È passato di default dal listener dell'evento.
 *
 * @returns {void} Non restituisce nulla, ma previene l'invio del form in caso di errori di validazione.
 *
 * @see {@link Validators} per la validazione della password e dell'email.
 * @see {@link ErrorHandler} per la gestione della visualizzazione degli errori.
 *
 */
function checkFormInputs(event) {
  event.preventDefault();
  let isValid = true;

  //Validazione password
  const passwordMessages = Validators.validatePassword(
    signUpForm.password.value,
  );
  if (passwordMessages.length > 0) {
    isValid = false;
    passwordMessages.forEach((message) => {
      ErrorHandler.showError(signUpForm.password, message);
    });
  }

  //Validazione email
  const emailError = Validators.validateEmail(signUpForm.email.value);
  if (emailError != "") {
    isValid = false;
    ErrorHandler.showError(signUpForm.email, emailError);
  }

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
    );
  } else {
    signUpForm.privacyPolicyCustomCheckbox.classList.remove("error");
  }

  if (isValid) {
    const user = {
      email: signUpForm.email.value,
      password: signUpForm.password.value,
    };
    localStorage.setItem("user", JSON.stringify(user));
    redirect(`/index.html`);
  }
}

function redirect(url) {
  window.location.href = url;
}

document.signUpForm.addEventListener("submit", checkFormInputs);
