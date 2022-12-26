import { zoomImagePopup, zoomImage, zoomImageCaption, openPopup} from './utils.js';

export default class Card {

  constructor({name, link}, templateSelector) {
    this._name = name;
    this._url = link;
    this._templateSelector = templateSelector;
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
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._url;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');

    this._deleteButton.addEventListener('click', () => this._element.remove());
    this._likeButton.addEventListener('click', this._handleLike);
    this._cardImage.addEventListener('click', () => {
      zoomImageCaption.textContent = this._name;
      zoomImage.src = this._url;
      zoomImage.alt = this._name;
      openPopup(zoomImagePopup);
    });
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }


}
