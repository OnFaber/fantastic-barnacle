import ErrorHandler from "./ErrorHandler.js";
import { SignInForm } from "./Forms.js";

const signInForm = new SignInForm(document.signInForm);
document.signInForm.addEventListener("submit", checkFormInputs);

function checkFormInputs(event) {
    event.preventDefault();
    let isAuthenticated = true;
    const email = signInForm.email.value;
    let user = JSON.parse(localStorage.getItem(`user+${email}`));
    if (user != null) { //Questo fa anche da validazione della mail
        const savedPassword = user.credentials.password
        
        //Validazione password
        //Validazione della corrispondenza
        if (savedPassword != signInForm.password.value) {
            isAuthenticated = false;
            ErrorHandler.showError(signInForm.password, "Password errata", 3000);
        }
        
        //Controllo remember me
        let rememberMe = false;
        if (signInForm.rememberMeCheckbox.checked) {
            rememberMe = true;
        }
        
        //Autenticazione (se la validazione password va a buon fine)
        if (isAuthenticated) {
            user.isAuthenticated = true;
            user.rememberMe = rememberMe;
            localStorage.setItem(`user+${email}`, JSON.stringify(user));
            redirect(`/index.html`);
        }
    } else {
        ErrorHandler.showError(signInForm.email, "Utente non registrato", 3000);
    }
}

function redirect(url) {
    window.location.href = url;
}