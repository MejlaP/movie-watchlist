// Elements
const searchButton = document.getElementById('search-movie')
const foundedMovies = document.getElementById('found-movies')


// API sources
const myApiKey = '98bea6a8'
const baseUrl = 'https://www.omdbapi.com/'

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
        let movieInfoArray = []
        for (const foundMovie of foundMoviesArray) {
            const responseInfo = await fetch(`${baseUrl}?i=${foundMovie.imdbID}&plot=short&apikey=${myApiKey}`)
            const dataInfo = await responseInfo.json()
            movieInfoArray.push(dataInfo)
        }
        // call function renderMovies
        renderMovies(movieInfoArray)
        console.log(movieInfoArray)
    }
    else {
        console.log('Nothing')
    }
}

// function with array as parameter, create empty element and then loop the movies array
function renderMovies(moviesArray) {
    let htmlMovies = ""
    for (let i = 0; i < moviesArray.length; i++) {
        htmlMovies +=   `<div class="movie-container">
                            <img src="${moviesArray[i].Poster}" alt="found-movie">
                            <div class="movie-card">
                                <div class="movie-title">
                                    <h5>${moviesArray[i].Title}</h5>
                                    <img src="./img/starIcon.png">
                                    <h6>${moviesArray[i].imdbRating}</h6>
                                </div>
                                <div class="movie-info">
                                    <h6>${moviesArray[i].Runtime}</h6>
                                    <h6>${moviesArray[i].Genre}</h6>
                                    <div class="add-watchlist">
                                        <img src="./img/addIcon.png" id="add-to-watchlist" />
                                        <h6>Watchlist</h6>
                                    </div>
                                </div>
                                <p class="movie-description">${moviesArray[i].Plot}</p>
                            </div>
                        </div>`
    }

    // element htmlMovies as innerHTML
    foundedMovies.innerHTML = htmlMovies
}

