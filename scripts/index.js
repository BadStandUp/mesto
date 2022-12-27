import {initialCards, validationConfig} from "./constants.js";
import {cardsList, closePopup} from "./utils.js";
import Card from "./Card.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button_profile-edit');
const info = new UserInfo('.profile__title', '.profile__subtitle');


const profileEditPopup = new PopupWithForm(
  '.popup_profile-edit',
  '.popup__form_profile-edit',
  data => {
    info.setUserInfo(data.name, data.about);
  }
);

const popupAddCard = new PopupWithForm(
  '.popup_add-card',
  '.popup__form_add-card',
  data => {

  }
);


const buttonForOpenAddCardPopup = document.querySelector('.profile__add-button');

const placeInput = document.querySelector('.popup__input_place_name');
const urlInput = document.querySelector('.popup__input_place_url');

const addCardFormElement = document.querySelector('.popup__form_add-card');
const editProfileFormElement = document.querySelector('.popup__form_profile-edit');

const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');

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

profileEditButton.addEventListener('click', () => {
  const userInfo = info.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;

  profileEditPopup.open();
});

buttonForOpenAddCardPopup.addEventListener('click', () => {
  popupAddCard.open();
});

profileCloseButton.addEventListener('click', () => {
  profileEditPopup.close()
});

addCardFormElement.addEventListener('submit', addFormSubmitHandler);
