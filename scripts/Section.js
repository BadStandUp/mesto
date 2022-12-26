import Card from "./Card";

class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialCards = items;
    this._container = containerSelector;
  }

  renderItems(renderer) {
    this._initialCards.forEach((card) => {
      const card = new Card(item, '#card-template', );
      const cardItem = card.generateCard();
    });

    this.addItem(cardItem);
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
