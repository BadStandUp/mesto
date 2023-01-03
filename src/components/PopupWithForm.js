import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, callback}) {
    super(popupSelector);
    this._form = this._popupData.querySelector('.popup__form');
    this._submitCallback = callback;
    this._formInputs = this._form.querySelectorAll('.popup__input');
    console.log(this._formInputs);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => this._processForm(evt));
  }

  close() {
    super.close();
    this._form.reset();
  }

  _processForm(evt) {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
    this.close();
  }

  _getInputValues() {
    this._inputValues = {};

    this._formInputs.forEach((input) => {
      this._inputValues[input.nameInput] = input.value;
    });
    console.log(this._inputValues);

    return this._inputValues;
  }
}
