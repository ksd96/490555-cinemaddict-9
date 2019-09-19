import ModelFilms from './model-films.js';
import ModelComments from './model-comments.js';
import moment from 'moment';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};


export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies/`})
      .then(toJSON)
      .then(ModelFilms.parseTasks);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
      .then(toJSON)
      .then(ModelComments.parseTasks);
  }

  toRAWComment(data) {
    return {
      "comment": data.text,
      "date": moment(data.date).format(),
      "emotion": data.image,
    };
  }

  createComment({id, data}) {
    return this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(this.toRAWComment(data)),
      headers: new Headers({'Content-Type': `application/json`})
    });
  }

  toRAW(data) {
    return {
      'id': data.id,
      'comments': data.arrayComments,
      'film_info': {
        "title": data.title,
        "alternative_title": data.title,
        "total_rating": 5.3,
        "poster": data.nameImage,
        "age_rating": 0,
        "director": data.director,
        "writers": data.writers,
        "actors": data.actors,
        "release": {
          "date": `1993-09-23T10:57:49.860Z`,
          "release_country": `usa`,
        },
        "runtime": 77,
        "genre": data.arrayComments,
        "description": data.description,
      },
      'user_details': {
        'watchlist': data.isWatchlist,
        'favorite': data.isFavorites,
        'already_watched': data.isHistory,
        'personal_rating': data.ratingFilm,
        'watching_date': `1993-09-23T10:57:49.860Z`,
      },
    };
  }

  updateFilm({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(this.toRAW(data)),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelFilms.parseTask);
  }

  deleteComment({id}) {
    return this._load({
      url: `comments/${id}`,
      method: `DELETE`,
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        // console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
