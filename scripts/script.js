let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup')
let likeButton = document.querySelector('.element__like-button');
let saveButton = document.querySelector('.popup__save-button');

function toggleLike () {
  likeButton.classList.toggle('element__like-button_active');
}

function togglePopup () {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
likeButton.addEventListener('click', toggleLike);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_about');

let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
nameInput.value = profileName.textContent;
jobInput.value =  profileAbout.textContent;

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click', togglePopup);



