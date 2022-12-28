import {
  addCardFormElement,
  buttonForCloseAddCardPopup,
  buttonForOpenAddCardPopup,
  editProfileFormElement,
  initialCards, jobInput, nameInput,
  profileCloseButton,
  profileEditButton,
  validationConfig
} from "./scripts/constants.js";
import Card from "./scripts/Card.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";
import FormValidator from "./scripts/FormValidator.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import './pages/index.css';

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
    const item = {name: data.name, link: data.about};

    const card = new Card(
      item,
      '#card-template',
      () => cardClick(item)
    );

    section.addItem(document.querySelector('.elements'), card.generateCard());
  }
);

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
    () => cardClick(item)
  );
  const cardItem = card.generateCard();

  section.addItem(document.querySelector('.elements'), cardItem)
}

function cardClick(item) {
  const popup = new PopupWithImage('.popup_zoom-image', item);
  popup.open();
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

buttonForCloseAddCardPopup.addEventListener('click', () => {
  popupAddCard.close();
});
