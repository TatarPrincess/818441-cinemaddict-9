import {FilmCard} from './components/film-card.js';
import {Filter} from './components/filter.js';
import {Search} from './components/search.js';
import {UserRank} from './components/user-rank.js';
import {Sort} from './components/sort.js';
import {CardContainer} from './components/card-container.js';
import {getFilmData} from './components/data.js';
import {getFilterData} from './components/data.js';
import {FooterStat} from './components/footer-stat.js';
import {render} from './utils.js';

const CARDS_TOTAL_QUANTITY = 15;
const CARDS_LOAD_QUANTITY_PORTION = 5;
const USER_RANK = `Movie Buff`;
let cardDataArr = [];
let loadedCardsQuantity = 0;
let cardDataArrPortion = [];
let lastPortion = 0;

const getFilmCardsObjArr = (isLoadMore = false) => {

  if (!isLoadMore) {
    for (let i = 1; i <= CARDS_TOTAL_QUANTITY; i++) {
      cardDataArr.push(getFilmData());
    }
  }

  cardDataArrPortion = cardDataArr.slice(loadedCardsQuantity, CARDS_LOAD_QUANTITY_PORTION + loadedCardsQuantity);

  if (!cardDataArrPortion.length) {
    return ``;
  }

  let cardObjArr = [];
  cardDataArrPortion.forEach((item) => {
    cardObjArr.push(item);
    loadedCardsQuantity++;
  });

  if ((CARDS_TOTAL_QUANTITY - loadedCardsQuantity) < CARDS_LOAD_QUANTITY_PORTION) {
    lastPortion = 1;
  }
  cardDataArrPortion.splice(0, cardDataArrPortion.length);

  return cardObjArr;
};

const componentObjArray = [];

function fillcomponentObjArray() {
  const searchContainerEl = document.querySelector(`.header`);
  const mainEl = document.querySelector(`.main`);
  const footerEl = document.querySelector(`.footer`);

  componentObjArray.push(new Search({container: searchContainerEl, order: 0}));
  componentObjArray.push(new UserRank({rank: USER_RANK, container: searchContainerEl, order: 1}));
  componentObjArray.push(new CardContainer({container: mainEl, order: 4}));
  getFilmCardsObjArr().forEach((item) => {
    componentObjArray.push(new FilmCard({container: null, order: 5, filmCardObj: item}));
  });
  componentObjArray.push(new Filter({container: mainEl, order: 2, filterObjArr: getFilterData(cardDataArr)}));
  componentObjArray.push(new Sort({container: mainEl, order: 3}));
  componentObjArray.push(new FooterStat({quant: CARDS_TOTAL_QUANTITY, container: footerEl, order: 6}));

  componentObjArray.sort((el1, el2) => el1._order - el2._order);
}

fillcomponentObjArray();

componentObjArray.forEach(function (item) {
  render(item._containerEl, item._element, item._callbackFunc, item._getContainer);
});

// LOAD MORE
const loadMoreEl = document.querySelector(`.films-list__show-more`);
const filmContainerEl = document.querySelector(`.films-list__container`);

loadMoreEl.addEventListener(`click`, () => {
  const moreCardArr = [];

  getFilmCardsObjArr(true).forEach((item) => {
    moreCardArr.push(new FilmCard({container: null, order: 5, filmCardObj: item}));
  });

  const fragment = document.createDocumentFragment();
  moreCardArr.forEach((item) => {
    fragment.appendChild(item.getElement());
  });
  render(filmContainerEl, fragment);

  if (lastPortion) {
    loadMoreEl.className = `films-list__show-more visually-hidden`;
  }

});

