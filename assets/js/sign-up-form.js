import ErrorHandler from "./ErrorHandler.js";
import Validators from "./Validators.js";
import { SignUpForm } from "./SignUpForm.js";

const signUpForm = new SignUpForm(document.signUpForm);

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
