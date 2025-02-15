class NoticeHandler {
  //Error
  static showError(inputField, message, duration, fixed = false) { //Se passato duration=0 il messaggio è permanente
    if (inputField != null) this.clearMessage(inputField, "error");
    const errorMessage = document.querySelector(".notice");
    errorMessage.classList.add("error");
    errorMessage.classList.add("fade_in");
    if (fixed) messageMessage.classList.add("fixed");
    errorMessage.textContent = message;
    if (inputField != null) inputField.classList.add("error");
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        errorMessage.classList.toggle("fade_in");
        errorMessage.classList.toggle("error");
        if (fixed) messageMessage.classList.toggle("fixed");
        if (inputField != null) this.clearMessage(inputField, "error");
      }, duration);
    }
  }
  
  //Success
  static showSuccess(inputField, message, duration, fixed = false) {
    if (inputField != null) this.clearMessage(inputField, "success");
    const successMessage = document.querySelector(".notice");
    successMessage.classList.add("success");
    successMessage.classList.add("fade_in");
    if (fixed) messageMessage.classList.add("fixed");
    successMessage.textContent = message;
    if (inputField != null) inputField.classList.add("success");
    // inputField.insertAdjacentElement("afterend", successMessage);
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        successMessage.classList.toggle("fade_in");
        successMessage.classList.toggle("success");
        if (fixed) messageMessage.classList.toggle("fixed");
        if (inputField != null) this.clearMessage(inputField, "success");
      }, duration);
    }
  }
  
  //Message
  static showMessage(inputField, message, duration, fixed = false) {
    if (inputField != null) this.clearMessage(inputField, "message");
    const messageMessage = document.querySelector(".notice");
    messageMessage.classList.add("message");
    messageMessage.classList.add("fade_in");
    if (fixed) messageMessage.classList.add("fixed");
    messageMessage.textContent = message;
    if (inputField != null) inputField.classList.add("message");
    // inputField.insertAdjacentElement("afterend", messageMessage);
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        messageMessage.classList.toggle("fade_in");
        messageMessage.classList.toggle("message");
        if (fixed) messageMessage.classList.toggle("fixed");
        if (inputField != null) this.clearMessage(inputField, "message");
      }, duration);
    }
  }
  
  //Condivisa
  static clearMessage(inputField, message) {
    inputField.classList.remove(message);
    const existingMessage =
    inputField.parentElement.querySelector(`.${message}-message`);
    if (existingMessage) existingMessage.remove();
  }
}

export default NoticeHandler;
