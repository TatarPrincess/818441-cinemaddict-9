import {AbstractComponent} from './abstract-component.js';

export class FilmCard extends AbstractComponent {
  constructor(filmCardObj) {
    super();
    this.id = filmCardObj.id;
    this._title = filmCardObj.title;
    this._posterSrc = filmCardObj.posterSrc;
    this._description = filmCardObj.description;
    this._year = filmCardObj.year;
    this._duration = filmCardObj.duration;
    this._genre = filmCardObj.genre;
    this._rating = filmCardObj.rating;
    this._comments = filmCardObj.comments;
    this._isFavorite = filmCardObj.isFavorite;
    this._alreadyWatched = filmCardObj.alreadyWatched;
    this._toWatch = filmCardObj.toWatch;
    this._director = filmCardObj.director;
    this._writers = filmCardObj.writers;
    this._actors = filmCardObj.actors;
    this._country = filmCardObj.country;
    this._commentsDetail = filmCardObj.commentsDetail;
    this.isNeedRenderDetails = false;
  }
  getDtYear(ms) {
    const dt = new Date(ms);
    return dt.getFullYear();
  }
  render() {
    this._element = this.getTemplate();
    return this._element;
  }
  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this.getDtYear(this._year)}</span>
      <span class="film-card__duration">${this._duration}</span>
      <span class="film-card__genre">${this._genre[0]}</span>
    </p>
    <img src="${this._posterSrc}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._description}</p>
    <a class="film-card__comments">${this._comments}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
    </article>`;
  }
}
