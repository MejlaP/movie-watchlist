// get items from local storage for following render
let moviesFromLocalStorage = JSON.parse(localStorage.getItem('session'))

// grab element
const foundedMovies = document.getElementById('found-movies')

// function for rendering movies
function renderMoviesFromLocalStorage(moviesArray) {
    let htmlMovies = ""
    for (const movie of moviesArray) {
        htmlMovies += `<div class="movie-container">
                            <img src="${movie.Poster}" alt="found-movie">
                            <div class="movie-card">
                                <div class="movie-title">
                                    <h5>${movie.Title}</h5>
                                    <img src="./img/starIcon.png">
                                    <h6>${movie.imdbRating}</h6>
                                </div>
                                <div class="movie-info">
                                    <h6>${movie.Runtime}</h6>
                                    <h6>${movie.Genre}</h6>
                                    <div class="add-watchlist">
                                        <img src="./img/deleteIcon.png" class="add-to-watchlist" />
                                        <h6 id="${movie.imdbID}" onclick ="deleteMovie(this.id)">Remove</h6>
                                    </div>
                                </div>
                                <p class="movie-description">${movie.Plot}</p>
                            </div>
                        </div>`
    }

    // element htmlMovies as innerHTML
    foundedMovies.innerHTML = htmlMovies
}

// render movies from local storage
renderMoviesFromLocalStorage(moviesFromLocalStorage)

// function for deleting movie
const deleteMovie = (IdOfMovie) => {
    
    // get index of object with id of IdOfMovie
    const removeMovieById = moviesFromLocalStorage.findIndex(movie => movie.imdbID === IdOfMovie);
    
    // remove object
    moviesFromLocalStorage.splice(removeMovieById, 1)

    // insert updated session to local storage
    localStorage.setItem("session", JSON.stringify(moviesFromLocalStorage))
    renderMoviesFromLocalStorage(moviesFromLocalStorage)
}