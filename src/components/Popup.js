export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popupData = document.querySelector(this._selector);
  }

  open() {
    this._popupData.classList.add('popup_opened');
    document.addEventListener('keydown', evt => this._handleEscClose(evt));
  }

  close() {
    this._popupData.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => this._handleEscClose(evt));
  }

  setEventListeners() {
    this._popupData.addEventListener('click', evt => this._handleClickClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape')
      this.close();
  }

  _handleClickClose(evt) {
    const classList = evt.target.classList;

    if (classList.contains('popup') || classList.contains('popup__close-button'))
      this.close();
  }
}
