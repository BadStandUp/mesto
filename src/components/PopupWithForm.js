import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popUpSelector, formSelector, callback) {
    super(popUpSelector);
    this._form = document.querySelector(formSelector);
    this._submitCallback = callback;
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
    const formInputs = this._form.elements;

    const nameInput = formInputs['name'].value;
    const aboutInput = formInputs['about'].value;

    return {name: nameInput, about: aboutInput};
  }
}
