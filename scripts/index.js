const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup__profile-edit');
const profileCloseButton = document.querySelector('.popup__close-button_profile-edit');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup__add-card');
const addCardCloseButton = document.querySelector('.popup__close-button_add-card');

const formElement = document.querySelector('.popup__form_profile-edit');

const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const deleteButton = document.querySelector('.element__delete-button');

const likeButton = document.querySelector('.element__like-button');

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

initialCards.forEach(function(element) {
  const cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.name;

  cardsList.append(cardElement);
});



function toggleAddCardPopup () {
  if (addCardPopup.classList.contains('popup_opened') === false) {
    addCardPopup.classList.add('popup_opened');
  } else {
    addCardPopup.classList.remove('popup_opened');
  }
}

function toggleProfilePopup () {
  if (profileEditPopup.classList.contains('popup_opened') === false) {
    nameInput.value = profileName.textContent;
    jobInput.value =  profileAbout.textContent;
    profileEditPopup.classList.add('popup_opened');
  } else {
    profileEditPopup.classList.remove('popup_opened');
  }
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  toggleProfilePopup();
}

profileEditButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', toggleProfilePopup);

addCardButton.addEventListener('click', toggleAddCardPopup);
addCardCloseButton.addEventListener('click', toggleAddCardPopup);

formElement.addEventListener('submit', formSubmitHandler);

likeButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like-button_active');
});
