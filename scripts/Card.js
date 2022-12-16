import {cardTemplate, zoomImagePopup, zoomImage, zoomImageCaption, openPopup} from './utils.js';

export default class Card {
  _cardElement;
  _itemElement;

  constructor(card) {
    this._name = card.name;
    this._url = card.link;
  }

  _getTemplate() {
    this._cardElement = cardTemplate
      .content
      .querySelector('.element')
      .cloneNode(true);

    return this._cardElement;
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
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);

    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLike);

    this._element.querySelector('.element__image').addEventListener('click', () => {
      zoomImageCaption.textContent = this._name;
      zoomImage.src = this._url;
      zoomImage.alt = this._name;
      openPopup(zoomImagePopup);
    });
  }

  _handleDelete(evt) {
    this._itemElement = evt.target.closest('.element');
    this._itemElement.remove();
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }
}
