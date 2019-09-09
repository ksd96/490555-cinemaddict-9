import {Profile} from './components/profile.js';
import {numberWatched} from './components/data-profile.js';
import {arrayNavigation} from './components/data-navigation.js';
import {arrayFilms} from './components/array-films.js';
import {render} from './components/utils.js';
import {PageController} from './controllers/page.js';
import {SearchController} from './controllers/scan.js';
import {SectionFilms} from './components/section-films.js';


const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerCount = document.querySelector(`.footer__statistics`);
const body = document.querySelector(`body`);
const pageController = new PageController(body, main, arrayFilms, arrayNavigation, false);
const getSearch = new SearchController(header, main, arrayFilms);
const sectionFilms = new SectionFilms();

const renderProfile = (profileMock) => {
  const profile = new Profile(profileMock);
  render(header, profile.getElement());
};

pageController._renderSort();
render(main, sectionFilms.getElement());
pageController._renderNavigation();
pageController.init();
pageController._renderLoadMore();
pageController._renderStatistic();

footerCount.innerHTML = `<p>${arrayFilms.length} movies inside</p>`;

getSearch._renderSearch();

renderProfile(numberWatched);
