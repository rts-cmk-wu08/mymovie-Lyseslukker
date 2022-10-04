    const urlData = new URLSearchParams(window.location.search)
    const movieID = urlData.get("id").replaceAll('"', "")
    console.log(movieID)
    
    // API Key
    const apiKey = "d11a1cfa6288bb52912afde72b965e48"
    
    // Image Path
    const imgStartPath = "https://image.tmdb.org/t/p/original"

    // Movie Data
    const movieTemp = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
    const movieData = await movieTemp.json()

    // Actor Data
    const actorsTemp = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}&language=en-US`)
    const actorsData = await actorsTemp.json()

    // Social Media ( Instagram )
    const socialMediaTemp = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/external_ids?api_key=${apiKey}`)
    const socialMediaData = await socialMediaTemp.json()
    let linkToInsta = "https://instagram.com/" + socialMediaData.facebook_id

    // Recommendations incomparison to the current showing movie
    const recommendedTemp = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${apiKey}&language=en-US&page=1`)
    const recommendedData = await recommendedTemp.json()

    // Similar To current showing movie
    const similarTemp = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${apiKey}&language=en-US&page=1`)
    const similarData = await similarTemp.json()


    const heroImage = document.querySelector(".heroImage>img")
    const lazyImage = new Image
    lazyImage.src = imgStartPath + movieData.poster_path
    lazyImage.onload = heroImage.src = lazyImage.src

    // console.log(similarData)
    // console.log(recommendedData)
    // console.log(linkToInsta)
    // console.log(socialMediaData)
    console.log(movieData)
    // console.log(actorsData)

    const infoSection = document.querySelector(".info")

    // Info titleContainer
    const titleContainer = document.createElement("div")
    titleContainer.classList.add("info__titleContainer")
    titleContainer.innerHTML = `
        <h1>${movieData.title}</h1>
    `
    infoSection.append(titleContainer)

    // Info raitingContainer
    const raitingContainer = document.createElement("div")
    raitingContainer.classList.add("info__raitingContainer")
    raitingContainer.innerHTML = `
        <div>
            <i class="fa-solid fa-star"></i>
        </div>
        <div>
            ${movieData.vote_average.toFixed(1)} /10 IMDb
        </div>
    `
    infoSection.append(raitingContainer)

    // Info genreContainer
    const genreContainer = document.createElement("div")
    genreContainer.classList.add("info__genreContainer")
    infoSection.append(genreContainer)

    // All genres
    movieData.genres.forEach((genre) => {
        const genreCard = document.createElement("div")
        genreCard.classList.add("info__genreContainer__genreCard")
        genreCard.innerHTML = `
            <p class="info__genreContainer__genreCard__genre">${genre.name}</p>
        `
        genreContainer.append(genreCard)
    })

    // Info extraInfoContainer
    const extraInfoContainer = document.createElement("div")
    extraInfoContainer.classList.add("info__extraInfoContainer")
    extraInfoContainer.innerHTML = `
    <div class="info__extraInfoContainer__extraCard">
        <div>Length</div>
        <div>${movieData.runtime}</div>
    </div>
    <div class="info__extraInfoContainer__extraCard">
        <div>Language</div>
        <div>${movieData.spoken_languages[0].english_name}</div>
    </div>
    <div class="info__extraInfoContainer__extraCard">
        <div>Release Date</div>
        <div>${movieData.release_date}</div>
    </div>
    `
    infoSection.append(extraInfoContainer)

    // info__extraInfoContainer__extraCard
    // const extraCard = document.createElement("div")
    // extraCard.classList.add("info__extraInfoContainer__extraCard")
    // extraCard.innerHTML = `

    // `















