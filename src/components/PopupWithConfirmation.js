import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleConfirmClick}) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._submitButton = this._popupData.querySelector(".popup__save-button");
    this._buttonText = this._sumbitButton.textContent;
  }

  open({id, card}) {
    super.open();
    this._id = id;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      super._loading(true);
      this._handleConfirmClick(this._id, this._card)
        .then(() => this.close())
        .finally(() => super._loading(false))
    })
  }
}
