import {FilmCard} from './components/film-card.js';
import {Filter} from './components/filter.js';
import {Search} from './components/search.js';
import {UserRank} from './components/user-rank.js';
import {Sort} from './components/sort.js';
import {CardContainer} from './components/card-container.js';
import {getFilmData} from './components/data.js';
import {getFilterData} from './components/data.js';
import {FooterStat} from './components/footer-stat.js';
import {PageController} from './page-controller.js';
import {LoadMore} from './components/load-more.js';

const CARDS_TOTAL_QUANTITY = 15;
const CARDS_LOAD_QUANTITY_PORTION = 5;
const USER_RANK = `Movie Buff`;
let cardDataArr = [];
let loadedCardsQuantity = 0;
let cardDataArrPortion = [];
export let lastPortion = 0;

export const getFilmCardsObjArr = (isLoadMore = false) => {

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

  componentObjArray.push({container: searchContainerEl, dataObj: new Search(0)});
  componentObjArray.push({container: searchContainerEl, dataObj: new UserRank({rank: USER_RANK, order: 1})});
  componentObjArray.push({container: mainEl, dataObj: new CardContainer({order: 4})});
  getFilmCardsObjArr().forEach((item) => {
    componentObjArray.push({container: null, dataObj: new FilmCard({order: 5, filmCardObj: item})});
  });
  componentObjArray.push({container: null, dataObj: new LoadMore(6)});
  componentObjArray.push({container: mainEl, dataObj: new Filter({order: 2, filterObjArr: getFilterData(cardDataArr)})});
  componentObjArray.push({container: mainEl, dataObj: new Sort({order: 3})});
  componentObjArray.push({container: footerEl, dataObj: new FooterStat({quant: CARDS_TOTAL_QUANTITY, order: 7})});

  componentObjArray.sort((el1, el2) => el1.dataObj._order - el2.dataObj._order);
}

fillcomponentObjArray();

componentObjArray.forEach(function (item) {
  new PageController(item.container, item.dataObj).init();
});


