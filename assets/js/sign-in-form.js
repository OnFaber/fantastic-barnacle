import ErrorHandler from "./ErrorHandler.js";
import { SignInForm } from "./Forms.js";

const signInForm = new SignInForm(document.signInForm);
document.signInForm.addEventListener("submit", checkFormInputs);

const urlParams = new URLSearchParams(window.location.search)
const redirectedSignUp = urlParams.has("newUser");
if (redirectedSignUp) {
    const email = urlParams.get("newUser");
    const user = JSON.parse(localStorage.getItem(`user+${email}`));
    const resetCode = user.credentials.resetCode;
    window.alert(`Signed up.\nPassword reset code: ${resetCode}`)
}

function checkFormInputs(event) {
    event.preventDefault();
    let isAuthenticated = true;
    const emailValue = signInForm.emailField.value;
    const user = JSON.parse(localStorage.getItem(`user+${emailValue}`));
    if (user != null) { //Questo fa anche da validazione della mail per via del modo in cui è costruita la key
        const savedPassword = user.credentials.password
        
        //Validazione password
        if (savedPassword != signInForm.passwordField.value) {
            isAuthenticated = false;
            ErrorHandler.showError(signInForm.passwordField, "Wrong password", 3000);
        }
        
        //Controllo remember me
        let rememberMe = false;
        if (signInForm.rememberMeCheckbox.checked) {
            rememberMe = true;
        }
        
        //Autenticazione (se la validazione password va a buon fine)
        if (isAuthenticated) {
            localStorage.setItem(`authenticatedUser`, JSON.stringify(emailValue));
            redirect(`/index.html`);
        }
    } else {
        ErrorHandler.showError(signInForm.emailField, "User not found", 3000);
    }
}

function redirect(url) {
    window.location.href = url;
}