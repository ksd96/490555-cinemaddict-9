import {api} from "../main";
import CommentsController from "../controllers/comments-controller";

export const onDataChange = (actionType, update, old, unit, evt, pageController) => {
  const shake = (element) => {
    const ANIMATION_TIMEOUT = 600;
    element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  };

  switch (actionType) {
    case `update`:
      api.updateFilm({
        id: update.id,
        data: update
      }).then(() => {
        api.getFilms().then((filmss) => {
          const id = update.id;
          pageController._onDataChange(filmss[id], old);
        });
      });
      break;
    case `updateRating`:
      api.updateFilm({
        id: update.id,
        data: update
      }).then(() => {
        const radio = document.querySelectorAll(`.film-details__user-rating-input`);
        for (const value of radio) {
          value.disabled = false;
          if (value.value === unit.innerHTML) {
            value.setAttribute(`checked`, `checked`);
          }
        }
        api.getFilms().then((filmss) => {
          const id = update.id;
          pageController._onDataChange(filmss[id], old);
        });
      }).catch(() => {
        const form = document.querySelector(`.film-details__user-rating-score`);
        const radio = document.querySelectorAll(`.film-details__user-rating-input`);
        for (const value of radio) {
          value.disabled = false;
        }
        unit.style.background = `red`;
        shake(form);
      });
      break;
    case `delete`:
      api.deleteComment({
        id: update,
      }).then(() => {
        document.querySelector(`.film-details__comments-list`).innerHTML = ``;
        api.getComments(unit)
          .then((comments) => {
            const body = document.querySelector(`body`);
            const commentsController = new CommentsController(comments, body, onDataChange, unit);
            commentsController.init();
          });
        evt.innerHTML = `Delete`;
        evt.disabled = false;
      }).catch(() => {
        evt.innerHTML = `Delete`;
        evt.disabled = false;
      });
      break;
    case `add`:
      api.createComment({
        id: update,
        data: old,
      }).then(() => {
        const textaria = document.querySelector(`.film-details__comment-input`);
        textaria.disabled = false;
        document.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        textaria.value = ``;
        textaria.placeholder = `Select reaction below and write comment here`;
        document.querySelector(`.film-details__comments-list`).innerHTML = ``;
        api.getComments(unit)
          .then((comments) => {
            const body = document.querySelector(`body`);
            const commentsController = new CommentsController(comments, body, onDataChange, unit);
            commentsController.init();
          });
      }).catch(() => {
        const textaria = document.querySelector(`.film-details__comment-input`);
        textaria.disabled = false;
        textaria.style.border = `2px solid red`;
        shake(textaria);
      });
      break;
  }
};
