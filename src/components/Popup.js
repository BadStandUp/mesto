export default class Popup {
  constructor(selector) {
    this._popupData = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupData.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupData.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popupData.addEventListener('click', evt => this._handleClickClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.keyCode === 27) {
      this.close();
    }
  }

  _handleClickClose(evt) {
    const classList = evt.target.classList;

    if (classList.contains('popup') || classList.contains('popup__close-button')) {
      this.close();
    }
  }


}
