import {initialCards} from "./initial-cards.js";
import {cardsList, openPopup, closePopup} from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_profile-edit');
const profileCloseButton = document.querySelector('.popup__close-button_profile-edit');

const buttonForOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const buttonForCloseAddCardPopup = document.querySelector('.popup__close-button_add-card');

const zoomImagePopup = document.querySelector('.popup_zoom-image');
const zoomImageCloseButton = document.querySelector('.popup__close-button_zoom-image');

const placeInput = document.querySelector('.popup__input_place_name');
const urlInput = document.querySelector('.popup__input_place_url');

const addCardFormElement = document.querySelector('.popup__form_add-card');
const editFormElement = document.querySelector('.popup__form_profile-edit');
const submitButton = document.querySelector('.popup__save-button');

const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const editFormValidator = new FormValidator(validationConfig, editFormElement);
const addCardValidator = new FormValidator(validationConfig, addCardFormElement);

editFormValidator.enableValidation();
addCardValidator.enableValidation();

function addCard(item) {
  const card = new Card(item);
  const cardItem = card.generateCard();

  cardsList.prepend(cardItem);
}

initialCards.forEach(addCard);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard({name: placeInput.value, link: urlInput.value});
  addCardFormElement.reset();
  closePopup(popupAddCard);
  addCardFormElement.reset();
  submitButton.classList.add('popup__save-button_disabled');
  submitButton.setAttribute('disabled', '');
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value =  profileAbout.textContent;
  openPopup(profileEditPopup)});
profileCloseButton.addEventListener('click', () => {closePopup(profileEditPopup)});

buttonForOpenAddCardPopup.addEventListener('click', () => {openPopup(popupAddCard)});
buttonForCloseAddCardPopup.addEventListener('click', () => {closePopup(popupAddCard)});

zoomImageCloseButton.addEventListener('click', () => {closePopup(zoomImagePopup)});

addCardFormElement.addEventListener('submit', addFormSubmitHandler);
editFormElement.addEventListener('submit', editFormSubmitHandler);
