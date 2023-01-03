import {
  addCardFormElement,
  buttonForCloseAddCardPopup,
  buttonForOpenAddCardPopup,
  editProfileFormElement,
  initialCards, aboutInput, nameInput,
  profileCloseButton,
  profileEditButton,
  validationConfig,
  elements
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import './index.css';

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

const profileEditPopup = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  callback: data => {
    userInfo.setUserInfo({name: data.nameInput, about: data.aboutInput});
  }
});
profileEditPopup.setEventListeners();

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_add-card',
  callback: data => {
    const item = {name: data.nameInput, link: data.aboutInput};

    const card = new Card(item, '#card-template', () => handleCardClick(item));

    cardList.addItem(elements, card.generateCard());
  }
});
popupAddCard.setEventListeners();

const imagePopup = new PopupWithImage('.popup_zoom-image');
imagePopup.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, editProfileFormElement);
const addCardValidator = new FormValidator(validationConfig, addCardFormElement);

editFormValidator.enableValidation();
addCardValidator.enableValidation();

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardList.addItem(elements, createCard(item))
    }
  },
  '#card-template');
cardList.renderItems();

function createCard(item) {
  const newCard = new Card(item, '#card-template', () => handleCardClick(item));

  return newCard.generateCard();
}


function handleCardClick(item) {
  imagePopup.open(item);
}

profileEditButton.addEventListener('click', () => {

  const profileInfo = userInfo.getUserInfo();

  nameInput.value = profileInfo.name;
  aboutInput.value = profileInfo.about;

  editFormValidator.toggleButtonState();

  profileEditPopup.open();
});

buttonForOpenAddCardPopup.addEventListener('click', () => {
  addCardValidator.toggleButtonState();
  popupAddCard.open();
});

profileCloseButton.addEventListener('click', () => {
  profileEditPopup.close()
});

buttonForCloseAddCardPopup.addEventListener('click', () => {
  popupAddCard.close();
});
