const API_KEY = "37b48b43"
const BASE_URL = "http://www.omdbapi.com/"
let searchResults = []

const searchText = document.getElementById("search-text")
const searchBtn = document.getElementById("search--btn")
const movieItems = document.getElementById("movie__items")


searchBtn.addEventListener("click", async () => {
    if (!searchText.value) return

    try {
        // Step 1: Search for matching titles
        const url = `${BASE_URL}?apikey=${API_KEY}&s=${searchText.value}`
        const response = await fetch(url)
        const data = await response.json()

        if (!data.Search) {
            console.log("No results found")
            return
        }

        // Step 2: Fetch full details for each result
        const detailPromises = data.Search.map((search) => {
            const searchUrl = `${BASE_URL}?apikey=${API_KEY}&t=${search.Title}`
            return fetch(searchUrl).then(res => res.json())
        })

        // Step 3: Wait for all, filter out failed responses
        searchResults = (await Promise.all(detailPromises)).filter(m => m.Response === "True")

        renderResults(searchResults)

    } catch (error) {
        console.error("Something went wrong:", error)
    }
})

function handleAddToWatchlist(imdbID) {
    const movie = searchResults.find(m => m.imdbID === imdbID)
    if (!movie) return

    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
    const alreadyAdded = watchlist.some(m => m.imdbID === imdbID)

    if (alreadyAdded) {
        console.log("Already in watchlist")
        return
    }

    watchlist.unshift(movie)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    console.log(`${movie.Title} added to watchlist`)
}

function renderResults(searches) {
    const results = searches.map(search => {
        return `
            <div class="movie">
                <div class="movie__img">
                    <img src="${search.Poster}" alt="${search.Title}" />
                </div>
                <div class="movie__details">
                    <div class="movie__title">
                        <h2 class="movie__name">${search.Title}</h2>
                        <span><i class="fa-regular fa-star"></i> ${search.imdbRating}</span>
                    </div>
                    <div class="movie__stats">
                        <span>${search.Runtime}</span>
                        <span>${search.Genre}</span>
                        <button class="add-watchlist" onclick="handleAddToWatchlist('${search.imdbID}')">
                            <i class="fa-solid fa-plus"></i>
                            <span>Watchlist</span>
                        </button>
                    </div>
                    <p class="movie__description">${search.Plot}</p>
                </div>
            </div>
        `
    }).join("")

    movieItems.innerHTML = results
}



