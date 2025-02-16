import NoticeHandler from "./NoticeHandler.js";
import Validators from "./Validators.js";
import { ResetPasswordForm } from "./Forms.js";

const resetPasswordForm = new ResetPasswordForm(document.resetPasswordForm);
document.resetPasswordForm.addEventListener("submit", checkFormInputs);

function checkFormInputs(event) {
  event.preventDefault();
  
  const usernameValue = resetPasswordForm.usernameField.value;
  let user = JSON.parse(localStorage.getItem(`user+${usernameValue}`));
  
  if (user != null) { //Questo fa anche da validazione dell'username per via del modo in cui è costruita la key
    const savedResetCode = user.credentials.resetCode;
    const passwordValue = resetPasswordForm.passwordField.value;
    
    //Validazione codice di reset
    if (savedResetCode != resetPasswordForm.resetCodeField.value) {
      NoticeHandler.showError(
        resetPasswordForm.resetCodeField,
        "Wrong code",
        3000,
      );
    } else {
      //Validazione del formato della nuova password
      const passwordError = Validators.validatePassword(passwordValue);
      if (passwordError != "") {
        NoticeHandler.showError(resetPasswordForm.passwordField, passwordError, 3000);
      } else { //Se è tutto valido cambio la password
        user.credentials.password = passwordValue;
        localStorage.setItem(`user+${usernameValue}`, JSON.stringify(user));
        //E lo reindirizzo al login con un parametro nell'URL che indica che si è appena registrato
        redirect(`/sign-in.html?changedPassword=true`);
      }
    }
  } else {
    NoticeHandler.showError(resetPasswordForm.usernameField, "User not found", 3000);
  }
}

function redirect(url) {
  window.location.href = url;
}
