import {getFilmCardMarkup} from './components/filmCard.js';
import {getFilterMarkup} from './components/filter.js';
import {getSearchMarkup} from './components/search.js';
import {getUserRankMarkup} from './components/userRank.js';
import {getSortMarkup} from './components/sort.js';

function Component(creator, adjEl, order) {
  this.adjEl = adjEl;
  this.creator = creator;
  this.markup = creator();
  this.drawOrder = order;
}

const markupObjArray = [];

function fillMarkupObjArray() {
  const adjElForSearch = document.querySelector(`.header`);
  const adjMainEl = document.querySelector(`.main`);

  markupObjArray.push(new Component(getSearchMarkup, adjElForSearch, `beforeend`));
  markupObjArray.push(new Component(getUserRankMarkup, adjElForSearch, `beforeend`));
  markupObjArray.push(new Component(getFilterMarkup, adjMainEl, `beforeend`));
  markupObjArray.push(new Component(getSortMarkup, adjMainEl, `beforeend`));
  markupObjArray.push(new Component(getFilmCardMarkup, adjMainEl, `beforeend`));
}

// рендер компонент
function render(containerEl, markup, order) {
  containerEl.insertAdjacentHTML(order, markup);
}

fillMarkupObjArray();

markupObjArray.forEach(function (item) {
  render(item.adjEl, item.markup, item.drawOrder);
});
