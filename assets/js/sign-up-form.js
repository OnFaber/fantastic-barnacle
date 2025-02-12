import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";
import { SignUpForm } from "./Forms.js";

const signUpForm = new SignUpForm(document.signUpForm);
document.signUpForm.addEventListener("submit", checkFormInputs);
document
.getElementById("privacyPolicyHref")
.addEventListener("click", () => {
  signUpForm.privacyPolicyCheckbox.disabled = false;
});

function checkFormInputs(event) {
  event.preventDefault();
  let isValid = true;
  
  //Validazione email
  const email = signUpForm.email.value;
  const emailError = Validators.validateEmail(email);
  if (emailError != "") {
    isValid = false;
    ErrorHandler.showError(signUpForm.email, emailError, 3000);
  } else {
    if (localStorage.getItem(`user+${email}`) != null) {
      ErrorHandler.showError(signUpForm.email, "E-Mail already used", 3000);
    }
  }
  
  if (isValid) {
    //Validazione password
    const passwordMessages = Validators.validatePassword(
      signUpForm.password.value,
    );
    if (passwordMessages.length > 0) {
      isValid = false;
      passwordMessages.forEach((message) => {
        ErrorHandler.showError(signUpForm.password, message, 3000);
      });
    }
  }
  if (isValid) { 
    //Validazione checkbox
    const privacyPolicyError = Validators.validatePrivacyPolicy(
      signUpForm.privacyPolicyCheckbox,
    );
    if (privacyPolicyError !== "") {
      isValid = false;
      /* Se usato così la classe error non scompare nello stesso tempo del messaggio dell'ErrorHandler */
      /* Ma integrare questa class list add all'error handler crea problemi */
      //signUpForm.privacyPolicyCustomCheckbox.classList.add("error");
      ErrorHandler.showError(
        signUpForm.privacyPolicyCustomCheckbox.closest(
          ".customCheckboxContainer",
        ),
        privacyPolicyError, 3000
      );
    } else {
      /* Se usato così la classe error non scompare nello stesso tempo del messaggio dell'ErrorHandler */
      /* Ma integrare questa class list add all'error handler crea problemi */
      //signUpForm.privacyPolicyCustomCheckbox.classList.remove("error");
    }
  }
  
  if (isValid) {
    const user = {
      credentials: {
        email: signUpForm.email.value,
        password: signUpForm.password.value,
      },
      isAuthenticated: true,
      rememberMe: false,
    };
    localStorage.setItem(`user+${user.credentials.email}`, JSON.stringify(user));
    redirect(`/sign-in.html`);
  }
}

function redirect(url) {
  window.location.href = url;
}