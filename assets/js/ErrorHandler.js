class ErrorHandler {
  static showError(inputField, message, duration = 2000) {
    // this.clearError(inputField);
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    inputField.classList.add("error");
    inputField.insertAdjacentElement("afterend", errorMessage);

    inputField.focus();

    setTimeout(() => {
      this.clearError(inputField);
    }, duration);
  }

  static clearError(inputField) {
    inputField.classList.remove("error");
    const existingError =
      inputField.parentElement.querySelector(".error-message");
    if (existingError) existingError.remove();
  }
}

export default ErrorHandler;
