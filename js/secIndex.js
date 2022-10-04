window.addEventListener("DOMContentLoaded", async () => {

    // Darkmode
    // localStorage.setItem("darkmode", "on")
    const darkmodeStylesheet = document.querySelector(".darkmodeStylesheet")
    const darkmodeLocal = localStorage.getItem("darkmode")
    const toggleButton = document.querySelector(".switch")
    const checkButton = document.querySelector(".switch>input")
    if (darkmodeLocal === "on") {
        darkmodeStylesheet.toggleAttribute("disabled")
        checkButton.toggleAttribute("checked")
    }

    toggleButton.addEventListener("mousedown", () => {
        darkmodeStylesheet.toggleAttribute("disabled")
        if (localStorage.getItem("darkmode") === "on") {
            localStorage.setItem("darkmode", "off")
        }
        else {
            localStorage.setItem("darkmode", "on")
        }
    })

    // API Key
    const apiKey = "d11a1cfa6288bb52912afde72b965e48"
    
    // Image Path
    const imgStartPath = "https://image.tmdb.org/t/p/original"
    
    // Now Showing Data
    const nowShowingTemp = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
    const nowShowingData = await nowShowingTemp.json()
    
    // Popular Data
    const popularTemp = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    const popularData = await popularTemp.json()

    // Popular Page
    let page = 0
    
    
    
    /*=============================================
    =                 Now Playing            =
    =============================================*/
    
    // nowShowing__movies Card
    const nowShowing__movies = document.querySelector(".nowShowing__movies")

    nowShowingData.results.forEach((movie) => {

        // Create Now Showing Card        
        const nowShowing__movies__movie = document.createElement("a")
        nowShowing__movies__movie.classList.add("nowShowing__movies__movie")
        nowShowing__movies__movie.setAttribute("href", `secDetails.html?id="${movie.id}"`)
        nowShowing__movies__movie.innerHTML = `
            <div class="nowShowing__movies__movie__imgBox">
                <span class="loader"></span>
            </div>
            <div class="nowShowing__movies__movie__text">
                <div class="nowShowing__movies__movie__text__title">
                    <h3>${movie.title}</h3>
                </div>
                <div class="nowShowing__movies__movie__text__imdb">
                    <div class="icon">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="imdb">
                        <p>${movie.vote_average + "/10 IMDb"}</p>
                    </div>
                </div>
            </div>
        `
        nowShowing__movies.append(nowShowing__movies__movie)

        // Lazy load Image
        const lazyImage = new Image
        lazyImage.src = imgStartPath + movie.poster_path
        lazyImage.onload = () => {
            // console.log(lazyImage)
            nowShowing__movies__movie.querySelector(".loader").remove()
            nowShowing__movies__movie.querySelector(".nowShowing__movies__movie__imgBox").append(lazyImage)
        }
    })


    // Popular
    // popular__movies
    const popular__movies = document.querySelector(".popular__movies")

    
    // Intersection Observer (Infinite Scrolling)
    const observedMutation = document.querySelector(".popular__movies")
    let mutationArray = []
    const mutationObserver = new MutationObserver((entries) => {
        mutationArray.push(entries[0].addedNodes[0])
        // console.log(mutationArray.length)
        if (mutationArray.length !== 20) {
            return
        } else {
            observer.observe(mutationArray[19])
            mutationArray.forEach((mutation) => {
                isInViewObserver.observe(mutation)
            })
            mutationArray = []
        }
    })
    mutationObserver.observe(observedMutation, { childList: true })
    
    // Infinite Scrolling
    const observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting === true) {
            createPopularList()
            observer.unobserve(entry[0].target)
        }
    }, {
        rootMargin: "300px"
    })


    // Show and Hide Observer
    const isInViewObserver = new IntersectionObserver((entries) => {
        entries.forEach((eachEntry) => {
            if (eachEntry.isIntersecting === true) {
                // console.log(eachEntry)
                eachEntry.target.classList.add("show")
                isInViewObserver.unobserve(eachEntry.target)
            } else {
                eachEntry.target.classList.remove("show")
            }
        })
    }, {
        threshold: 0.5
    })



    // Create Popular Data
    const createPopularList = async () => {
        page++

        // Popular Data
        const PopularTemp = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
        const newPopularData = await PopularTemp.json()

        newPopularData.results.forEach( async (movie) => {
            // ID from each movie
            const movieID = movie.id

            // console.log(movie)
    
            // Single Movie Data
            const singleMovieTemp = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
            const singleMovieData = await singleMovieTemp.json()
            // console.log(singleMovieData)
           
            // Create popular Card
            const popular__movies__card = document.createElement("a")
            popular__movies__card.classList.add("popular__movies__card")
            popular__movies__card.setAttribute("href", `secDetails.html?id="${singleMovieData.id}"`)
            popular__movies__card.innerHTML = `
            <div class="popular__movies__card__imgBox">
                <img src="./image/tempPicture.jpg" />
            </div>
            `
            // <span class="loader"></span>
            // console.log(popular__movies__card)
            popular__movies.append(popular__movies__card)
            
            // Lazy load Image
            const lazyImage = new Image
            lazyImage.src = imgStartPath + singleMovieData.poster_path
            lazyImage.onload = () => {
                // popular__movies__card.querySelector(".dumbContainer").remove()
                // popular__movies__card.querySelector(".popular__movies__card__imgBox").append(lazyImage)
                popular__movies__card.querySelector(".popular__movies__card__imgBox>img").src = lazyImage.src
            }
    
    
            // Create Info Box
            const popular__movies__card__info = document.createElement("div")
            popular__movies__card__info.classList.add("popular__movies__card__info")
            popular__movies__card__info.innerHTML = `
                <div class="popular__movies__card__info__title">
                    <h3>${singleMovieData.title}</h3>
                </div>
                <div class="popular__movies__card__info__raiting">
                    <div> 
                        <i class="fa-solid fa-star"></i> 
                    </div>
                    <div>
                        <p>${singleMovieData.vote_average.toFixed(1)}/10 IMDb</p>
                    </div>
                </div>
            `
            popular__movies__card.append(popular__movies__card__info)
    
                // Create Genre Box
                const popular__movies__card__info__genreBox = document.createElement("div")
                popular__movies__card__info__genreBox.classList.add("popular__movies__card__info__genres")
                popular__movies__card__info.append(popular__movies__card__info__genreBox)
    
                // Create Genres
                singleMovieData.genres.forEach((genre, index) => {
                    if (index < 2) {
                        const genreContainer = document.createElement("div")
                        genreContainer.innerHTML = `
                            <p>${genre.name}</p>
                        `
                        popular__movies__card__info__genreBox.append(genreContainer)
                    } else {
                        return
                    }
                })
    
            // Duration
            // Variables
            const hours = Math.floor(singleMovieData.runtime / 60)
            const minutes = singleMovieData.runtime % 60
            
            // Create Duration
            const popular__movies__card__info__duration = document.createElement("div")
            popular__movies__card__info__duration.classList.add("popular__movies__card__info__duration")
            popular__movies__card__info__duration.innerHTML = `
                <p>${hours + "h " + minutes + "m"}</p>
            `
            popular__movies__card__info.append(popular__movies__card__info__duration)
    
        })
    }



    createPopularList()











})