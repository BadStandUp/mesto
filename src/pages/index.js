import {
  addCardFormElement,
  buttonForCloseAddCardPopup,
  buttonForOpenAddCardPopup,
  editProfileFormElement,
  aboutInput, nameInput,
  profileCloseButton,
  profileEditButton,
  validationConfig,
  apiSettings,
  avatarEditButton,
  avatarCloseButton,
  avatarFormElement,
  confirmCloseButton,
  popupConfig,
  defaultContainer,
  defaultTemplate
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

// API
const api = new Api(apiSettings);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo({name: data.name, about: data.about});
    initialCardList.renderItems(cards, data._id);
    userInfo.setUserAvatar({avatar: data.avatar})
  })
  .catch((err) => console.log(err))

// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

// Создание карточек с сервера
const initialCardList = new Section(
  {
    renderer: (item, id) => {
      item.userId = id;
      initialCardList.addItem(createCard(item), false);
    }
  },
  defaultContainer);

// Попап редактирования профиля
const profileEditPopup = new PopupWithForm({
  popupSelector: popupConfig.editProfilePopup,
  submitCallback: data => {
    api.editProfile({name: data.nameInput, about: data.aboutInput})
      .then(() => {
        userInfo.setUserInfo({name: data.nameInput, about: data.aboutInput});
        profileEditPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => profileEditPopup.loading(true))
  }
});
profileEditPopup.setEventListeners();

// Попап создания карточки
const popupAddCard = new PopupWithForm({
  popupSelector: popupConfig.addCardPopup,
  submitCallback: data => {
    api.addCard(data)
      .then((data) => {
        data.userId = data.owner._id;
        initialCardList.addItem(createCard(data), true);
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddCard.loading(true))
  }
});
popupAddCard.setEventListeners();

// Попап с зумом картинки
const imagePopup = new PopupWithImage(popupConfig.imagePopup);
imagePopup.setEventListeners();

// Попап изменеия аватара пользователя
const avatarPopup = new PopupWithForm({
  popupSelector: popupConfig.avatarPopup,
  submitCallback: data => {
    api.editAvatar({avatar: data.avatarInput})
      .then(() => {
        userInfo.setUserAvatar({avatar: data.avatarInput});
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => avatarPopup.loading(true))
  }
})
avatarPopup.setEventListeners();

// Попап подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: popupConfig.confirmationPopup,
  handleConfirmClick: (id, card) => {
    api.deleteCard(id)
      .then(() => {
        card.remove();
        popupWithConfirmation.close()
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithConfirmation.loading(true))
  }
})
popupWithConfirmation.setEventListeners();

// Валидация форм
const editFormValidator = new FormValidator(validationConfig, editProfileFormElement);
const addCardValidator = new FormValidator(validationConfig, addCardFormElement);
const avatarFormValidator = new FormValidator(validationConfig, avatarFormElement)
editFormValidator.enableValidation();
addCardValidator.enableValidation();
avatarFormValidator.enableValidation();


// Функции создания карточки
function createCard(item) {
  const newCard = new Card(item, defaultTemplate, handleCardClick, handleDeleteButtonClick, handleLikeClick);

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

// Слушатели событий
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
