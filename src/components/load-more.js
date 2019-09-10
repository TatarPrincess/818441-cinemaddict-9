import {AbstractComponent} from './abstract-component.js';
import {getFilmCardsObjArr, lastPortion} from '../main.js';
import {FilmCard} from './film-card.js';
import {PageController} from '../page-controller.js';

export class LoadMore extends AbstractComponent {
  constructor(order) {
    super();
    this._order = order;
  }
  getContainer() {
    return document.querySelector(`.films-list`);
  }
  getFilmCardContainer() {
    return document.querySelector(`.films-list__container`);
  }
  callbackFunc() {
    this._element.addEventListener(`click`, () => {
      const moreCardComponentObjArray = [];

      getFilmCardsObjArr(true).forEach((item) => {
        moreCardComponentObjArray.push({container: this.getFilmCardContainer(), dataObj: new FilmCard({order: 5, filmCardObj: item})});
      });

      moreCardComponentObjArray.forEach((item) => {
        new PageController(item.container, item.dataObj).init();
      });

      if (!lastPortion) {
        document.querySelector(`.films-list__show-more`).remove();
        new PageController(this.getContainer(), new LoadMore(6)).init();
      }

      if (lastPortion) {
        this._element.className = `films-list__show-more visually-hidden`;
      }
    });
  }
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
