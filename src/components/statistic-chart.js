import AbstractComponent from './abstract-component.js';

export default class StatisticChart extends AbstractComponent {

  getTemplate() {
    return `<div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>`;
  }
}
