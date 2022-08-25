// Elements
const searchButton = document.getElementById('search-movie')
const foundedMovies = document.getElementById('found-movies')

// API sources
const myApiKey = '98bea6a8'
const baseUrl = 'https://www.omdbapi.com/'

// initialize movies array with all information
let movieInfoArray = []

// execute function after click search button
searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    let movieInput = document.getElementById('my-input-movie')
    movieInput = movieInput.value
    getApiMovies(movieInput)
})

// get movies
async function getApiMovies(inputValue) {

    // fetch movie titles with imdbID
    const responseTitle = await fetch(`${baseUrl}?s=${inputValue}&apikey=${myApiKey}`)
    const dataTitle = await responseTitle.json()
    if (dataTitle.Response === 'True') {

        // create array of founded movies titles with imdbID
        const foundMoviesArray = dataTitle.Search

        // create array for movies with other info, fetch with imdbID paramater
        movieInfoArray = []
        for (const foundMovie of foundMoviesArray) {
            const responseInfo = await fetch(`${baseUrl}?i=${foundMovie.imdbID}&plot=short&apikey=${myApiKey}`)
            const dataInfo = await responseInfo.json()
            movieInfoArray.push(dataInfo)
        }
        // call function renderMovies
        renderMovies(movieInfoArray)
    }
    else {
        foundedMovies.innerHTML =
            `<h6 class="unable-to-find" >Unable to find what you’re looking for. 
                Please try another search.</h6>`
    }
}


// function with array as parameter, create empty element and then loop the movies array
function renderMovies(moviesArray) {
    let htmlMovies = ""
    for (const movie of moviesArray) {
        htmlMovies += `<div class="movie-container">
                            <img src="${movie.Poster}" alt="found-movie">
                            <div class="movie-card">
                                <div class="movie-title">
                                    <h5>${movie.Title}</h5>
                                    <img src="./img/staricon.png">
                                    <h6>${movie.imdbRating}</h6>
                                </div>
                                <div class="movie-info">
                                    <h6>${movie.Runtime}</h6>
                                    <h6>${movie.Genre}</h6>
                                    <div class="add-watchlist" id="${movie.imdbID}" onclick ="addToWatchList(this.id, event)">
                                        <img src="../img/addicon.png" class="add-to-watchlist" alt="+">
                                        <h6>Watchlist</h6>
                                    </div>
                                </div>
                                <p class="movie-description">${movie.Plot}</p>
                            </div>
                        </div>`
    }

    // element htmlMovies as innerHTML
    foundedMovies.innerHTML = htmlMovies
}

// add movie to watchlist
function addToWatchList(IdMovie, event) {
    const myMovie = movieInfoArray.find(movie => movie.imdbID === IdMovie)
    event.currentTarget.remove()
    saveDataToLocalStorage(myMovie)
}

// save movie to the local storage
function saveDataToLocalStorage(data) {
    let myArray = [];
    // Parse the serialized data back into an aray of objects
    myArray = JSON.parse(localStorage.getItem('session')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    myArray.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('session', JSON.stringify(myArray));
}