class NoticeHandler {
  static activeTimeout = null;
  
  //Error
  static showError(inputField, message, duration, fixed = false) { //Se passato duration=0 il messaggio è permanente
    
    // Cancella il timeout attivo, se presente
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
      this.activeTimeout = null;
    }
    
    const notice = document.querySelector(".notice");
    this.clearClasses(notice, "error", fixed);
    if (inputField != null) this.clearMessage(inputField, "error");
    notice.classList.add("error");
    notice.classList.add("fade_in");
    if (fixed) notice.classList.add("fixed");
    notice.textContent = message;
    if (inputField != null) inputField.classList.add("error");
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      this.activeTimeout = setTimeout(() => {
        this.clearClasses (notice, "error", fixed);
        if (inputField != null) this.clearMessage(inputField, "error");
      }, duration);
    }
  }
  
  //Success
  static showSuccess(inputField, message, duration, fixed = false) {
    this.clearClasses(notice, "success", fixed);
    if (inputField != null) this.clearMessage(inputField, "success");
    const notice = document.querySelector(".notice");
    notice.classList.add("success");
    notice.classList.add("fade_in");
    if (fixed) notice.classList.add("fixed");
    notice.textContent = message;
    if (inputField != null) inputField.classList.add("success");
    // inputField.insertAdjacentElement("afterend", notice);
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        this.clearClasses(notice, "success", fixed);;
        if (inputField != null) this.clearMessage(inputField, "success");
      }, duration);
    }
  }
  
  //Message
  static showMessage(inputField, message, duration, fixed = false) {
    this.clearClasses(notice, "message", fixed);
    if (inputField != null) this.clearMessage(inputField, "message");
    const notice = document.querySelector(".notice");
    notice.classList.add("message");
    notice.classList.add("fade_in");
    if (fixed) notice.classList.add("fixed");
    notice.textContent = message;
    if (inputField != null) inputField.classList.add("message");
    // inputField.insertAdjacentElement("afterend", notice);
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        this.clearClasses(notice, "message", fixed);;
        if (inputField != null) this.clearMessage(inputField, "message");
      }, duration);
    }
  }
  
  //Condivise
  static clearMessage(inputField, message) {
    inputField.classList.remove(message);
    const existingMessage =
    inputField.parentElement.querySelector(`.${message}-message`);
    if (existingMessage) existingMessage.remove();
  }
  
  static clearClasses (notice, messageType, fixed) {
    notice.classList.remove("fade_in");
    notice.classList.remove(messageType);
    if (fixed) notice.classList.remove("fixed");
  }
}

export default NoticeHandler;
