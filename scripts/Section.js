export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialCards = data;
    this._selector = containerSelector;
    this._renderer = renderer;
  }

  renderItems() {
    this._initialCards.forEach(c => this._renderer(c, this._selector));
  }

  addItem(document, card) {
    document.prepend(card);
  }
}
