import {AbstractComponent} from './abstract-component.js';
import {FilmCard} from './film-card.js';
import {createElement} from '../utils.js';

export class FilmListExtra extends AbstractComponent {
  constructor(filmObjArr, type) {
    super();
    this._filmObjArr = filmObjArr;
    this._type = type;
  }

  render(container) {
    let filmsStr = ``;
    this._filmObjArr.forEach((item) => {
      filmsStr = filmsStr + new FilmCard(item).render();
    });
    this._element = createElement(this.getTemplate(filmsStr));
    super.render(container);
  }
  unrender() {
    const parent = document.querySelector(`body`);
    let children = document.querySelectorAll(`.${this.getElement().className}`);
    if (children.length > 1) {
      children.forEach((item) => {
        if (parent.contains(item)) {
          item.remove();
          this.removeElement();
        }
      });
    }
  }
  getTemplate(cards) {
    return `<section class="films-list--extra">
    <h2 class="films-list__title">${this._type}</h2>

    <div class="films-list__container">
      ${cards}
      </div>
  </section>`;
  }
}
