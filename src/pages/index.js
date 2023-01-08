import {
  addCardFormElement,
  buttonForCloseAddCardPopup,
  buttonForOpenAddCardPopup,
  editProfileFormElement,
  aboutInput, nameInput,
  profileCloseButton,
  profileEditButton,
  validationConfig,
  elements,
  apiSettings,
  avatarEditButton,
  avatarCloseButton,
  avatarFormElement,
  confirmCloseButton,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import './index.css';

const api = new Api(apiSettings);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo({name: data.name, about: data.about});
    initialCardList.renderItems(cards, data._id);
    userInfo.setUserAvatar({avatar: data.avatar})
  })
  .catch((err) => console.log(err))

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

const profileEditPopup = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  submitCallback: data => {
    api.editProfile({name: data.nameInput, about: data.aboutInput})
      .then(() => userInfo.setUserInfo({name: data.nameInput, about: data.aboutInput}))
      .catch((err) => console.log(err))
  }
});
profileEditPopup.setEventListeners();

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_add-card',
  submitCallback: data => {
    api.addCard(data)
      .then((data) => {
        data.userId = data.owner._id;
        initialCardList.addItem(createCard(data), true);
      })
      .catch((err) => console.log(err))
  }
});
popupAddCard.setEventListeners();

const imagePopup = new PopupWithImage('.popup_zoom-image');
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_avatar',
  submitCallback: data => {
    api.editAvatar({avatar: data.avatarInput})
      .then(() => {
        userInfo.setUserAvatar({avatar: data.avatarInput});
      })
      .catch((err) => {
        console.log(err);
      })
  }
})
avatarPopup.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_confirm',
  handleConfirmClick: (id, card) => {
    api.deleteCard(id)
      .then(() => card.remove())
      .catch((err) => console.log(err))
  }
})
popupWithConfirmation.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, editProfileFormElement);
const addCardValidator = new FormValidator(validationConfig, addCardFormElement);
const avatarFormValidator = new FormValidator(validationConfig, avatarFormElement)
editFormValidator.enableValidation();
addCardValidator.enableValidation();
avatarFormValidator.enableValidation();

const initialCardList = new Section(
  {
    renderer: (item, id) => {
      item.userId = id;
      initialCardList.addItem(createCard(item), false);
    }
  },
  '.elements');

function createCard(item) {
  const newCard = new Card(item, '#card-template', handleCardClick, handleDeleteButtonClick, handleLikeClick);

  return newCard.generateCard();
}


function handleCardClick(item) {
  imagePopup.open(item);
}

function handleDeleteButtonClick(item) {
  popupWithConfirmation.open(item);
}

function handleLikeClick(card) {
  if (!card.isLiked) {
    api.setLike(card._idCard)
      .then((res) => {
        card.handleLike(res)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.deleteLike(card._idCard)
      .then((res) => {
        card.removeLike(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

avatarEditButton.addEventListener('click', () => {
  avatarFormValidator.toggleButtonState();
  avatarPopup.open();
})

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

avatarCloseButton.addEventListener('click', () => {
  avatarPopup.close();
})

confirmCloseButton.addEventListener('click', () => {
  popupWithConfirmation.close();
})
