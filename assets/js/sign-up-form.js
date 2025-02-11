import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";

//--Script relativi al form di iscrizione

//--Event listener
//Ascolta per l'evento di submit del form e di default passa event come primo argomento al checkFormInputs
document.signUpForm.addEventListener("submit", checkFormInputs);
//Ascolta per l'evento di click sul link alla privacy policy
document
  .getElementById("privacyPolicyHref")
  .addEventListener("click", function enableCheckbox() {
    document.signUpForm.privacyPolicyCheckbox.disabled = false;
  });

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
  //event è passato di default come primo argomento dall'event listener
  const form = document.signUpForm;
  const emailField = form.email,
    email = emailField.value;
  const passwordField = form.password,
    password = passwordField.value;
  const privacyPolicyCheckbox = form.privacyPolicyCheckbox;
  const privacyPolicyCustomCheckbox = document.getElementById(
    "signUpFormCustomCheckbox",
  );

  //Validazione password
  const passwordMessages = Validators.validatePassword(password);
  if (passwordMessages.length > 0) {
    event.preventDefault();
    passwordMessages.forEach((message) => {
      ErrorHandler.showError(passwordField, message);
    });
  }

  //Validazione email
  const isEmailValid = Validators.validateEmail(email);
  if (!isEmailValid) {
    event.preventDefault();
    ErrorHandler.showError(emailField, "Email non valida");
  }

  //Validazione checkbox
  if (!validatePrivacyPolicy(privacyPolicyCheckbox)) {
    privacyPolicyCustomCheckbox.classList.add("error");
    privacyPolicyCheckbox.focus();
    event.preventDefault();
  } else {
    privacyPolicyCustomCheckbox.classList.remove("error");
  }
}

function validatePrivacyPolicy(privacyPolicyCheckbox) {
  // Il checkbox viene attivato dall'event listener sul click al link alla privacy policy
  // quindi se il suo stato è disabled=true non è stata aperta
  if (privacyPolicyCheckbox.disabled) {
    console.log("Privacy policy non letta"); // Debug
    return false;
  } else if (!privacyPolicyCheckbox.checked) {
    console.log("Privacy policy non accettata"); // Debug
    return false;
  } else {
    return true;
  }
}
