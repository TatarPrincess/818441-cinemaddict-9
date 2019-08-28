import {getFilmCardMarkup} from './components/filmCard.js';
import {getFilterMarkup} from './components/filter.js';
import {getSearchMarkup} from './components/search.js';
import {getUserRankMarkup} from './components/userRank.js';
import {getSortMarkup} from './components/sort.js';
import {getCardContainerMarkup} from './components/cardContainer.js';
import {getFilmData} from './components/data.js';
import {getFilterData} from './components/data.js';
import {getFooterStatMarkup} from './components/footerStat.js';

const CARDS_TOTAL_QUANTITY = 15;
const CARDS_LOAD_QUANTITY_PORTION = 5;
const USER_RANK = `Movie Buff`;
let cardDataArr = [];
let loadedCardsQuantity = 0;
let cardDataArrPortion = [];
let lastPortion = 0;

function Component(creator, adjEl, order, elOrder, params = ``) {
  this.adjEl = adjEl;
  this.creator = creator;
  this.markup = creator(params);
  this.drawOrder = order;
  this.drawElOrder = elOrder;
}

const getFilmCardsList = (isLoadMore = false) => {

  if (!isLoadMore) {
    for (let i = 1; i <= CARDS_TOTAL_QUANTITY; i++) {
      cardDataArr.push(getFilmData());
    }
  }

  cardDataArrPortion = cardDataArr.slice(loadedCardsQuantity, CARDS_LOAD_QUANTITY_PORTION + loadedCardsQuantity);

  if (!cardDataArrPortion.length) {
    return ``;
  }

  let cardMarkupTotal = ``;
  cardDataArrPortion.forEach((item) => {
    cardMarkupTotal = cardMarkupTotal + getFilmCardMarkup(item);
    loadedCardsQuantity++;
  });
  if ((CARDS_TOTAL_QUANTITY - loadedCardsQuantity) < CARDS_LOAD_QUANTITY_PORTION) {
    lastPortion = 1;
  }
  cardDataArrPortion.splice(0, cardDataArrPortion.length);

  return isLoadMore ? cardMarkupTotal : getCardContainerMarkup(cardMarkupTotal);
};

const markupObjArray = [];
const getFiltersMarkup = () => getFilterMarkup(getFilterData(cardDataArr));

function fillMarkupObjArray() {
  const adjElForSearch = document.querySelector(`.header`);
  const adjMainEl = document.querySelector(`.main`);
  const adjFooterEl = document.querySelector(`.footer`);

  markupObjArray.push(new Component(getSearchMarkup, adjElForSearch, `beforeend`, 0));
  markupObjArray.push(new Component(getUserRankMarkup, adjElForSearch, `beforeend`, 1, USER_RANK));
  markupObjArray.push(new Component(getFilmCardsList, adjMainEl, `beforeend`, 4));
  markupObjArray.push(new Component(getFiltersMarkup, adjMainEl, `beforeend`, 2));
  markupObjArray.push(new Component(getSortMarkup, adjMainEl, `beforeend`, 3));
  markupObjArray.push(new Component(getFooterStatMarkup, adjFooterEl, `beforeend`, 5, CARDS_TOTAL_QUANTITY));

  markupObjArray.sort((el1, el2) => el1.drawElOrder - el2.drawElOrder);
}

// рендер компонент
function render(containerEl, markup, order) {
  containerEl.insertAdjacentHTML(order, markup);
}

fillMarkupObjArray();

markupObjArray.forEach(function (item) {
  render(item.adjEl, item.markup, item.drawOrder);
});

const loadMoreEl = document.querySelector(`.films-list__show-more`);
const filmContainerEl = document.querySelector(`.films-list__container`);
loadMoreEl.addEventListener(`click`, () => {
  const markupLoadMoreTasks = getFilmCardsList(true);
  render(filmContainerEl, markupLoadMoreTasks, `beforeend`);
  if (lastPortion) {
    loadMoreEl.className = `films-list__show-more visually-hidden`;
  }
});
