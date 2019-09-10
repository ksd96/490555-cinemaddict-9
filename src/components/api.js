import {ModelFilms} from './model-films.js';
import {ModelComments} from './model-comments.js';

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


export class API {
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

  /*
  createFilm({task}) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelFilms.parseTask);
  }
  */

  toRAW(data) {
    return {
      "id": data.id,
      "comments": data.arrayComments,
      "film_info": {
        "title": data.title,
        "alternative_title": data.title,
        "total_rating": 5.3,
        "poster": data.nameImage,
        "age_rating": 0,
        "director": data.director,
        "writers": data.writers,
        "actors": data.actors,
        "release": {
          "date": 1475924187819,
          "release_country": data.release,
        },
        "runtime": 77,
        "genre": data.genre,
        "description": data.description,
      },
      'user_details': {
        'watchlist': data.isWatchlist,
        'favorite': data.isFavorites,
        'already_watched': data.isHistory,
        'personal_rating': data.ratingFilm,
        'watching_date': data.watchingDate,
      }
    };
  }


  updateFilm({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(this.toRAW(data)),
    })
      .then(toJSON)
      .then(ModelFilms.parseTask);
  }


  deletecomment({id}) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }


  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
