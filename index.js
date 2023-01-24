"use strict";

const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const movieKey = document.getElementsByClassName('movie-key')

//Control function
searchBtn.onclick = function run() {
    if (searchInput.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Snälla...',
            text: 'Ange ett film namn!'
        })
    }

    else {
        searchMovies()
    }
}

//Run function
async function searchMovies() {

    if (moviesList.children) {
        let children = moviesList.children
        let childrenArr = Array.prototype.slice.call(children)
        childrenArr.forEach((child) => child.remove())
    }

    //http://www.omdbapi.com/?s=${searchMovie}&apikey=61efabcc 
    let res = await fetch(`https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=61efabcc`)
    let data = await res.json()

    const movies = data.Search

    // Get and display search results
    movies.forEach(async (movie) => {
        let response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=61efabcc`)
        let moviesListData = await response.json()

        const summaryPlot = `${moviesListData.Plot}`

        const completePlot = moviesListData.Plot
        const longPlot = summaryPlot
        const movieID = moviesListData.imdbID
        const movieIDkey = moviesListData.imdbID + 'key'

        moviesList.innerHTML += `
                <div class="cards">
                    <div class="card" id=${movieID}>
                        <span id=${movieIDkey} class="hide movie-key">${movieIDkey}</span>
                        <img src=${moviesListData.Poster} class="card-poster" />

                        <div class="card-header">
                            <h2 class="card-title">${moviesListData.Title}</h2>
                            <img src="images/star-icon.svg" class="star-icon" />
                            <span class="card-rating">${moviesListData.imdbRating}</span>
                        </div>
                        
                        <div class="card-meta">
                            <span class="card-runtime">${moviesListData.Runtime}</span>
                            <span>${moviesListData.Genre}</span>
                        </div>
                        <p class="card-plot">${completePlot.length < 110 ? completePlot : longPlot}</p>
                    </div>
                </div>
            `
    })
}