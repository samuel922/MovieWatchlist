const watchlistItemsEl = document.querySelector(".movie__items--wachlist")

function renderWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")

  const watchlistItems = watchlist.map(item => {
    return `
    
            <div class="movie">
                <div class="movie__img">
                    <img src="${item.Poster}" alt="${item.Title}" />
                </div>
                <div class="movie__details">
                    <div class="movie__title">
                        <h2 class="movie__name">${item.Title}</h2>
                        <span><i class="fa-regular fa-star"></i> ${item.imdbRating}</span>
                    </div>
                    <div class="movie__stats">
                        <span>${item.Runtime}</span>
                        <span>${item.Genre}</span>
                        <button class="add-watchlist" onclick="handleAddToWatchlist('${item.imdbID}')">
                            <i class="fa-solid fa-plus"></i>
                            <span>Watchlist</span>
                        </button>
                    </div>
                    <p class="movie__description">${item.Plot}</p>
                </div>
            </div>
    
    `
  }).join("")

  watchlistItemsEl.innerHTML = watchlistItems
  // console.log(watchlistItems)
}

renderWatchlist()