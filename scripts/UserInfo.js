export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }

  getUserInfo() {
    const extract = selector => document.querySelector(selector).textContent;

    const name = extract(this._nameSelector);
    const about = extract(this._aboutSelector);

    return {name, about};
  }

  setUserInfo(name, about) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._aboutSelector).textContent = about;
  }
}
