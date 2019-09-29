import {AbstractComponent} from './abstract-component.js';
import {FilmCard} from './film-card.js';
import {createElement} from '../utils.js';

export class FilmList extends AbstractComponent {
  constructor(filmObjArr) {
    super();
    this._filmObjArr = filmObjArr;
  }
  render(container) {
    let filmsStr = ``;
    this._filmObjArr.forEach((item) => {
      filmsStr = filmsStr + new FilmCard(item).render();
    });
    this._element = createElement(this.getTemplate(filmsStr));
    super.render(container);
  }
  getTemplate(str) {
    return `<div class="films-list__container">
      ${str}
      </div>`;
  }
}
