import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popupData.querySelector('.popup__image');
    this._imageCaption = this._popupData.querySelector('.popup__caption');
  }

  open({name, link}) {
    super.open();

    this._imageCaption.textContent = name;
    this._image.alt = name;
    this._image.src = link;
  }
}
