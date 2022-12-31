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

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const profileEditPopup = new PopupWithForm(
  '.popup_profile-edit',
  '.popup__form_profile-edit',
  data => {
    userInfo.setUserInfo({name: data.name, about: data.about});
    profileEditPopup.close();
  }
);
profileEditPopup.setEventListeners();

const popupAddCard = new PopupWithForm(
  '.popup_add-card',
  '.popup__form_add-card',
  data => {
    const item = {name: data.name, link: data.about};

    const card = new Card(
      item,
      '#card-template',
      () => handleCardClick(item)
    );

    cardList.addItem(elements, card.generateCard());
  }
);
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
    renderer: cardRenderer
  },
  '#card-template');
cardList.renderItems();

function cardRenderer(item, selector) {
  const card = new Card(
    item,
    selector,
    () => handleCardClick(item)
  );
  const cardItem = card.generateCard();

  cardList.addItem(elements, cardItem);
}

function handleCardClick(item) {
  imagePopup.open(item);
}

profileEditButton.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;

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
