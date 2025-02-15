class NoticeHandler {
  //Error
  static showError(inputField, message, duration) {
    if (inputField != null) this.clearError(inputField);
    const errorMessage = document.querySelector(".notice");
    errorMessage.classList.add("error");
    errorMessage.classList.add("fade_in");
    errorMessage.textContent = message;
    if (inputField != null) inputField.classList.add("error");
    // inputField.insertAdjacentElement("afterend", errorMessage);

    if (inputField != null) inputField.focus();

    setTimeout(() => {
      errorMessage.classList.toggle("fade_in");
      errorMessage.classList.toggle("error");
      if (inputField != null) this.clearError(inputField);
    }, duration);
  }

  static clearError(inputField) {
    inputField.classList.remove("error");
    const existingError =
      inputField.parentElement.querySelector(".error-message");
    if (existingError) existingError.remove();
  }

  //Success
  static showSuccess(inputField, message, duration) {
    if (inputField != null) this.clearSuccess(inputField);
    const successMessage = document.querySelector(".notice");
    successMessage.classList.add("success");
    successMessage.classList.add("fade_in");
    successMessage.textContent = message;
    if (inputField != null) inputField.classList.add("success");
    // inputField.insertAdjacentElement("afterend", errorMessage);

    if (inputField != null) inputField.focus();

    setTimeout(() => {
      successMessage.classList.toggle("fade_in");
      successMessage.classList.toggle("success");
      if (inputField != null) this.clearSuccess(inputField);
}, duration);
  }

  static clearSuccess(inputField) {
    inputField.classList.remove("success");
    const existingSuccess =
      inputField.parentElement.querySelector(".success-message");
    if (existingSuccess) existingSuccess.remove();
  }
}

export default NoticeHandler;
