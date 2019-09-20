import {render, unrender} from '../components/utils.js';
import Film from '../components/film.js';
import FilmDetails from '../components/film-details.js';
import Rating from '../components/rating.js';
import CommentsController from './comments-controller.js';
import {api} from '../main.js';

const body = document.querySelector(`body`);

export default class MovieController {
  constructor(container, containerPopup, films, onDataChange, onChangeView, onDataChangeMain, radio) {
    this._container = container;
    this._containerPopup = containerPopup;
    this._films = films;
    this._film = new Film(films);
    this._filmDetails = new FilmDetails(this._films);
    this._rating = new Rating(this._films);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this._radio = radio;
    this._onDataChangeMain = onDataChangeMain;

    this.init();
  }

  _entry() {
    return {
      id: this._films.id,
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
      arrayComments: this._films.arrayComments,
    };
  }

  init() {
    let commentsList = null;
    let containerRating = null;
    let emoji = null;
    let entry = this._entry();
    let keyCombination = [];

    const getContainer = () => {
      const formContainer = this._containerPopup.querySelector(`.film-details__inner`);
      const containerTop = this._containerPopup.querySelector(`.form-details__bottom-container`);
      containerRating = document.createElement(`div`);
      containerRating.classList.add(`form-details__middle-container`);
      formContainer.insertBefore(containerRating, containerTop);

      return containerRating;
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._onDataChangeMain(`update`, entry, this._films);
        unrender(this._filmDetails.getElement());
        commentsList.innerHTML = ``;
        if (containerRating !== null) {
          containerRating.innerHTML = ``;
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._film.getElement()
      .addEventListener(`click`, () => {
        this._onChangeView();
        render(this._containerPopup, this._filmDetails.getElement());
        api.getComments(this._films.id).then((comments) => {
          const commentsController = new CommentsController(comments, this._containerPopup, this._onDataChangeMain, this._films.id);
          commentsController.init();
          commentsList = this._containerPopup.querySelector(`.film-details__comments-list`);
        });

        this._filmDetails.getElement()
        .querySelector(`.film-details__emoji-list`)
        .addEventListener(`click`, (event) => {
          if (event.target.tagName !== `IMG`) {
            return;
          }

          emoji = event.target.cloneNode();

          const addEmoji = (image) => {
            const container = this._containerPopup.querySelector(`.film-details__add-emoji-label`);
            container.innerHTML = ``;
            image.width = 60;
            image.height = 60;
            container.append(image);
          };
          addEmoji(emoji);

        });

        this._filmDetails.getElement()
          .querySelector(`.film-details__comment-input`)
          .addEventListener(`keydown`, (evt) => {
            if (evt.ctrlKey && keyCombination.length === 0 || evt.key === `Meta` && keyCombination.length === 0) {
              keyCombination.push(evt.key);
            } else if (evt.key === `Enter` && keyCombination.length === 1) {
              keyCombination.push(evt.key);
            } else {
              keyCombination = [];
            }
            if (keyCombination.length === 2) {
              evt.preventDefault();

              const createComment = (image) => {
                const textaria = this._containerPopup.querySelector(`.film-details__comment-input`);

                const obj = {
                  image: image.getAttribute(`id`),
                  text: textaria.value,
                  date: Date.now(),
                };

                textaria.disabled = true;
                this._onDataChangeMain(`add`, this._films.id, obj, this._films.id);

                textaria.addEventListener(`focus`, () => {
                  textaria.style.border = ``;
                });
              };

              let quantityComments = this._containerPopup.querySelector(`.film-details__comments-count`).innerHTML;
              this._containerPopup.querySelector(`.film-details__comments-count`).innerHTML = `${+quantityComments + 1}`;
              createComment(emoji);
            }
          });


        if (this._films.isHistory) {
          render(getContainer(), this._rating.getElement());

          this._rating.getElement()
            .querySelector(`.film-details__user-rating-score`)
            .addEventListener(`click`, (evt) => {
              const radio = this._rating.getElement().querySelectorAll(`.film-details__user-rating-input`);
              for (const value of radio) {
                value.disabled = true;
              }

              if (evt.target.tagName !== `LABEL`) {
                return;
              }
              entry.ratingFilm = +evt.target.innerHTML;

              this._onDataChangeMain(`updateRating`, entry, this._films, evt.target);
            });

          this._rating.getElement()
            .querySelector(`.film-details__watched-reset`)
            .addEventListener(`click`, () => {
              const ratingElements = this._rating.getElement().querySelectorAll(`.film-details__user-rating-input`);
              for (const value of ratingElements) {
                value.removeAttribute(`checked`);
              }
              entry.ratingFilm = 0;
            });

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
        if (containerRating) {
          containerRating.innerHTML = ``;
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._onDataChangeMain(`update`, entry, this._films);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.isWatchlist = this._films.isWatchlist ? false : true;
        this._onDataChangeMain(`update`, entry, this._films);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.isHistory = this._films.isHistory ? false : true;
        this._onDataChangeMain(`update`, entry, this._films);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._film.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.isFavorites = this._films.isFavorites ? false : true;
        this._onDataChangeMain(`update`, entry, this._films);
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
          const ratingElements = this._rating.getElement().querySelectorAll(`.film-details__user-rating-input`);
          for (const value of ratingElements) {
            value.removeAttribute(`checked`);
          }
          entry.ratingFilm = 0;
        } else {
          render(getContainer(), this._rating.getElement());
          this._rating.getElement()
            .querySelector(`.film-details__user-rating-score`)
            .addEventListener(`click`, (evt) => {
              if (evt.target.tagName !== `LABEL`) {
                return;
              }
              entry.ratingFilm = +evt.target.innerHTML;
            });

          this._rating.getElement()
            .querySelector(`.film-details__watched-reset`)
            .addEventListener(`click`, () => {
              const ratingElements = this._rating.getElement().querySelectorAll(`.film-details__user-rating-input`);
              for (const value of ratingElements) {
                value.removeAttribute(`checked`);
              }
              entry.ratingFilm = 0;
            });
        }
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        entry.isFavorites = this._films.isFavorites ? false : true;
        document.addEventListener(`keydown`, onEscKeyDown);
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
