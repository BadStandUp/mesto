import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleConfirmClick}) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._confirmButton = this._popupData.querySelector(".popup__save-button");
  }

  open({id, card}) {
    super.open();
    this._id = id;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirmClick(this._id, this._card)
    })
  }

  loading(isLoading) {
    if (isLoading) {
      this._confirmButton.textContent = 'Сохранение...';
    } else {
      this._confirmButton.textContent = this._buttonText;
    }
  }
}
