class NoticeHandler {
  //Error
  static showError(inputField, message, duration) { //Se passato duration=0 il messaggio è permanente
    if (inputField != null) this.clearMessage(inputField, "error");
    const errorMessage = document.querySelector(".notice");
    errorMessage.classList.add("error");
    errorMessage.classList.add("fade_in");
    errorMessage.textContent = message;
    if (inputField != null) inputField.classList.add("error");
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        errorMessage.classList.toggle("fade_in");
        errorMessage.classList.toggle("error");
        if (inputField != null) this.clearMessage(inputField, "error");
      }, duration);
    }
  }
  
  //Success
  static showSuccess(inputField, message, duration) {
    if (inputField != null) this.clearMessage(inputField, "success");
    const successMessage = document.querySelector(".notice");
    successMessage.classList.add("success");
    successMessage.classList.add("fade_in");
    successMessage.textContent = message;
    if (inputField != null) inputField.classList.add("success");
    // inputField.insertAdjacentElement("afterend", successMessage);
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        successMessage.classList.toggle("fade_in");
        successMessage.classList.toggle("success");
        if (inputField != null) this.clearMessage(inputField, "success");
      }, duration);
    }
  }
  
  //Message
  static showMessage(inputField, message, duration) {
    if (inputField != null) this.clearMessage(inputField, "message");
    const messageMessage = document.querySelector(".notice");
    messageMessage.classList.add("message");
    messageMessage.classList.add("fade_in");
    messageMessage.textContent = message;
    if (inputField != null) inputField.classList.add("message");
    // inputField.insertAdjacentElement("afterend", messageMessage);
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        messageMessage.classList.toggle("fade_in");
        messageMessage.classList.toggle("message");
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
