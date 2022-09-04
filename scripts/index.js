const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup__profile-edit');
const profileCloseButton = document.querySelector('.popup__close-button_profile-edit');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup__add-card');
const addCardCloseButton = document.querySelector('.popup__close-button_add-card');

const zoomImagePopup = document.querySelector('.popup__zoom-image');
const zoomImageCloseButton = document.querySelector('.popup__close-button_zoom-image');
let zoomImage = document.querySelector('.popup__image');
let zoomImageCaption = document.querySelector('.popup__caption');

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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function handleDelete(evt) {
  const itemElement = evt.target.closest('.element');
  itemElement.remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function addCards(card) {
  const cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;

  cardElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  cardElement.querySelector('.element__like-button').addEventListener('click', handleLike);
  cardElement.querySelector('.element__image').addEventListener('click', function () {
    zoomImageCaption.textContent = card.name;
    zoomImage.src = card.link;
    zoomImage.alt = card.name;

    zoomImagePopup.classList.add('popup_opened');
  });

  cardsList.prepend(cardElement);
}

initialCards.forEach(addCards);

function toggleZoomImagePopup() {
  if (zoomImagePopup.classList.contains('popup_opened') === false) {
    zoomImagePopup.classList.add('popup_opened');
  } else {
    zoomImagePopup.classList.remove('popup_opened');
  }

}

function toggleAddCardPopup() {
  if (addCardPopup.classList.contains('popup_opened') === false) {
    addCardPopup.classList.add('popup_opened');
  } else {
    addCardPopup.classList.remove('popup_opened');
  }
}

function toggleProfilePopup() {
  if (profileEditPopup.classList.contains('popup_opened') === false) {
    nameInput.value = profileName.textContent;
    jobInput.value =  profileAbout.textContent;
    profileEditPopup.classList.add('popup_opened');
  } else {
    profileEditPopup.classList.remove('popup_opened');
  }
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  addCards({name: placeInput.value, link: urlInput.value});

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

addCardButton.addEventListener('click', toggleAddCardPopup);
addCardCloseButton.addEventListener('click', toggleAddCardPopup);

zoomImageCloseButton.addEventListener('click', toggleZoomImagePopup);

addCardFormElement.addEventListener('submit', addFormSubmitHandler);
editFormElement.addEventListener('submit', editFormSubmitHandler);
