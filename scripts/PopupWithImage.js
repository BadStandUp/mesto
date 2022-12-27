import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, {name, link}) {
    super(selector);
    this._name = name;
    this._url = link;
  }

  open() {
    const zoomImageCaption = document.querySelector('.popup__caption');
    const zoomImage = document.querySelector('.popup__image');

    zoomImageCaption.textContent = this._name;
    zoomImage.alt = this._name;
    zoomImage.src = this._url;

    super.open();
  }
}
