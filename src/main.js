import {numberWatched} from './components/data-profile.js';
import {arrayNavigation} from './components/data-navigation.js';
import {arrayFilms} from './components/array-films.js';
import {render} from './components/utils.js';
import {PageController} from './controllers/page.js';
import {SearchController} from './controllers/scan.js';
import {CommentsController} from './controllers/comments.js';
import {SectionFilms} from './components/section-films.js';
import {API} from './components/api.js';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerCount = document.querySelector(`.footer__statistics`);
const body = document.querySelector(`body`);
const sectionFilms = new SectionFilms();

footerCount.innerHTML = `<p>${arrayFilms.length} movies inside</p>`;

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;
export const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

api.getFilms().then((films) => {
  const shake = () => {
    const ANIMATION_TIMEOUT = 600;
    const textaria = document.querySelector(`.film-details__comment-input`);
    textaria.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      textaria.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  };


  const onDataChange = (actionType, update, old, filmId) => {
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
      case `delete`:
        api.deleteComment({
          id: update,
          data: old,
        }).then(() => {
          api.getComments(filmId)
            .then((comments) => {
              const commentsController = new CommentsController(comments, body, onDataChange, filmId);
              commentsController.init();
            });
        });
        break;
      case `add`:
        api.createComment({
          id: update,
          data: old,
        }).then(() => {
          const textaria = document.querySelector(`.film-details__comment-input`);
          textaria.disabled = false;
          document.querySelector(`.film-details__comments-list`).innerHTML = ``;
          api.getComments(filmId)
            .then((comments) => {
              const commentsController = new CommentsController(comments, body, onDataChange, filmId);
              commentsController.init();
            });
        }).catch(() => {
          const textaria = document.querySelector(`.film-details__comment-input`);
          textaria.disabled = false;
          shake();
        });
        break;
    }
  };

  const pageController = new PageController(body, main, films, arrayNavigation, false, onDataChange);
  render(main, sectionFilms.getElement());
  pageController._renderSort();
  pageController._renderNavigation();
  pageController.init();
  pageController._renderLoadMore();
  pageController._renderStatistic();

  pageController._renderProfile(numberWatched);
});

const getSearch = new SearchController(header, main);
getSearch._renderSearch();

