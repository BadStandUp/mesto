export default class Section {
  constructor({renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(cards, id) {
    cards.forEach(card => this._renderer(card, id));
  }

  addItem(item, rev) {
    if (rev) {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }
}
