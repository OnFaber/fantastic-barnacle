import ErrorHandler from "./ErrorHandler.js";
import { ResetPasswordForm } from "./Forms.js";

const resetPasswordForm = new ResetPasswordForm(document.resetPasswordForm);
document.resetPasswordForm.addEventListener("submit", checkFormInputs);

function checkFormInputs(event) {
    event.preventDefault();
    
    const emailValue = resetPasswordForm.emailField.value;
    let user = JSON.parse(localStorage.getItem(`user+${emailValue}`));
    
    if (user != null) { //Questo fa anche da validazione della mail per via del modo in cui è costruita la key
        const savedResetCode = user.credentials.resetCode;
        
        //Validazione codice di reset
        if (savedResetCode != resetPasswordForm.resetCodeField.value) {
            ErrorHandler.showError(resetPasswordForm.resetCodeField, "Wrong code", 3000);
        } else { //Reset della password
            user.credentials.password = "changeMe!";
            localStorage.setItem(`user+${emailValue}`, JSON.stringify(user));
            window.alert(`Password reset successfully.\nYour new password is "${user.credentials.password}"`);
        }

    } else {
        ErrorHandler.showError(resetPasswordForm.emailField, "User not found", 3000);
    }
}

function redirect(url) {
    window.location.href = url;
}