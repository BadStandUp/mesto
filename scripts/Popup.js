export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popupData = document.querySelector(this._selector)
  }

  open() {
    this._popupData.classList.add('popup_opened');
    document.addEventListener(
      'keydown',
      evt => {
        const classList = evt.target.classList

        if (classList.contains('popup') || classList.contains('popup__close-button'))
          this.close();
      }
    );
  }

  close() {
    this._popupData.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape')
      this.close();
  }

  setEventListeners() {
    this._popupData.addEventListener('click', this._handleEscClose);
  }
}
