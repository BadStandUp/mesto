export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialCards = data;
    this._selector = containerSelector;
    this._renderer = renderer;
  }

  renderItems() {
    this._initialCards.forEach(card => this._renderer(card, this._selector));
  }

  addItem(selector, card) {
    selector.prepend(card);
  }
}
