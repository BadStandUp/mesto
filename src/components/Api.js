export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _promise(url, method, body) {
    return fetch(`${this._url}${url}`, {
      method: `${method}`,
      headers: this._headers,
      body: body
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getInitialCards() {
    return this._promise('/cards', 'GET');
  }

  getUserInfo() {
    return this._promise('/users/me', 'GET');
  }

  editProfile(data) {
    return this._promise('/users/me', 'PATCH', JSON.stringify({
      name: data.name,
      about: data.about
    }));
  }

  addCard(data) {
    return this._promise('/cards', 'POST', JSON.stringify({
      name: data.name,
      link: data.link
    }));
  }

  deleteCard(id) {
    return this._promise('/cards/' + id, 'DELETE');
  }

  editAvatar(data) {
  return this._promise('/users/me/avatar', 'PATCH', JSON.stringify({
    avatar: data.avatar
  }))
  }

  setLike(id) {
    return this._promise('/cards/' + id + '/likes', 'PUT');
  }

  deleteLike() {
    return this._promise('/cards/' + id + '/likes', 'DELETE');
  }
}

