export const getFilterMarkup = ([all, watchList, history, favorities]) => `<nav class="main-navigation">
                                      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies <span class="main-navigation__item-count">${all.count}</span></a>
                                      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchList.count}</span></a>
                                      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.count}</span></a>
                                      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorities.count}</span></a>
                                      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
                                    </nav>`;
