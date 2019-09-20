import {render} from './components/utils.js';
import PageController from './controllers/page-controller.js';
import SearchController from './controllers/search-controller.js';
import SectionFilms from './components/section-films.js';
import API from './components/api.js';
import {onDataChange} from './components/on-data-change.js';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerCount = document.querySelector(`.footer__statistics`);
const body = document.querySelector(`body`);
const sectionFilms = new SectionFilms();

main.innerHTML = `Loading...`;

api.getFilms().then((films) => {
  const mainOnDateChange = (actionType, update, old, unit, evt) => {
    return onDataChange(actionType, update, old, unit, evt, pageController, body);
  };

  main.innerHTML = ``;
  const pageController = new PageController(body, main, films, false, mainOnDateChange, `all`);
  render(main, sectionFilms.getElement());
  pageController.initMain();

  footerCount.innerHTML = `<p>${films.length} movies inside</p>`;
});

const getSearch = new SearchController(header, main);
getSearch._renderSearch();

export {api};

