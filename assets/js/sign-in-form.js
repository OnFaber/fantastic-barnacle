import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";
import { SignInForm } from "./Forms.js";

const signInForm = new SignInForm(document.signInForm);
document.signInForm.addEventListener("submit", checkFormInputs);

function checkFormInputs(event) {
    event.preventDefault();
    let isAuthenticated = true;
    let user = JSON.parse(localStorage.getItem(`user+${signInForm.email.value}`));
    if (user != null) { //Questo fa anche da validazione della mail
        const savedPassword = user.credentials.password
        console.log(savedPassword);
        
        //Validazione password
        //Validazione della corrispondenza
        if (savedPassword != signInForm.password.value) {
            isAuthenticated = false;
        }
        
        //Controllo remember me
        let rememberMe = false;
        if (signInForm.rememberMeCheckbox.checked) {
            rememberMe = true;
        }
        
        //Autenticazione
        if (isAuthenticated) {
            user.isAuthenticated = true;
            user.rememberMe = rememberMe;
            localStorage.setItem("user", JSON.stringify(user));
            redirect(`/index.html`);
        }
    } else {
        ErrorHandler.showError(signInForm.email, "Utente non registrato");
    }
}

function redirect(url) {
    window.location.href = url;
}