export default class Card {

  constructor(data, templateSelector, handleCardClick, handleDeleteButtonClick, handleLikeClick) {
    this._name = data.name;
    this._url = data.link;
    this._likes = data.likes;
    this._idCard = data._id;
    this._idCardOwner = data.owner._id;
    this._userId = data.userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this.isLiked = false;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCount = this._element.querySelector('.element__like-counter');

    this._title.textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._url;
    this._likeCount.textContent = this._likes.length;

    if (this._idCardOwner !== this._userId) {
      this._deleteButton.remove();
    }

    this._likes.forEach((users) => {
      if (users._id === this._userId) {
        this.isLiked = true;
      }
    })

    if (this.isLiked) {
      this._likeButton.classList.add("element__like-button_active");
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    if (this._idCardOwner === this._userId) {
      this._deleteButton.addEventListener("click", () => this._handleDeleteButtonClick({id: this._idCard, card: this._element}));
    }
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
    this._image.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._url}));
  }

  handleLike(res) {
    this._likeButton.classList.add('element__like-button_active');
    this._likeCount.textContent = res.likes.length;
    this.isLiked = true;
  }

  removeLike(res) {
    this._likeButton.classList.remove('element__like-button_active');
    this._likeCount.textContent = res.likes.length;
    this.isLiked = false;
  }
}
