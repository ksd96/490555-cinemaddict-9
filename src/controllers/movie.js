import {render, unrender} from '../components/utils.js';
import {Film} from '../components/film-card.js';
import {FilmDetails} from '../components/film-details.js';
import {Rating} from '../components/rating.js';
import {Comments} from '../components/film-details-comments.js';
import {arrayComents} from '../components/data-comments.js';

const body = document.querySelector(`body`);

export class MovieController {
  constructor(container, films, onDataChange, onChangeView) {
    this._container = container;
    this._films = films;
    this._film = new Film(films);
    this._filmDetails = new FilmDetails(this._films);
    this._rating = new Rating(this._films);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this.init();
  }

  _entry() {
    return {
      title: this._films.title,
      rating: this._films.rating,
      date: this._films.date,
      duration: this._films.duration,
      genres: this._films.genres,
      nameImage: this._films.nameImage,
      description: this._films.description,
      director: this._films.director,
      writers: this._films.writers,
      actors: this._films.actors,
      country: this._films.country,
      comments: this._films.comments,
      isWatchlist: this._films.isWatchlist,
      isHistory: this._films.isHistory,
      isFavorites: this._films.isFavorites,
      ratingFilm: this._films.ratingFilm,
    };
  }

  _addEmoji(emoji) {
    const container = document.querySelector(`.film-details__add-emoji-label`);
    container.innerHTML = ``;
    emoji.width = 60;
    emoji.height = 60;
    container.append(emoji);
  }

  _createComment(emoji, renderComment) {
    const textaria = document.querySelector(`.film-details__comment-input`);
    const obj = {
      image: emoji.getAttribute(`src`),
      text: textaria.value,
      author: `author`,
    };
    renderComment(obj);
    document.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
    textaria.value = ``;
    textaria.placeholder = `Select reaction below and write comment here`;
  }

  init() {
    let commentsList = null;
    let container = null;
    let emoji = null;
    const entry = this._entry();

    const getContainer = () => {
      const formContainer = document.querySelector(`.film-details__inner`);
      const containerTop = document.querySelector(`.form-details__bottom-container`);
      container = document.createElement(`div`);
      container.classList.add(`form-details__middle-container`);
      formContainer.insertBefore(container, containerTop);

      return container;
    };


    const renderComment = (commentMock) => {
      const comment = new Comments(commentMock);
      commentsList = document.querySelector(`.film-details__comments-list`);
      render(commentsList, comment.getElement());
      const arr = Array.from(document.querySelectorAll(`.film-details__emoji-label`));
      for (const label of arr) {
        label.addEventListener(`click`, () => {
          emoji = label.querySelector(`img`).cloneNode();
          this._addEmoji(emoji);
        });
      }
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(this._filmDetails.getElement());
        commentsList.innerHTML = ``;
        container.innerHTML = ``;
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._film.getElement()
      .querySelector(`img`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        render(body, this._filmDetails.getElement());
        arrayComents.forEach((commentMock) => renderComment(commentMock));
        if (this._films.isHistory) {
          render(getContainer(), this._rating.getElement());
        }
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        render(body, this._filmDetails.getElement());
        arrayComents.forEach((commentMock) => renderComment(commentMock));
        if (this._films.isHistory) {
          render(getContainer(), this._rating.getElement());
        }
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        render(body, this._filmDetails.getElement());
        arrayComents.forEach((commentMock) => renderComment(commentMock));
        if (this._films.isHistory) {
          render(getContainer(), this._rating.getElement());
        }
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        unrender(this._filmDetails.getElement());
        commentsList.innerHTML = ``;
        container.innerHTML = ``;
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        entry.isWatchlist = this._films.isWatchlist ? false : true;
        this._onDataChange(entry, this._films);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        entry.isHistory = this._films.isHistory ? false : true;
        this._onDataChange(entry, this._films);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        entry.isFavorites = this._films.isFavorites ? false : true;
        this._onDataChange(entry, this._films);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        entry.isWatchlist = this._films.isWatchlist ? false : true;
        this._onDataChange(entry, this._films);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        entry.isHistory = this._films.isHistory ? false : true;
        if (document.querySelector(`.film-details__user-rating-wrap`)) {
          container.innerHTML = ``;
          entry.ratingFilm = null;
        } else {
          render(getContainer(), this._rating.getElement());
        }
        this._onDataChange(entry, this._films);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        entry.isFavorites = this._films.isFavorites ? false : true;
        this._onDataChange(entry, this._films);
        document.addEventListener(`keydown`, onEscKeyDown);
      });


    this._filmDetails.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          this._createComment(emoji, renderComment);
          this._onDataChange(entry, this._films);
        }
      });

    render(this._container, this._film.getElement());
  }

  setDefaultView() {
    if (document.body.contains(this._filmDetails.getElement())) {
      unrender(this._filmDetails.getElement());
      this._filmDetails.removeElement();
    }
  }
}
