import {AbstractComponent} from './abstract-component.js';
import {getFilmCardsObjArr, lastPortion, mainEl} from '../main.js';
import {FilmList} from './film-list.js';
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
      const newFilmListObj = new FilmList({order: 4, filmObjArr: getFilmCardsObjArr(true)});
      mainEl.querySelector(`.films`).remove();
      new PageController(mainEl, newFilmListObj).init();


      if (!lastPortion) {
        new PageController(null, new LoadMore(5)).init();
      }
    });
  }
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
