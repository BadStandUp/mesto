import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitCallback}) {
    super(popupSelector);
    this._form = this._popupData.querySelector('.popup__form');
    this._submitCallback = submitCallback;
    this._formInputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._popupData.querySelector('.popup__save-button');
    this._buttonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = {};

    this._formInputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }
}

