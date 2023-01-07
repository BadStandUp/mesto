export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const initialCards = [
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

export const elements = document.querySelector('.elements');

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileCloseButton = document.querySelector('.popup__close-button_profile-edit');

export const confirmCloseButton = document.querySelector('.popup__close-button_confirm');

export const avatarEditButton = document.querySelector('.profile__avatar');
export const avatarCloseButton = document.querySelector('.popup__close-button_avatar');

export const buttonForOpenAddCardPopup = document.querySelector('.profile__add-button');
export const buttonForCloseAddCardPopup = document.querySelector('.popup__close-button_add-card');

export const addCardFormElement = document.querySelector('.popup__form_add-card');
export const editProfileFormElement = document.querySelector('.popup__form_profile-edit');

export const nameInput = document.querySelector('.popup__input_data_name');
export const aboutInput = document.querySelector('.popup__input_data_about');

export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '63f40bb4-bb4e-4f4f-b3cc-e405ac006139',
    'Content-Type': 'application/json'
  }
}
