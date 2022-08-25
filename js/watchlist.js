// get items from local storage for following render
let moviesFromLocalStorage = JSON.parse(localStorage.getItem('session'))

// grab element
const foundedMovies = document.getElementById('found-movies')

// function for rendering movies
function renderMoviesFromLocalStorage(moviesArray) {

    // check if array exists or it is empty
    if (moviesArray !== null && moviesArray.length) {

        // if not, render moviesArray
        let htmlMovies = ""
        for (const movie of moviesArray) {
            htmlMovies += `<div class="movie-container movie-watchlist">
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
                                    <div class="remove-watchlist" id="${movie.imdbID}" onclick ="deleteMovie(this.id)">
                                        <img src="./../img/deleteIcon.png"/>
                                        <h6>Remove</h6>
                                    </div>
                                </div>
                                <p class="movie-description">${movie.Plot}</p>
                            </div>
                        </div>`
        }

        // element htmlMovies as innerHTML
        foundedMovies.innerHTML = htmlMovies
    }

    // else render message about empty watchlist
    else {
        foundedMovies.innerHTML = `<div class="empty-watchlist">
                                        <h6>Your watchlist is looking a little empty...</h6>
                                        <a href="./index.html">
                                        <div class="empty-watchlist-text-icon">
                                        <img src="./img/addIcon.png"/>
                                        <p>Let’s add some movies!</p>
                                        </div>
                                        </a>
                                   </div>`
    }
}

// run function for render movies from local storage
renderMoviesFromLocalStorage(moviesFromLocalStorage)

// function for deleting movie
const deleteMovie = (IdOfMovie) => {

    // get index of object with id of IdOfMovie
    const removeMovieById = moviesFromLocalStorage.findIndex(movie => movie.imdbID === IdOfMovie);

    // remove object
    moviesFromLocalStorage.splice(removeMovieById, 1)

    // insert updated session to local storage and then render movies
    localStorage.setItem("session", JSON.stringify(moviesFromLocalStorage))
    renderMoviesFromLocalStorage(moviesFromLocalStorage)
}