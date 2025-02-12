import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";
import { SignInForm } from "./Forms.js";

const signInForm = new SignInForm(document.signInForm);
document.signInForm.addEventListener("submit", checkFormInputs);

function checkFormInputs(event) {
    event.preventDefault();
    let isAuthenticated = true;
    let user = JSON.parse(localStorage.getItem("user")); 
    const savedCredentials = user.credentials
    console.log(savedCredentials);
    
    //Validazione password
    //Validazione della corrispondenza
    if (savedCredentials.password != signInForm.password.value) {
        console.log("Wrong password"); //Debug
        isAuthenticated = false;
    } else {
        console.log("Right password"); //Debug
    }
    
    //Validazione email
    //Validazione del formato
    const emailError = Validators.validateEmail(signInForm.email.value);
    if (emailError != "") {
        isAuthenticated = false;
        ErrorHandler.showError(signInForm.email, emailError);
    } else { 
        if (savedCredentials.email != signInForm.email.value) {
            console.log("Wrong email"); //Debug
            isAuthenticated = false;
        } else {
            console.log("Right email"); //Debug
        }
    }
    
    //Controllo remember me
    let rememberMe = false;
    if (signInForm.rememberMeCheckbox.checked) {
        rememberMe = true;
    }
    console.log(rememberMe); //Debug
    
    //Autenticazione
    if (isAuthenticated) {
        user.isAuthenticated = true;
        user.rememberMe = rememberMe;
        localStorage.setItem("user", JSON.stringify(user));
        redirect(`/index.html`);
    }
}

function redirect(url) {
    window.location.href = url;
}