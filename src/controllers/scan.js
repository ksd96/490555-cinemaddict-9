import Search from '../components/search.js';
import {render} from '../components/utils.js';
import SectionFilms from '../components/section-films.js';
import ResultCount from '../components/search-result-count.js';
import PageController from './page.js';
import {api} from '../main.js';
import {onDataChange} from '../components/on-data-change.js';

export default class SearchController {
  constructor(container, containerResult) {
    this._container = container;
    this._containerResult = containerResult;
  }

  _getArray() {
    return this._arrayResult;
  }

  _renderSearch() {
    const search = new Search();
    const body = document.querySelector(`body`);

    const searchFilms = () => {
      api.getFilms().then((films) => {
        const scanRenderOnDateChange = (actionType, update, old, unit, evt) => {
          return onDataChange(actionType, update, old, unit, evt, page, body);
        };

        const textariaValue = search.getElement().querySelector(`.search__field`).value.trim();
        const arrayResult = [];
        const searchResult = new SectionFilms();
        render(this._containerResult, searchResult.getElement());

        const page = new PageController(body, this._containerResult, arrayResult, true, scanRenderOnDateChange, `all`);
        for (const value of films) {
          if (value.title.trim().toLowerCase().search(textariaValue) !== -1) {
            arrayResult.push(value);
          }
        }

        const resultCount = new ResultCount(arrayResult.length);

        if (arrayResult.length !== 0) {
          render(this._containerResult, resultCount.getElement());
          render(this._containerResult, searchResult.getElement());
          page._renderBoard();
          if (arrayResult.length > 5) {
            page._renderLoadMore();
          }
        } else {
          render(this._containerResult, resultCount.getElement());
          render(this._containerResult, searchResult.getElement());
          page._getContainerFilms();
          page._unrenderLoadMore();
          const filmContainer = this._containerResult.querySelector(`.films-list__container`);
          filmContainer.classList.add(`no-result`);
          filmContainer.classList.remove(`films-list__container`);
          filmContainer.innerHTML = `There is no movies for your request.`;
        }
      });
    };

    const renderBack = () => {
      const textaria = search.getElement().querySelector(`.search__field`);
      textaria.value = ``;
      this._containerResult.innerHTML = ``;

      api.getFilms().then((films) => {
        const scanRenderBackOnDateChange = (actionType, update, old, unit, evt) => {
          return onDataChange(actionType, update, old, unit, evt, pageController, body);
        };

        const searchResult = new SectionFilms();
        const pageController = new PageController(body, this._containerResult, films, false, scanRenderBackOnDateChange, `all`);
        pageController._renderNavigation(`all`);
        pageController._renderSort();
        render(this._containerResult, searchResult.getElement());
        pageController.init();
        pageController._renderLoadMore();
      });
    };

    search.getElement()
      .querySelector(`.search__field`)
      .addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          search.getElement().querySelector(`.search__field`).blur();
        }
      });

    search.getElement()
      .querySelector(`.search__field`)
      .addEventListener(`keyup`, (evt) => {
        evt.preventDefault();
        const textariaValue = search.getElement().querySelector(`.search__field`).value.trim();
        if (textariaValue !== `` && textariaValue.length >= 3) {
          this._containerResult.innerHTML = ``;
          searchFilms();
        } else if (textariaValue === ``) {
          renderBack();
        }
      });

    search.getElement()
      .querySelector(`.search__reset`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        renderBack();
      });

    render(this._container, search.getElement());
  }
}

