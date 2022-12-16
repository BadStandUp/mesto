export default class FormValidator {
  _config;
  _formElement;

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _hasInvalidInput() {
    return this._config.inputSelector.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._config.inputSelector)) {
      this._config.submitButtonSelector.classList.add(this._config.inactiveButtonClass);
      this._config.submitButtonSelector.setAttribute('disabled', 'true');
    } else {
      this._config.submitButtonSelector.classList.remove(this._config.inactiveButtonClass);
      this._config.submitButtonSelector.removeAttribute('disabled');
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._config.formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._config.formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._config.querySelectorAll(this._config.inputSelector));
    const saveButton = this._config.formSelector.querySelector(this._config.submitButtonSelector);
    this.toggleButtonState(inputList, saveButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._config.inputSelector, this._config.submitButtonSelector);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._config.formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }
}
