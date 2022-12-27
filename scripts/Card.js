export default class Card {

  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._url = link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._image = this._element.querySelector('.element__image');
    this._image.alt = this._name;
    this._image.src = this._url;

    const title = this._element.querySelector('.element__title');
    title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');

    this._deleteButton.addEventListener('click', () => this._element.remove());
    this._likeButton.addEventListener('click', this._handleLike);
    this._image.addEventListener('click', () => this._handleCardClick());
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }
}
