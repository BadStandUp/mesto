import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitCallback}) {
    super(popupSelector);
    this._form = this._popupData.querySelector('.popup__form');
    this._submitCallback = submitCallback;
    this._formInputs = this._form.querySelectorAll('.popup__input');
    this._sumbitButton = this._popupData.querySelector('.popup__save-button');
    this._buttonText = this._sumbitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      super._loading(true);
      this._submitCallback(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._loading(false)
        })
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

  setInputValues(data) {
    this._formInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }
}

