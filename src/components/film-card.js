import {AbstractComponent} from './absctract-component.js';

export class Film extends AbstractComponent {
  constructor({title, rating, date, duration, genres, nameImage, description, comments, isWatchlist, isHistory, isFavorites, arrayComments}) {
    super();
    this._title = title;
    this._rating = rating;
    this._date = date;
    this._duration = duration;
    this._genres = genres;
    this._nameImage = nameImage;
    this._description = description;
    this._comments = comments;
    this._isWatchlist = isWatchlist;
    this._isHistory = isHistory;
    this._isFavorites = isFavorites;
    this._arrayComments = arrayComments;
  }

  getTemplate() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
     <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._date.getFullYear()}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._genres[Math.floor(Math.random() * (6 - 0) + 0)]}</span>
      </p>
      <img src="./images/posters/${this._nameImage}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${this._arrayComments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isHistory ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`;
  }
}
