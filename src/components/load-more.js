import {AbstractComponent} from './absctract-component.js';

export class ShowMore extends AbstractComponent {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button`;
  }
}
