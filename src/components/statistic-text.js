import AbstractComponent from './absctract-component.js';

export default class StatisticText extends AbstractComponent {
  constructor(statisticWatched, statisticDuration, statisticGenre) {
    super();
    this._statisticWatched = statisticWatched;
    this._statisticDuration = statisticDuration;
    this._statisticGenre = statisticGenre;
  }
  getTemplate() {
    return `<ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${this._statisticWatched} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${Math.trunc(this._statisticDuration / 60)} <span class="statistic__item-description">h</span> ${Math.trunc(this._statisticDuration % 60)} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._statisticGenre}</p>
        </li>
      </ul>`;
  }
}
