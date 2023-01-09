import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleConfirmClick}) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._submitButton = this._popupData.querySelector(".popup__save-button");
  }

  open({id, card}) {
    super.open();
    this._id = id;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    // кнопка не в форме, поэтому 'sumbit' не сработает
    this._submitButton.addEventListener('click', () => {
      this._handleConfirmClick(this._id, this._card)
    })
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }
}
