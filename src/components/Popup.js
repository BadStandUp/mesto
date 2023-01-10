export default class Popup {
  constructor(selector) {
    this._popupData = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._ESCAPE_KEY = 27;
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
    if (evt.keyCode === this._ESCAPE_KEY) {
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
