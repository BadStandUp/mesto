import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super();
    this._submitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners()
  }

  close() {
    super.close()
  }

  _getInputValues() {

  }

}
