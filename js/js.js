import { build } from "../module/build.js"

window.addEventListener("DOMContentLoaded", async () => {

    const main = document.querySelector("main")
    const apiKey = "d11a1cfa6288bb52912afde72b965e48"
    const imgPath = "https://image.tmdb.org/t/p/original"
    const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    const movieGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    
    // Popular movies
    const popularMovie = await fetch(popularURL)
    const jsonPopularMovieData = await popularMovie.json()
    const popularMovieData = jsonPopularMovieData.results
    
    // Now Playing movies
    const nowPlayingMovie = await fetch(nowPlayingURL)
    const nowPlayingMovieData = await nowPlayingMovie.json()
    
    // Movie Genres
    const genreAPI = await fetch(movieGenre)
    const genreData = await genreAPI.json()

    // console.log(nowPlayingMovieData)
    
    
    
    // myMovies WRAPPER
    build("div", "myMovies", "main")
    // myMovies HEADER
    build("header", "myMovies__header", ".myMovies", `
        <h1>myMovies</h1>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
    `)
    // myMovies__top
    build("div", "myMovies__top", ".myMovies", `
        <h2>Now Showing</h2>
        <div class="myMovies__top__buttonBox">
            <button>See More</button>
        </div>
    `)

    
    /*=============================================
    =            nowShowing            =
    =============================================*/
    
    // myMovies__nowShowing
    build("div", "myMovies__nowShowing", ".myMovies")

    nowPlayingMovieData.results.forEach(async (element, index) => {

    
        // myMovies__nowShowing__movie
        const nowShowingWrapper = document.querySelector(".myMovies__nowShowing")
        const myMovies__nowShowing__movie = document.createElement("div")
        myMovies__nowShowing__movie.classList.add("myMovies__nowShowing__movie")
        myMovies__nowShowing__movie.setAttribute("id", element.id)
        // build("div", "myMovies__nowShowing__movie", ".myMovies__nowShowing")
        nowShowingWrapper.append(myMovies__nowShowing__movie)

        // myMovies__nowShowing__movie__imgBox
        build("div", "myMovies__nowShowing__movie__imgBox", ".myMovies__nowShowing__movie", `
            <img src="${imgPath + element.poster_path}" alt="${element.title}">
        `, index)

        // myMovies__nowShowing__movie__details
        build("div", "myMovies__nowShowing__movie__details", ".myMovies__nowShowing__movie", `
            <p>${element.title}</p>
            <div>
                <i class="fa-solid fa-star"></i>
                <p>${element.vote_average + "/10 IMDb"}</p>
            </div>
        `, index)

        // console.log(element.vote_average)
    })


    
    /*=============================================
    =            Popular            =
    =============================================*/
    
    // myMovies__popularTop
    build("div", "myMovies__popularTop", ".myMovies", `
        <h2>Popular</h2>
        <div class="myMovies__popularTop__buttonBox">
            <button>See More</button>
        </div>
    `)
    build("div", "myMovies__popular__wrapper", ".myMovies")

    
    // Popular Movie
    popularMovieData.forEach(async (element, indexOne) => {
        // myMovies__popular
        const wrapper = document.querySelector(".myMovies__popular__wrapper")
        const myMovies__popular = document.createElement("div")
        myMovies__popular.classList.add("myMovies__popular")
        myMovies__popular.setAttribute("id", element.id)
        wrapper.append(myMovies__popular)

        // myMovies__popular__imgBox
        build("div", "myMovies__popular__imgBox", ".myMovies__popular", `
            <img src="${imgPath + element.poster_path}" alt="${element.title}">      
        `, indexOne)
        // myMovies__popular__details
        build("div", "myMovies__popular__details", ".myMovies__popular", "", indexOne)
        // myMovies__popular__details__title
        build("div", "myMovies__popular__details__title", ".myMovies__popular__details", `
            <h2>${element.title}</h2>
        `, indexOne)
        // myMovies__popular__details__rating
        build("div", "myMovies__popular__details__rating", ".myMovies__popular__details", `
            <i class="fa-solid fa-star"></i>
            <p>${element.vote_average + "/10 IMDb"}</p>
        `, indexOne)
        // myMovies__popular__details__genre BOX
        build("div", "myMovies__popular__details__genre", ".myMovies__popular__details", "", indexOne)
        

        let singleMovieURLid = element.id
        // console.log(singleMovieURLid)
        const singleMovieURL = `https://api.themoviedb.org/3/movie/${singleMovieURLid}?api_key=d11a1cfa6288bb52912afde72b965e48`
        const singleMovie = await fetch(singleMovieURL)
        const singleMovieData = await singleMovie.json()
        // console.log(singleMovieData)
        
        singleMovieData.genres.forEach((genre, index) => {
            if (index < 3) {
                build("p", "myMovies__popular__details__genre__p", ".myMovies__popular__details__genre", `
                    ${genre.name}
                `, indexOne)
            } else {
                return
            }
        })

        const runTimeInMinutes = singleMovieData.runtime
        const runTimeInHours = Math.floor(runTimeInMinutes / 60)
        const runTimeMinutesLeft = runTimeInMinutes % 60

        // myMovies__popular__details__duration
        build("div", "myMovies__popular__details__duration", ".myMovies__popular__details", `
            <i class="fa-regular fa-clock"></i>
            <p>${runTimeInHours + "h " + runTimeMinutesLeft + "m"}</p>
        `, indexOne)
    })




    
    
    /*=============================================
    =            NAV            =
    =============================================*/
    
    // myMovies__nav
    build("nav", "myMovies__nav", "main")

    // myMovies__nav__movies
    build("div", "myMovies__nav__movies", ".myMovies__nav", `
        <i class="fa-solid fa-video"></i>    
    `)

    // myMovies__nav__tickets
    build("div", "myMovies__nav__tickets", ".myMovies__nav", `
        <i class="fa-solid fa-ticket"></i>
    `)

    // myMovies__nav__bookmarks
    build("div", "myMovies__nav__bookmarks", ".myMovies__nav", `
        <i class="fa-regular fa-bookmark"></i>
    `)



    // CLICK EVENTS
    const nowShowingCards = document.querySelectorAll(".myMovies__nowShowing__movie")
    const popularCards = document.querySelectorAll(".myMovies__popular")

    const goToPage = (event) => {
        const tempStatus = localStorage.getItem("darkmode")
        const id = event.currentTarget.getAttribute("id")
        window.location.href = `http://127.0.0.1:5500/details.html?id=${id}&darkmode=${tempStatus}`
    }
    
    nowShowingCards.forEach((ele) => {
        ele.addEventListener("click", goToPage)
    })
    popularCards.forEach((ele) => {
        ele.addEventListener("click", goToPage)
    })




    // DARKMODE
    const toggleButton = document.querySelector(".switch")
    const checkButton = document.querySelector(".switch>input")
    const navigation = document.querySelectorAll(".myMovies__nav>div")
    const status = localStorage.getItem("darkmode")
    
    const darkModeActivate = () => {
        main.classList.toggle("darkmode")
        navigation.forEach((ele) => { ele.classList.toggle("darkmode")})
        localStorage.setItem("darkmode", "enabled")
    }
    
    const darkModeDisable = () => {
        main.classList.toggle("darkmode")
        navigation.forEach((ele) => { ele.classList.toggle("darkmode")})
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
    
    
    

    // Infinite Scrolling
    const myMovies__popular = document.querySelectorAll(".myMovies__popular")
    const lastMovie__inList = myMovies__popular[myMovies__popular.length - 1]
    // console.log(lastMovie__inList)
    
    let observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting === true) {
            console.log(entry)
            infinitePopularMovieFn()
        }
    }, {
        rootMargin: "250px"
    })
    
    observer.observe(lastMovie__inList)
    // console.log(popularMovieData)
    
    let currentPage = 1
    
    
    // Popular Movie Function
    const infinitePopularMovieFn = async () => {
        
        currentPage++
        const currentMyMovie__popular = document.querySelectorAll(".myMovies__popular")
        const currentLastMovie__inList = currentMyMovie__popular[currentMyMovie__popular.length - 1]
        observer.unobserve(currentLastMovie__inList)

        const newTempData = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`)
        const newJsonData = await newTempData.json()
        const newData = await newJsonData.results
        console.log(newJsonData)


        newData.forEach(async (element) => {
            // myMovies__popular
            const wrapper = document.querySelector(".myMovies__popular__wrapper")
            const currentShowingNodeList = document.querySelectorAll(".myMovies__popular")
            const indexOne = currentShowingNodeList.length
            // console.log(lastOfCurrentShowingNodeList)
            const myMovies__popular = document.createElement("div")
            myMovies__popular.classList.add("myMovies__popular")
            myMovies__popular.addEventListener("click", goToPage)
            myMovies__popular.setAttribute("id", element.id)
            wrapper.append(myMovies__popular)

            // myMovies__popular__imgBox
            build("div", "myMovies__popular__imgBox", ".myMovies__popular", `
                <img src="${imgPath + element.poster_path}" alt="${element.title}">      
            `, indexOne)
            // myMovies__popular__details
            build("div", "myMovies__popular__details", ".myMovies__popular", "", indexOne)
            // myMovies__popular__details__title
            build("div", "myMovies__popular__details__title", ".myMovies__popular__details", `
                <h2>${element.title}</h2>
            `, indexOne)
            // myMovies__popular__details__rating
            build("div", "myMovies__popular__details__rating", ".myMovies__popular__details", `
                <i class="fa-solid fa-star"></i>
                <p>${element.vote_average + "/10 IMDb"}</p>
            `, indexOne)
            // myMovies__popular__details__genre BOX
            build("div", "myMovies__popular__details__genre", ".myMovies__popular__details", "", indexOne)
            

            let singleMovieURLid = element.id
            // console.log(singleMovieURLid)
            const singleMovieURL = `https://api.themoviedb.org/3/movie/${singleMovieURLid}?api_key=d11a1cfa6288bb52912afde72b965e48`
            const singleMovie = await fetch(singleMovieURL)
            const singleMovieData = await singleMovie.json()
            // console.log(singleMovieData)

            singleMovieData.genres.forEach((genre, index) => {
                if (index < 3) {
                    build("p", "myMovies__popular__details__genre__p", ".myMovies__popular__details__genre", `
                        ${genre.name}
                    `, indexOne)
                } else {
                    return
                }
            })

            const runTimeInMinutes = singleMovieData.runtime
            const runTimeInHours = Math.floor(runTimeInMinutes / 60)
            const runTimeMinutesLeft = runTimeInMinutes % 60

            // myMovies__popular__details__duration
            build("div", "myMovies__popular__details__duration", ".myMovies__popular__details", `
                <i class="fa-regular fa-clock"></i>
                <p>${runTimeInHours + "h " + runTimeMinutesLeft + "m"}</p>
            `, indexOne)
        })



        const newmyMovies__popular = document.querySelectorAll(".myMovies__popular")
        const newlastMovie__inList = newmyMovies__popular[newmyMovies__popular.length - 1]
        observer.observe(newlastMovie__inList)

    }


    

    

})