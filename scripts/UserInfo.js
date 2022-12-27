export default class UserInfo {
  constructor({userName, userInfo}) {
    this._name = userName;
    this._info = userInfo;
  }

  getUserInfo({nameInputSelector, jobInputSelector}) {
    this._nameInput = nameInputSelector;
    this._jobInput = jobInputSelector;

    this._nameInput.value = this._name.textContent;
    this._jobInput.value = this._info.textContent;

    return {};
  }

  setUserInfo(evt) {
    evt.preventDefault();

    this._name.textContent = this._nameInput.value;
    this._info.textContent = this._jobInput.value;
  }
}
