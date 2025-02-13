import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";
import { ResetPasswordForm } from "./Forms.js";

const resetPasswordForm = new ResetPasswordForm(document.resetPasswordForm);
document.resetPasswordForm.addEventListener("submit", checkFormInputs);

function checkFormInputs(event) {
    event.preventDefault();
    
    const emailValue = resetPasswordForm.emailField.value;
    let user = JSON.parse(localStorage.getItem(`user+${emailValue}`));
    
    if (user != null) { //Questo fa anche da validazione della mail per via del modo in cui è costruita la key
        const savedResetCode = user.credentials.resetCode;
        const passwordValue = resetPasswordForm.passwordField.value;
        
        //Validazione codice di reset
        if (savedResetCode != resetPasswordForm.resetCodeField.value) {
            ErrorHandler.showError(resetPasswordForm.resetCodeField, "Wrong code", 3000);
        } else { //Validazione del formato della nuova password
            const passwordError = Validators.validatePassword(passwordValue);
            if (passwordError.length > 0) {
                passwordError.forEach((message) => {
                    ErrorHandler.showError(resetPasswordForm.passwordField, message, 3000);
                });
            } else {
                user.credentials.password = passwordValue;
                localStorage.setItem(`user+${emailValue}`, JSON.stringify(user));
                window.alert(`Password reset successfully.\nYour new password is "${user.credentials.password}"`);
            }
        }
        
    } else {
        ErrorHandler.showError(resetPasswordForm.emailField, "User not found", 3000);
    }
}

function redirect(url) {
    window.location.href = url;
}