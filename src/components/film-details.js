import {deleteElement} from '../utils.js';
import {Comment} from '../components/comment.js';
import {AbstractComponent} from './abstract-component.js';

export class FilmDetails extends AbstractComponent {
  constructor(title = ``, posterSrc = ``, description = ``, year = 2000,
      duration = ``, genre = [], rating = 10.0, comments = ``, isFavorite = false,
      alreadyWatched = false, toWatch = false, director = ``, writers = [], actors = [], country = ``,
      commentsDetail = []) {
    super();
    this._title = title;
    this._posterSrc = posterSrc;
    this._description = description;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._rating = rating;
    this._comments = comments;
    this._isFavorite = isFavorite;
    this._alreadyWatched = alreadyWatched;
    this._toWatch = toWatch;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._country = country;
    this._commentsDetail = commentsDetail;
  }
  getContainer() {
    return document.querySelector(`body`);
  }
  callbackFunc() {
    const elClose = this._element.querySelector(`.film-details__close`);
    elClose.addEventListener(`click`, () => {
      if (document.querySelector(`.film-details`)) {
        deleteElement(this._element);
        this.removeElement(this._element);
      }
    });
  }
  getDtMonth(ms) {
    const dt = new Date(ms);
    return dt.toLocaleString(`en`, {month: `long`});
  }

  getDtDay(ms) {
    const dt = new Date(ms);
    return dt.toLocaleString(`en`, {year: `numeric`});
  }

  getDtYear(ms) {
    const dt = new Date(ms);
    return dt.toLocaleString(`en`, {day: `numeric`});
  }

  getTemplate() {
    let str = ``;
    this._genre.forEach((element) => {
      str = str + `<span class="film-details__genre">${element}</span>`;
    });
    let comms = ``;
    this._commentsDetail.forEach((element) => {
      comms = comms + new Comment(element).getTemplate();
    });
    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._posterSrc}" alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${this.getDtDay(this._year) + ` ` + this.getDtMonth(this._year) + ` ` + this.getDtYear(this._year)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this._duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                ${str}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${comms}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
  }
}