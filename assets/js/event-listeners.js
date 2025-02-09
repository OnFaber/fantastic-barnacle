//--Questo script contiene tutti gli event listener

//--Sul form di registrazione
 //Ascolta per input nel campo password -- NON USATO AL MOMENTO
 //document.signUpForm.password.addEventListener("input", validatePassword);
 //Ascolta per l'evento di submit del form e di default passa event come primo argomento al checkFormInputs
 document.signUpForm.addEventListener("submit", checkFormInputs);
 //Ascolta per l'evento di click sul link alla privacy policy
 document.getElementById("privacyPolicyHref").addEventListener("click", function enableCheckbox() {
     document.signUpForm.privacyPolicyCheckbox.disabled = false;
 })