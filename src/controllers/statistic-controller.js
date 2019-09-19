import Statistic from "../components/statistic";
import StatisticChart from "../components/statistic-chart";
import {render} from "../components/utils";
import StatisticText from "../components/statistic-text";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class StatisticController {
  constructor(container, films, rank) {
    this._container = container;
    this._films = films;
    this._rank = rank;

    this._statistic = new Statistic(this._rank);
  }

  _getArrayFilms(number) {
    const statisticText = this._statistic.getElement().querySelector(`.statistic__text-list`);
    if (statisticText) {
      statisticText.parentNode.removeChild(statisticText);
    }

    const statisticChart = this._statistic.getElement().querySelector(`.statistic__chart-wrap`);
    if (statisticChart) {
      statisticChart.parentNode.removeChild(statisticChart);
    }

    render(this._container, this._statistic.getElement());
    const newArrayFilms = () => {
      const arr = [];
      for (const value of this._films) {
        if ((value.watchingDate / 3600000) <= (Date.now() / 3600000) && (value.watchingDate / 3600000) >= ((Date.now() / 3600000) - (number))) {
          arr.push(value);
        }
      }
      return arr;
    };
    this._renderStatisticText(newArrayFilms());
    this._renderStatisticDiagram(newArrayFilms());
  }

  init() {
    render(this._container, this._statistic.getElement());
    this._renderStatisticText(this._films);
    this._renderStatisticDiagram(this._films);

    this._statistic.getElement()
      .querySelector(`#statistic-today`)
      .addEventListener(`click`, () => {
        this._getArrayFilms(24);
      });

    this._statistic.getElement()
      .querySelector(`#statistic-week`)
      .addEventListener(`click`, () => {
        this._getArrayFilms(24 * 7);
      });

    this._statistic.getElement()
      .querySelector(`#statistic-month`)
      .addEventListener(`click`, () => {
        this._getArrayFilms(24 * 7 * 4);
      });

    this._statistic.getElement()
      .querySelector(`#statistic-year`)
      .addEventListener(`click`, () => {
        this._getArrayFilms(24 * 7 * 4 * 12);
      });

    this._statistic.getElement()
      .querySelector(`#statistic-all-time`)
      .addEventListener(`click`, () => {
        const statisticText = this._statistic.getElement().querySelector(`.statistic__text-list`);
        if (statisticText) {
          statisticText.parentNode.removeChild(statisticText);
        }

        const statisticChart = this._statistic.getElement().querySelector(`.statistic__chart-wrap`);
        if (statisticChart) {
          statisticChart.parentNode.removeChild(statisticChart);
        }

        this._renderStatisticText(this._films);
        this._renderStatisticDiagram(this._films);
      });

  }

  _getStatisticGenre(films) {
    const arrayGenres = [`Animation`, `Adventure`, `Family`, `Thriller`, `Sci-Fi`, `Action`, `Comedy`, `Horror`];
    const func = (genre) => {
      const array = [genre];
      for (const value of films) {
        if (value.genres.includes(genre)) {
          array.push(value);
        }
      }
      return array;
    };
    const arr = [];
    arrayGenres.forEach((genre) => arr.push(func(genre)));
    const sortByLength = (a, b) => {
      return b.length - a.length;
    };

    return arr.sort(sortByLength);
  }

  _renderStatisticText(films) {
    const statisticWatched = films.length;
    const statisticDuration = () => {
      let count = null;
      for (const value of films) {
        count = count + value.duration;
      }
      return count;
    };

    const statisticGenre = this._getStatisticGenre(films)[0][0];
    let statisticText = null;

    if (films.length > 0) {
      statisticText = new StatisticText(statisticWatched, statisticDuration(), statisticGenre);
    } else {
      statisticText = new StatisticText(0, 0, `-`);
    }

    render(this._statistic.getElement(), statisticText.getElement());
  }

  _renderStatisticDiagram(films) {
    if (films.length > 0) {
      const containerStatisticChart = new StatisticChart();
      render(this._statistic.getElement(), containerStatisticChart.getElement());

      const getGenresLabels = () => {
        const genresLabels = [];
        for (const value of this._getStatisticGenre(films)) {
          genresLabels.push(value[0]);
        }

        return genresLabels;
      };

      const getGenresData = () => {
        const genresData = [];
        for (const value of this._getStatisticGenre(films)) {
          genresData.push(value.length - 1);
        }
        return genresData;
      };

      const container = this._statistic.getElement().querySelector(`.statistic__chart`);
      const genresChart = new Chart(container, {
        plugins: [ChartDataLabels],
        type: `horizontalBar`,
        data: {
          labels: getGenresLabels(),
          datasets: [{
            data: getGenresData(),
            backgroundColor: `yellow`,
            lineTension: 0,
            pointRadius: 8,
            pointHoverRadius: 8,
            pointBackgroundColor: `#ffffff`
          }]
        },
        options: {
          legend: {
            display: false
          },
        }
      });
    }
  }
}
