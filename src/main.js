import {getFilmData} from './components/data.js';
import {PageController} from './page-controller.js';

export function getCardDataArr() {
  const CARDS_TOTAL_QUANTITY = 15;
  let cardDataArr = [];

  for (let i = 1; i <= CARDS_TOTAL_QUANTITY; i++) {
    cardDataArr.push(getFilmData());
  }
  return cardDataArr;
}

new PageController().init();
