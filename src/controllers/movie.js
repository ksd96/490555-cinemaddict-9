import {render, unrender} from '../components/utils.js';
import {Film} from '../components/film-card.js';
import {FilmDetails} from '../components/film-details.js';
import {Rating} from '../components/rating.js';
import {Comments} from '../components/film-details-comments.js';
import {arrayComents} from '../components/data-comments.js';

const body = document.querySelector(`body`);

export class MovieController {
  constructor(container, containerPopup, films, onDataChange, onChangeView) {
    this._container = container;
    this._containerPopup = containerPopup;
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
    const container = this._containerPopup.querySelector(`.film-details__add-emoji-label`);
    container.innerHTML = ``;
    emoji.width = 60;
    emoji.height = 60;
    container.append(emoji);
  }

  _createComment(emoji, renderComment) {
    const textaria = this._containerPopup.querySelector(`.film-details__comment-input`);
    const obj = {
      image: emoji.getAttribute(`src`),
      text: textaria.value,
      author: `author`,
    };
    renderComment(obj);
    this._containerPopup.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
    textaria.value = ``;
    textaria.placeholder = `Select reaction below and write comment here`;
  }

  init() {
    let commentsList = null;
    let containerRating = null;
    let emoji = null;
    const entry = this._entry();

    const getContainer = () => {
      const formContainer = this._containerPopup.querySelector(`.film-details__inner`);
      const containerTop = this._containerPopup.querySelector(`.form-details__bottom-container`);
      containerRating = document.createElement(`div`);
      containerRating.classList.add(`form-details__middle-container`);
      formContainer.insertBefore(containerRating, containerTop);

      return containerRating;
    };


    const renderComment = (commentMock) => {
      const comment = new Comments(commentMock);
      commentsList = this._containerPopup.querySelector(`.film-details__comments-list`);
      render(commentsList, comment.getElement());
      this._containerPopup.querySelector(`.film-details__emoji-list`)
        .addEventListener(`click`, (event) => {
          emoji = event.target.closest(`img`).cloneNode();
          this._addEmoji(emoji);
        });
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(this._filmDetails.getElement());
        commentsList.innerHTML = ``;
        containerRating.innerHTML = ``;
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._onDataChange(entry, this._films);
      }
    };

    this._film.getElement()
      .addEventListener(`click`, () => {
        this._onChangeView();
        render(this._containerPopup, this._filmDetails.getElement());
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
        containerRating.innerHTML = ``;
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._onDataChange(entry, this._films);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.isWatchlist = this._films.isWatchlist ? false : true;
        this._onDataChange(entry, this._films);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.isHistory = this._films.isHistory ? false : true;
        this._onDataChange(entry, this._films);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.isFavorites = this._films.isFavorites ? false : true;
        this._onDataChange(entry, this._films);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        entry.isWatchlist = this._films.isWatchlist ? false : true;
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        entry.isHistory = this._films.isHistory ? false : true;
        if (document.querySelector(`.film-details__user-rating-wrap`)) {
          containerRating.innerHTML = ``;
          entry.ratingFilm = null;
        } else {
          render(getContainer(), this._rating.getElement());
        }
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        entry.isFavorites = this._films.isFavorites ? false : true;
        document.addEventListener(`keydown`, onEscKeyDown);
      });


    this._filmDetails.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          this._createComment(emoji, renderComment);
        }
      });

    render(this._container, this._film.getElement());
  }

  setDefaultView() {
    if (body.contains(this._filmDetails.getElement())) {
      unrender(this._filmDetails.getElement());
      this._filmDetails.removeElement();
    }
  }
}
