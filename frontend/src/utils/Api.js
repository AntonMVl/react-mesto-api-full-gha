class Api {
    constructor({ url }) {
        this._url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getCards(token) {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                "Authorization" : `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    getUser(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Authorization" : `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    addCard(name, link, token) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({ name, link }),
        }).then(this._checkResponse);
    }

    deleteCard(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization" : `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    updateProfileInfo(name, about, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then(this._checkResponse);
    }

    addLike(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                "Authorization" : `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    deleteLike(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                "Authorization" : `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }

    updateAvatar(data, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data,
            }),
        }).then(this._checkResponse);
    }
}

export const api = new Api({
    url: 'https://api.mesto92.students.nomoredomainsicu.ru',
});

