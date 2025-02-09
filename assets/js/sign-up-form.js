//--Funzioni relative al form di iscrizione

//Funzione che ascolta l'evento click del bottone submit
function checkFormInputs (event) { //event è passato di default come primo argomento dall'event listener
    const form = signUpForm;
    const username = form.username.value;
    const email = form.email.value;
    const privacyPolicyCheckbox = form.privacyPolicyCheckbox;

    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(); //Questa funzione deve leggere nel DOM ogni volta perchè viene chiamata anche senza passare da qui
    const isEmailValid = validateEmail(email);
    const isPrivacyPolicyValid = validatePrivacyPolicy(privacyPolicyCheckbox);
    
    if(!(isUsernameValid && isPasswordValid && isEmailValid && isPrivacyPolicyValid)) event.preventDefault();
}

//Funzione che controlla se l'username rispetta i requisiti stabiliti
function validateUsername (username) {   
    if (username == "") {
        return false;
    } else {
        return true;
    }
}

//Funzione che controlla se la password rispetta i requisiti stabiliti
function validatePassword () {
    const password = document.signUpForm.password.value;
    let hasValidLength = true, hasValidLower = true, hasValidUpper = true, hasValidSpecial = true, hasValidNumber = true;
    const validSpecialRegex = /[!"£$%&\/()=?'^*]/;
    
    if (password.length < 16) { //Troppo corta
        hasValidLength = false;
    } else if (password.length > 128) { //Troppo lunga
        hasValidLength = false;
    }
    if (!validSpecialRegex.test(password)) { //Manca speciale
        hasValidSpecial = false;
    }
    if (!/\d/.test(password)) { //Manca numero
        hasValidNumber = false;
    }
    if (!/[a-z]/.test(password)) { //Manca minuscola
        hasValidLower = false;
    }
    if (!/[A-Z]/.test(password)) { //Manca maiuscola
        hasValidUpper = false;
    }
    passwordGuidesState ("passwordLengthDiv", hasValidLength);
    passwordGuidesState ("passwordSpecialDiv", hasValidSpecial);
    passwordGuidesState ("passwordNumberDiv", hasValidNumber);
    passwordGuidesState ("passwordLowerDiv", hasValidLower);
    passwordGuidesState ("passwordUpperDiv", hasValidUpper);
    
    return (hasValidLength && hasValidSpecial && hasValidNumber && hasValidLower && hasValidUpper);
    
}
//Funzione che decide il colore delle linee guida della password in base alla validità dell'input
function passwordGuidesState (guide, isValid) {
    if (isValid) {
        document.getElementById(guide).style.color = "green";
    } else {
        document.getElementById(guide).style.color = "red";
    }
}

//Funzione che controlla se l'email rispetta i requisiti stabiliti
function validateEmail (email) {
    const invalidDomains = ["gmail.com", "hotmail.com"];
    const emailPattern = /[^@.+]+@[a-zA-Z]+\.[a-zA-Z]+/ //Formato di una mail valida
    
    if (!emailPattern.test(email)) { //Controllo che il formato sia corretto
        document.getElementById("emailDiv").innerHTML = "Inserisci una mail valida";
        return false;
    } else { //Controllo che il dominio non sia tra quelli non ammessi
        const emailAtPosition = email.indexOf("@")
        emailDomain = email.substring(emailAtPosition+1);
        if (invalidDomains.includes(emailDomain)) {
            document.getElementById("emailDiv").innerHTML = "Il dominio "+emailDomain+" non è ammesso";
            return false;
        } else {
            document.getElementById("emailDiv").innerHTML = "";
            return true;
        }
    }
}

//Funzione che controlla che la Privacy Policy sia stata letta ed accettata
function validatePrivacyPolicy (privacyPolicyCheckbox) {
    //Il checkbox viene attivato all'evento onClick sull'anchor alla privacy policy
    //quindi se il suo stato è disabled=true non è stata aperta 
    if (privacyPolicyCheckbox.disabled) {
        document.getElementById("privacyPolicyDiv").innerHTML = "Per procedere leggi e accetta la privacy policy"
        return false;
    } else if (!privacyPolicyCheckbox.checked) {
        document.getElementById("privacyPolicyDiv").innerHTML = "Per procedere accetta la privacy policy";
        return false;
    } else {
        document.getElementById("privacyPolicyDiv").innerHTML = "";
        return true;
    }
}