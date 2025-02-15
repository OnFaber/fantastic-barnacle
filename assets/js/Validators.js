class Validators {
  //Validatore password
  static validatePassword(password) {
    
    const hasValidLength = password.length >= 16 && password.length <= 128;
    const hasValidSpecial = /[!"£$%&\/()=?'^*]/.test(password);
    const hasValidNumber = /\d/.test(password);
    const hasValidLower = /[a-z]/.test(password);
    const hasValidUpper = /[A-Z]/.test(password);
    
    if (!hasValidLower) return "At least one lowercase letter";
    if (!hasValidUpper) return "At least one uppercase letter"
    if (!hasValidSpecial) return "At least one special character";
    if (!hasValidNumber) return "At least one number";
    if (!hasValidLength) return "Between 16 and 128 characters";
    return "";
  }
  
  //Validatore email
  static validateEmail(email) {
    const invalidDomains = ["duck.com"];
    const hasValidPattern = /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(email);
    
    if (!hasValidPattern) {
      return "Invalid E-Mail address";
    }
    const emailDomain = email.split("@")[1];
    if (invalidDomains.includes(emailDomain)) {
      return `Domain ${emailDomain} is not allowed`;
    }
    return "";
  }
  
  //Validatore username
  static validateUsername(username) {
    const isValid = /^[A-Za-z0-9]+$/.test(username);
    if (username == "") {
      return "Username is empty";
    }
    if (!isValid) {
      return "Spaces and special characters not allowed";
    }
    if (localStorage.getItem(`user+${username}`) != null) {
      return "Username already used";
    }
    return "";
  }
  
  //Validatore privacy policy
  static validatePrivacyPolicy(privacyPolicyCheckbox) {
    // Il checkbox viene attivato dall'event listener sul click al link alla privacy policy
    // quindi se il suo stato è disabled=true non è stata aperta
    if (privacyPolicyCheckbox.disabled) {
      return "You have to read and accept our privacy policy";
    } else if (!privacyPolicyCheckbox.checked) {
      return "You have to accept our privacy policy";
    } else {
      return "";
    }
  }
}

export default Validators;
