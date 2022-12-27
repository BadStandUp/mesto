import {initialCards, validationConfig} from "./constants.js";
import {cardsList, closePopup} from "./utils.js";
import Card from "./Card.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button_profile-edit');
const profileEditPopup = new Popup('.popup_profile-edit');

const buttonForOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const buttonForCloseAddCardPopup = document.querySelector('.popup__close-button_add-card');

const zoomImagePopup = document.querySelector('.popup_zoom-image');
const zoomImageCloseButton = document.querySelector('.popup__close-button_zoom-image');

const placeInput = document.querySelector('.popup__input_place_name');
const urlInput = document.querySelector('.popup__input_place_url');

const addCardFormElement = document.querySelector('.popup__form_add-card');
const editProfileFormElement = document.querySelector('.popup__form_profile-edit');

const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const editFormValidator = new FormValidator(validationConfig, editProfileFormElement);
const addCardValidator = new FormValidator(validationConfig, addCardFormElement);

editFormValidator.enableValidation();
addCardValidator.enableValidation();

const section = new Section({
    data: initialCards,
    renderer: cardRenderer
  },
  '#card-template'
);
section.renderItems();

function cardRenderer(item, selector) {
  const card = new Card(item, selector,
    () => {
      const popup = new PopupWithImage('.popup_zoom-image', item);
      popup.open();
    }
  );
  const cardItem = card.generateCard();

  section.addItem(cardsList, cardItem)
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard({name: placeInput.value, link: urlInput.value});
  addCardFormElement.reset();
  closePopup(popupAddCard);
  addCardFormElement.reset();
  addCardValidator.toggleButtonState();
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  profileEditPopup.close();
}

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  profileEditPopup.open();
});

profileCloseButton.addEventListener('click', () => {
  profileEditPopup.close()
});
