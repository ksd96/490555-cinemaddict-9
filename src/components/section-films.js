import AbstractComponent from './abstract-component.js';

export default class SectionFilms extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
