class NoticeHandler {
  static activeTimeout = null;
  
  //Error
  static showError(inputField, message, duration, fixed = false) { //Se passato duration=0 il messaggio è permanente
    this.#showNotice(inputField, message, duration, fixed, "error");
  }
  
  //Success
  static showSuccess(inputField, message, duration, fixed = false) { //Se passato duration=0 il messaggio è permanente
    this.#showNotice(inputField, message, duration, fixed, "success");
  }
  
  //Message
  static showMessage(inputField, message, duration, fixed = false) { //Se passato duration=0 il messaggio è permanente
    this.#showNotice(inputField, message, duration, fixed, "message");
  }
  
  //--Condivise
  //Funzione generica per mostrare un messaggio
  static #showNotice (inputField, message, duration, fixed, messageType) {
    //Se c'è un timeout attivo lo cancello
    //Per evitare che il timeout di un'eventuale chiamata
    //Precedente agisca cancellando i messaggi scritti dalla chiamata attuale
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
      this.activeTimeout = null;
    }

    const notice = document.querySelector(".notice");
    this.#clearClasses(notice, messageType, fixed);
    if (inputField != null) this.#clearMessage(inputField, messageType);
    notice.classList.add(messageType);
    notice.classList.add("fade_in");
    if (fixed) notice.classList.add("fixed");
    notice.textContent = message;
    if (inputField != null) inputField.classList.add(messageType);
    // inputField.insertAdjacentElement("afterend", notice);
    
    if (inputField != null) inputField.focus();
    
    if (duration != 0) { //Con duration=0 indico un messaggio permanente
      setTimeout(() => {
        this.#clearClasses(notice, messageType, fixed);;
        if (inputField != null) this.#clearMessage(inputField, messageType);
      }, duration);
    }
  }

  //Funzioni per pulire prima di una nuova esecuzione o dopo il timeout
  static #clearMessage(inputField, messageType) {
    inputField.classList.remove(messageType);
    const existingMessage =
    inputField.parentElement.querySelector(`.${messageType}-message`);
    if (existingMessage) existingMessage.remove();
  }
  
  static #clearClasses (notice, messageType, fixed) {
    notice.classList.remove("fade_in");
    notice.classList.remove(messageType);
    if (fixed) notice.classList.remove("fixed");
  }
}

export default NoticeHandler;
