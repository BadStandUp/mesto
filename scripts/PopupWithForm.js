import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popUpSelector, formSelector, callback) {
    super(popUpSelector);
    this._form = document.querySelector(formSelector);
    this._submitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener(
      "submit",
      evt => {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
      }
    );
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const nameIndex = 0;
    const aboutIndex = 1;

    const extractor = idx => this._form[idx].value;

    return {name: extractor(nameIndex), about: extractor(aboutIndex)};
  }
}
