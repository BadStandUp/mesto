const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_profile-edit');
const profileCloseButton = document.querySelector('.popup__close-button_profile-edit');

const buttonForOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const buttonForCloseAddCardPopup = document.querySelector('.popup__close-button_add-card');

const zoomImagePopup = document.querySelector('.popup_zoom-image');
const zoomImageCloseButton = document.querySelector('.popup__close-button_zoom-image');
const zoomImage = document.querySelector('.popup__image');
const zoomImageCaption = document.querySelector('.popup__caption');

const placeInput = document.querySelector('.popup__input_place_name');
const urlInput = document.querySelector('.popup__input_place_url');

const addCardFormElement = document.querySelector('.popup__form_add-card');
const editFormElement = document.querySelector('.popup__form_profile-edit');

const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

function handleDelete(evt) {
  const itemElement = evt.target.closest('.element');
  itemElement.remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function createCard(card) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardName = cardElement.querySelector('.element__title');
  const cardImage =  cardElement.querySelector('.element__image');

  const cardDeleteButton = cardElement.querySelector('.element__delete-button');
  const cardLikeButton = cardElement.querySelector('.element__like-button');

  cardName.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardDeleteButton.addEventListener('click', handleDelete);
  cardLikeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', function () {
    zoomImageCaption.textContent = card.name;
    zoomImage.src = card.link;
    zoomImage.alt = card.name;

    openPopup(zoomImagePopup);
  });

  return cardElement;
}

function addCard(card) {
  createCard(card);

  cardsList.prepend(createCard(card));
}

initialCards.forEach(addCard);

function toggleZoomImagePopup() {
  if (zoomImagePopup.classList.contains('popup_opened') === false) {
    openPopup(zoomImagePopup);
  } else {
    closePopup(zoomImagePopup);
  }
}

function toggleAddCardPopup() {
  if (popupAddCard.classList.contains('popup_opened') === false) {
    openPopup(popupAddCard);
  } else {
    closePopup(popupAddCard);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function toggleProfilePopup() {
  if (profileEditPopup.classList.contains('popup_opened') === false) {
    nameInput.value = profileName.textContent;
    jobInput.value =  profileAbout.textContent;
    openPopup(profileEditPopup);
  } else {
    closePopup(profileEditPopup);
  }
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  addCard({name: placeInput.value, link: urlInput.value});

  toggleAddCardPopup();
  placeInput.value = '';
  urlInput.value = '';
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  toggleProfilePopup();
}

profileEditButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', toggleProfilePopup);

buttonForOpenAddCardPopup.addEventListener('click', toggleAddCardPopup);
buttonForCloseAddCardPopup.addEventListener('click', toggleAddCardPopup);

zoomImageCloseButton.addEventListener('click', toggleZoomImagePopup);

addCardFormElement.addEventListener('submit', addFormSubmitHandler);
editFormElement.addEventListener('submit', editFormSubmitHandler);
