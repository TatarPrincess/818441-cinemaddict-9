import {AbstractComponent} from './abstract-component.js';

export class Filter extends AbstractComponent {
  constructor(filterObjArr = []) {
    super();
    let [all, watchList, history, favorities] = Array.from(filterObjArr);
    this._all = all;
    this._watchList = watchList;
    this._history = history;
    this._favorities = favorities;
  }
  getTemplate() {
    return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies <span class="main-navigation__item-count">${this._all.count}</span></a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._watchList.count}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._history.count}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._favorities.count}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  }
}
