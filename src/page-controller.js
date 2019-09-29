import {getCardDataArr} from './main.js';
import {Filter} from './components/filter.js';
import {Search} from './components/search.js';
import {UserRank} from './components/user-rank.js';
import {Sort} from './components/sort.js';
import {FilmDetails} from './components/film-details.js';
import {getFilterData} from './components/data.js';
import {FooterStat} from './components/footer-stat.js';
import {MovieController} from './movie-controller.js';


export class PageController {
  constructor() {
    this._subscriptions = [];
    this._cardDataArr = getCardDataArr();
    this._componentObjArray = [];
    this._movieControllerObj = null;
    this._mainEl = document.querySelector(`.main`);
  }
  getCardElement(id) {
    const cards = document.querySelectorAll(`.film-card`);
    return cards.find((item) => item.getAttribute(`id`) === id);
  }
  onDataChange(elClicked = null) {
    const filmDetailsEl = document.querySelector(`.film-details`);
    const parent = (filmDetailsEl) ? filmDetailsEl : elClicked.parentNode.parentNode;
    let isCardDetail = (parent === filmDetailsEl) ? true : false;
    let comments = [];
    const getCommentObj = (element) => ({
      emoji: element.querySelector(`img`).src,
      text: element.querySelector(`.film-details__comment-text`).textContent,
      author: element.querySelector(`.film-details__comment-author`).textContent,
      daysAgo: element.querySelector(`.film-details__comment-day`).textContent,
      isDeleted: false
    });
    function getCommentsArr() {
      parent.querySelectorAll(`.film-details__comment`).forEach((item) => {
        comments.push(getCommentObj(item));
      });
      return comments;
    }
    const record = {
      title: (!isCardDetail) ? (parent.querySelector(`.film-card__title`)).textContent :
        (parent.querySelector(`.film-details__title`)).textContent,
      posterSrc: (!isCardDetail) ? parent.querySelector(`.film-card__poster`).src :
        parent.querySelector(`.film-details__poster-img`).src,
      description: (!isCardDetail) ? (parent.querySelector(`.film-card__description`)).textContent :
        (parent.querySelector(`.film-details__film-description`)).textContent,
      year: (!isCardDetail) ? (parent.querySelector(`.film-card__year`)).textContent :
        (parent.querySelector(`.film-details__film-description`)).textContent,
      duration: (!isCardDetail) ? (parent.querySelector(`.film-card__duration`)).textContent :
        (parent.querySelector(`table :nth-child(5)`).querySelector(`.film-details__cell`)).textContent,
      genre: (!isCardDetail) ? parent.querySelector(`.film-card__genre`).textContent :
        ((parent.querySelector(`table :nth-child(7)`).querySelector(`:nth-child(2)`)).textContent).split(`,`),
      rating: (!isCardDetail) ? parent.querySelector(`.film-card__rating`).textContent : parent.querySelector(`.film-details__total-rating`).textContent,
      director: (!isCardDetail) ? null : (parent.querySelector(`table :nth-child(1)`).querySelector(`:nth-child(2)`)).textContent,
      writers: (!isCardDetail) ? null : ((parent.querySelectorAll(`table tr`).item(1).querySelector(`:nth-child(2)`)).textContent).split(`,`),
      actors: (!isCardDetail) ? null : ((parent.querySelector(`table :nth-child(3)`).querySelector(`:nth-child(2)`)).textContent).split(`,`),
      country: (!isCardDetail) ? null : (parent.querySelector(`table :nth-child(6)`).querySelector(`:nth-child(2)`)).textContent,
      comments: (!isCardDetail) ? null : getCommentsArr(),
      isFavorite: (!isCardDetail) ? parent.querySelector(`.film-card__controls`).getAttribute(`isFavorite`) :
        parent.querySelector(`#favorite`).getAttribute(`isFavorite`),
      alreadyWatched: (!isCardDetail) ? parent.querySelector(`.film-card__controls`).getAttribute(`alreadyWatched`) :
        parent.querySelector(`#watched`).getAttribute(`val`),
      toWatch: (!isCardDetail) ? parent.querySelector(`.film-card__controls`).getAttribute(`val`) :
        parent.querySelector(`#watchlist`).getAttribute(`val`),
      id: parent.getAttribute(`id`)
    };
    function updateData() {
      const changedObj = this._cardDataArr.find((item) => item.id === record.id);
      changedObj.title = record.title;
      changedObj.posterSrc = record.posterSrc;
      changedObj.description = record.description;
      changedObj.year = record.year;
      changedObj.duration = record.duration;
      changedObj.genre = record.genre;
      changedObj.rating = record.rating;
      if (record.director) {
        changedObj.director = record.director;
      }
      if (record.writers) {
        changedObj.writers = record.writers;
      }
      if (record.actors) {
        changedObj.actors = record.actors;
      }
      if (record.country) {
        changedObj.country = record.country;
      }
      if (record.comments) {
        changedObj.comments = record.comments;
      }
      changedObj.isFavorite = record.isFavorite;
      changedObj.alreadyWatched = record.alreadyWatched;
      changedObj.toWatch = record.toWatch;
    }
    const boundUpdateData = updateData.bind(this);
    function reRenderFilms() {
      const filmDetailOpenedEl = document.querySelector(`.film-details`);
      this._movieControllerObj = new MovieController({data: this._cardDataArr,
        onDataChange: this.onDataChange.bind(this), onChangeView: this.onChangeView.bind(this)});
      this._subscriptions.push(this._movieControllerObj.setDefaultView);
      this._movieControllerObj.unrender();
      this._movieControllerObj.render(this._mainEl, this._movieControllerObj);
      this._movieControllerObj.init();

      if (filmDetailOpenedEl) {
        const id = filmDetailOpenedEl.getAttribute(`id`);
        const dataObj = this._cardDataArr.find((item) => item.id === id);
        this._filmDetailsObj = new FilmDetails(dataObj);
        this._filmDetailsObj.unrender();
        this._filmDetailsObj.render(document.querySelector(`body`));
        this._movieControllerObj.clickCallbackForFilmDetailChildren();
      }
    }
    const boundReRenderFilms = reRenderFilms.bind(this);

    boundUpdateData(); // так работает, но если закомментировать эту строку
    // updateData().bind(this);  и расскомментировать эту - почему-то нет.. Как привязать контекст и вызвать функцию одним действием?
    boundReRenderFilms();
  }
  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
  getMovieControllerObj() {
    this._movieControllerObj = new MovieController({data: this._cardDataArr,
      onDataChange: this.onDataChange.bind(this), onChangeView: this.onChangeView.bind(this)});
    this._subscriptions.push(this._movieControllerObj.setDefaultView);
  }
  getcomponentObjArray() {
    const USER_RANK = `Movie Buff`;
    const searchContainerEl = document.querySelector(`.header`);
    const footerEl = document.querySelector(`.footer`);
    this.getMovieControllerObj();

    this._componentObjArray = [
      {container: searchContainerEl, component: this._searchObj = new Search()},
      {container: searchContainerEl, component: this._userRankObj = new UserRank(USER_RANK)},
      {container: this._mainEl, component: this._filterObj = new Filter(getFilterData(this._cardDataArr))},
      {container: this._mainEl, component: this._sortObj = new Sort()},
      {container: this._mainEl, component: this._movieControllerObj},
      {container: footerEl, component: this._footerStatObj = new FooterStat(this._cardDataArr.length)}
    ];
  }
  init() {
    this.getcomponentObjArray();
    this._componentObjArray.forEach(function (item) {
      item.component.render(item.container);
    });
  }
}
