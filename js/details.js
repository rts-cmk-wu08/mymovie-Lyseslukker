import { build } from "../module/build.js";

window.addEventListener("DOMContentLoaded", async () => {

    const url = new URLSearchParams(window.location.search)
    const id = url.get("id")
    // console.log(id)

    const main = document.querySelector("main")
    const imgPath = "https://image.tmdb.org/t/p/original"
    const apiKey = "d11a1cfa6288bb52912afde72b965e48"
    const movieDetailsApi = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d11a1cfa6288bb52912afde72b965e48`)
    const movieData = await movieDetailsApi.json()
    const genreAPI = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    const genreData = await genreAPI.json()
    const movieGenreArray = []
    movieData.genres.forEach((genre) => {
        const filteredGenres = genreData.genres.filter((ele) => {
            return ele.id === genre.id
        })
        movieGenreArray.push(filteredGenres[0].name)
    })
    const castApi = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`)
    const castData = await castApi.json()

    // console.log(movieData)
    // console.log(castData)


    // details
    build("div", "details", "main")

    // details__topBar
    build("div", "details__topBar", ".details", `
        <div>
            <a href="http://127.0.0.1:5500/index.html"> <i class="fa-solid fa-arrow-left"></i> </a>
        </div>
        <div>
            <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
            </label>
        </div>
    `)

    // details__heroImgBox
    build("div", "details__heroImgBox", ".details", `
        <img src="${imgPath + movieData.poster_path}" alt="${movieData.title}">
    `)

    // details__description
    build("div", "details__description", ".details")

    // details__description__headerBookmark
    build("div", "details__description__headerBookmark", ".details__description", `
        <div>
            <h1>${movieData.title}</h1>
        </div>
        <div>
            <i class="fa-regular fa-bookmark"></i>
        </div>
    `)

    const movieDataVoteAverage = movieData.vote_average.toFixed(1)
    // details__description__raiting
    build("div", "details__description__raiting", ".details__description", `
        <i class="fa-solid fa-star"></i>
        <p>${movieDataVoteAverage + "/10 " + "IMDb"}</p>
    `)

    // details__description__genres
    build("div", "details__description__genres", ".details__description")
    movieGenreArray.forEach((ele) => {
        build("p", "details__description__genres__p", ".details__description__genres", `
            ${ele}
        `)
    })

    // details__description__keyPoints
    build("div", "details__description__keyPoints", ".details__description")
        
        const timeInHours = Math.floor(movieData.runtime / 60)
        const restMinutes = movieData.runtime % 60
        // details__description__keyPoints__length
        build("div", "details__description__keyPoints__length", ".details__description__keyPoints", `
            <p>Length</p>
            <p>${timeInHours + "h " + restMinutes + "min"}</p>
        `)
        // details__description__keyPoints__language
        build("div", "details__description__keyPoints__language", ".details__description__keyPoints", `
            <p>Language</p>
            <p>${movieData.spoken_languages[0].english_name}</p>
        `)
        // details__description__keyPoints__raiting
        build("div", "details__description__keyPoints__raiting", ".details__description__keyPoints", `
            <p>Rating</p>
            <p>PG-13</p>
        `)
    
    // details__description__read
    build("div", "details__description__read", ".details__description", `
        <h2>Description</h2>
        <p>${movieData.overview}</p>
    `)
    // details__description__castTop
    build("div", "details__description__castTop", ".details__description", `
        <div>
            <h2>Cast</h2>
        </div>
        <div>
            <button>See More</button>
        </div>
    `)
    // details__description__cast
    build("div", "details__description__cast", ".details__description")
    // details__description__cast__card
    castData.cast.forEach((ele, index) => {        
        if (index < 10) {
            build("div", "details__description__cast__card", ".details__description__cast", `
                <img src="${imgPath + ele.profile_path}" alt="${ele.name}">
                <p>${ele.name}</p>
            `)
        } else {
            return
        }
    })
    
    
    // DARKMODE
    const toggleButton = document.querySelector(".switch")
    const details__description = document.querySelector(".details__description")
    const darkmodeGenre = document.querySelectorAll(".details__description__genres__p")
    const checkButton = document.querySelector(".switch>input")

    const status = url.get("darkmode")
    console.log(status)
    console.log(darkmodeGenre)

    
    const darkModeActivate = () => {
        main.classList.toggle("darkmode")
        details__description.setAttribute("id", "dominantDarkmode")
        darkmodeGenre.forEach((genre) => {
            genre.classList.toggle("genreDarkmode")
        })
        localStorage.setItem("darkmode", "enabled")
    }
    
    const darkModeDisable = () => {
        main.classList.remove("darkmode")
        details__description.removeAttribute("id")
        darkmodeGenre.forEach((genre) => {
            genre.classList.toggle("genreDarkmode")
        })
        localStorage.setItem("darkmode", "disabled")
    }
    
    if (status === "enabled") {
        checkButton.setAttribute("checked", "")
        darkModeActivate()
    }

    toggleButton.addEventListener("mousedown", () => {
        if (status === "disabled") {
            darkModeActivate()
        }
        else {
            darkModeDisable()
        }
    })

})