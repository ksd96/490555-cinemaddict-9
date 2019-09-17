import {AbstractComponent} from './absctract-component.js';

export class StatisticChart extends AbstractComponent {

  getTemplate() {
    return `<div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>`;
  }
}
