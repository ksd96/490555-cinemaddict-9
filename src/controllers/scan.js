import {Search} from '../components/search.js';
import {render} from '../components/utils.js';
import {SectionFilms} from '../components/section-films.js';
import {ResultCount} from '../components/search-result-count.js';
import {PageController} from './page.js';
import {arrayNavigation} from '../components/data-navigation.js';

export class SearchController {
  constructor(container, containerResult, films) {
    this._container = container;
    this._containerResult = containerResult;
    this._films = films;
  }

  _renderSearch() {
    const search = new Search();
    const body = document.querySelector(`body`);

    const searchFilms = () => {
      const textariaValue = search.getElement().querySelector(`.search__field`).value.trim();
      const arrayResult = [];
      const searchResult = new SectionFilms();
      render(this._containerResult, searchResult.getElement());

      const radio = false;
      const check = (radio === false) ? true : false;

      // radio ? false : true;

      const page = new PageController(body, this._containerResult, arrayResult, ``, check);

      for (const value of this._films) {
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
        const filmContainer = this._containerResult.querySelector(`.films-list__container`);
        filmContainer.classList.add(`no-result`);
        filmContainer.classList.remove(`films-list__container`);
        filmContainer.innerHTML = `There is no movies for your request.`;
      }
    };

    const renderBack = () => {
      const page = new PageController(body, this._containerResult, this._films, arrayNavigation, false);
      const textaria = search.getElement().querySelector(`.search__field`);
      textaria.value = ``;
      this._containerResult.innerHTML = ``;
      page._renderSort();
      const searchResult = new SectionFilms();
      render(this._containerResult, searchResult.getElement());
      page.init();
      page._renderLoadMore();
      page._renderNavigation();
      page._renderStatistic();
    };

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

        if (evt.key === `Enter`) {
          evt.preventDefault();
          search.getElement().querySelector(`.search__field`).blur();
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

