const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

class Card {
  constructor(card) {
    this._name = card.name;
    this._url = card.link;
  }

  _getTemplate() {
    const cardElement = cardTemplate
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__image').src = this._url;

    return this._element;
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {

    })

    const cardDeleteButton = cardElement.querySelector('.element__delete-button');
    const cardLikeButton = cardElement.querySelector('.element__like-button');

  }

  _handleDelete() {

  }

  _handleLike() {

  }

}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardItem = card.generateCard();

  cardsList.prepend(cardItem);
})


