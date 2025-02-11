//--Script relativi al form di accesso

//--Event listener
//Ascolta per l'evento di submit del form e di default passa event come primo argomento al checkFormInputs
document.signInForm.addEventListener("submit", checkFormInputs);

//--Funzioni
//Funzione che ascolta l'evento click del bottone submit
function checkFormInputs (event) { //event è passato di default come primo argomento dall'event listener
    const form = document.signInForm;
    const emailField = form.email, email = emailField.value; 
    const passwordField = form.password, password = passwordField.value;
    
    //Validazione password
    if(!validatePassword(password)) {
        passwordField.classList.add("error");
        passwordField.focus();
        event.preventDefault();
    } else {
        passwordField.classList.remove("error");
    }
    //Validazione email
    if(!validateEmail(email)) {
        emailField.classList.add("error");
        emailField.focus();
        event.preventDefault();
    } else {
        emailField.classList.remove("error");
    }
}

//Funzione che controlla se la password rispetta i requisiti stabiliti
function validatePassword (password) {
    const isPasswordEmpty = (password == "");

    return (!isPasswordEmpty);
    
}

//Funzione che controlla se l'email rispetta i requisiti stabiliti
function validateEmail (email) {
    const emailPattern = /[^@.+]+@[a-zA-Z]+\.[a-zA-Z]+/ //Formato di una mail valida
    
    if (!emailPattern.test(email)) { //Controllo che il formato sia corretto
        return false;
    } else {
        return true;
    }
}