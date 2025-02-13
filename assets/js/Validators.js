class Validators {
  static messages = [];
  
  static validatePassword(password) {
    this.clearMessages();
    
    const hasValidLength = password.length >= 16 && password.length <= 128;
    const hasValidSpecial = /[!"£$%&\/()=?'^*]/.test(password);
    const hasValidNumber = /\d/.test(password);
    const hasValidLower = /[a-z]/.test(password);
    const hasValidUpper = /[A-Z]/.test(password);
    
    if (!hasValidLength)
      this.messages.push(
      "Between 16 to 128 characters",
    );
    if (!hasValidSpecial)
      this.messages.push(
      "At least one special character",
    );
    if (!hasValidNumber)
      this.messages.push("At least one number");
    if (!hasValidLower)
      this.messages.push(
      "At least one lowercase letter",
    );
    if (!hasValidUpper)
      this.messages.push(
      "At least one uppercase letter",
    );
    
    return this.messages;
  }
  
  static validateEmail(email) {
    const invalidDomains = ["duck.com"];
    const emailPattern = /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    
    if (!emailPattern.test(email)) {
      return "Invalid E-Mail address";
    } else {
      const emailDomain = email.split("@")[1];
      if (invalidDomains.includes(emailDomain)) {
        return `Domain ${emailDomain} is not allowed`;
      } else {
        return "";
      }
    }
  }
  
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
  
  static clearMessages() {
    this.messages = [];
  }
}

export default Validators;
