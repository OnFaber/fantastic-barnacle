class ErrorHandler {
  static showError(inputField, message, duration) {
    this.clearError(inputField);
    const errorMessage = document.querySelector(".notice");
    errorMessage.classList.add("error");
    errorMessage.classList.add("fade_in");
    errorMessage.textContent = message;
    inputField.classList.add("error");
    // inputField.insertAdjacentElement("afterend", errorMessage);

    inputField.focus();

    setTimeout(() => {
      errorMessage.classList.toggle("fade_in");
      errorMessage.classList.toggle("error");
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
