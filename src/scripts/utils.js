export const cardsList = document.querySelector('.elements');

export const zoomImagePopup = document.querySelector('.popup_zoom-image');
export const zoomImage = document.querySelector('.popup__image');
export const zoomImageCaption = document.querySelector('.popup__caption');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClickHandler);
  document.addEventListener('keydown', closePopupByEscHandler);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByClickHandler);
  document.removeEventListener('keydown', closePopupByEscHandler);
}

const closePopupByClickHandler = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

const closePopupByEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
