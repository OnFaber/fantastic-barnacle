//--Funzioni relative al form di iscrizione

//Funzione che ascolta l'evento click del bottone submit
function checkFormInputs (event) { //event è passato di default come primo argomento dall'event listener
    const form = document.signUpForm;
    const emailField = form.email
    const email = emailField.value;
    const passwordField = form.password;
    const password = passwordField.value;
    const privacyPolicyCheckbox = form.privacyPolicyCheckbox;
    
    const isPasswordValid = validatePassword(password);
    const isEmailValid = validateEmail(email);
    const isPrivacyPolicyValid = validatePrivacyPolicy(privacyPolicyCheckbox);
    
    if(!isPasswordValid) {
        passwordField.focus();
        event.preventDefault();
    }
    if(!isEmailValid) {
        emailField.focus();
        event.preventDefault();
    }
    if(!isPrivacyPolicyValid) {
        privacyPolicyCheckbox.focus();
        event.preventDefault();
    }
}

//Funzione che controlla se la password rispetta i requisiti stabiliti
function validatePassword (password) {
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
    console.log("Formato password\nLunghezza "+hasValidLength+"\nSpeciale "+hasValidSpecial+"\nNumero "+hasValidNumber+"\nMaiuscola "+hasValidUpper+"\nMinuscola "+hasValidLower) //Debug
    return (hasValidLength && hasValidSpecial && hasValidNumber && hasValidLower && hasValidUpper);
    
}

//Funzione che controlla se l'email rispetta i requisiti stabiliti
function validateEmail (email) {
    const invalidDomains = [];
    const emailPattern = /[^@.+]+@[a-zA-Z]+\.[a-zA-Z]+/ //Formato di una mail valida
    
    if (!emailPattern.test(email)) { //Controllo che il formato sia corretto
        console.log("Formato mail non valido") //Debug
        return false;
    } else { //Controllo che il dominio non sia tra quelli non ammessi
        const emailAtPosition = email.indexOf("@")
        emailDomain = email.substring(emailAtPosition+1);
        if (invalidDomains.includes(emailDomain)) {
            console.log("Dominio "+emailDomain+" non ammesso") //Debug
            return false;
        } else {
            return true;
        }
    }
}

//Funzione che controlla che la Privacy Policy sia stata letta ed accettata
function validatePrivacyPolicy (privacyPolicyCheckbox) {
    //Il checkbox viene attivato dall'event listener sul click al link alla privacy policy
    //quindi se il suo stato è disabled=true non è stata aperta 
    if (privacyPolicyCheckbox.disabled) {
        console.log("Privacy policy non letta") //Debug
        return false;
    } else if (!privacyPolicyCheckbox.checked) {
        console.log("Privacy policy non accettata") //Debug
        return false;
    } else {
        return true;
    }
}