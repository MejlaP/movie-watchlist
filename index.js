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
        console.log(movieInfoArray)
    }
    else {
        console.log('Nothing')
    }
}

