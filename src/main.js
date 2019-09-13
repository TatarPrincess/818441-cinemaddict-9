import {Filter} from './components/filter.js';
import {Search} from './components/search.js';
import {UserRank} from './components/user-rank.js';
import {Sort} from './components/sort.js';
import {FilmList} from './components/film-list.js';
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
export const mainEl = document.querySelector(`.main`);

export const getFilmCardsObjArr = (isLoadMore = false) => {

  if (!isLoadMore) {
    for (let i = 1; i <= CARDS_TOTAL_QUANTITY; i++) {
      cardDataArr.push(getFilmData());
    }
  }

  cardDataArrPortion = cardDataArr.slice(0, CARDS_LOAD_QUANTITY_PORTION + loadedCardsQuantity);
  loadedCardsQuantity += CARDS_LOAD_QUANTITY_PORTION;

  if (!cardDataArrPortion.length) {
    return ``;
  }

  if ((CARDS_TOTAL_QUANTITY - loadedCardsQuantity) < CARDS_LOAD_QUANTITY_PORTION) {
    lastPortion = 1;
  }
  return cardDataArrPortion;
};

const componentObjArray = [];

function fillcomponentObjArray() {
  const searchContainerEl = document.querySelector(`.header`);
  const footerEl = document.querySelector(`.footer`);

  componentObjArray.push({container: searchContainerEl, dataObj: new Search(0)});
  componentObjArray.push({container: searchContainerEl, dataObj: new UserRank({rank: USER_RANK, order: 1})});
  componentObjArray.push({container: mainEl, dataObj: new FilmList({order: 4, filmObjArr: getFilmCardsObjArr()})});
  componentObjArray.push({container: null, dataObj: new LoadMore(5)});
  componentObjArray.push({container: mainEl, dataObj: new Filter({order: 2, filterObjArr: getFilterData(cardDataArr)})});
  componentObjArray.push({container: mainEl, dataObj: new Sort({order: 3})});
  componentObjArray.push({container: footerEl, dataObj: new FooterStat({quant: CARDS_TOTAL_QUANTITY, order: 7})});

  componentObjArray.sort((el1, el2) => el1.dataObj._order - el2.dataObj._order);
}

fillcomponentObjArray();

componentObjArray.forEach(function (item) {
  new PageController(item.container, item.dataObj).init();
});


