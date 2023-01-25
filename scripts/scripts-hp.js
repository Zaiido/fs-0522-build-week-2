let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let allSongsArray = []
let artistsArray = ["eminem", "queen", "metallica", "beyonce", "marc antony", "witney houston", "michael jackson"]



window.onload = async () => {
    try {

        toggleProfileDropdown()


        for (let artist of artistsArray) {
            let songs = await getSongs(artist)
            for (let song of songs) {
                // console.log(song)
                allSongsArray.push(song)

            }
        }

        //  REMOVE DUPLICATES 
        for (let i = 0; i < allSongsArray.length - 1; i++) {
            for (let j = i + 1; j < allSongsArray.length; j++) {
                if (allSongsArray[i].album.title === allSongsArray[j].album.title) {
                    allSongsArray.splice(j, 1)
                    j--
                }
            }
        }

        // SHUFFLE THE ARRAY

        for (let i = allSongsArray.length - 1; i > 0; i--) {
            var y = Math.floor(Math.random() * i);
            var temp = allSongsArray[i];
            allSongsArray[i] = allSongsArray[y];
            allSongsArray[y] = temp;
        }

        for (let i = 0; i < 18; i++) {
            renderSongs(allSongsArray[i])
        }

    } catch (error) {
        console.log(error)
    }

}


const renderSongs = (song) => {
    // console.log(song.album.id)
    let rowNodes = document.querySelectorAll(".row:not(:first-of-type)");
    let row;

    if (rowNodes[0].children.length < 6) {
        row = rowNodes[0]
    }
    else if (rowNodes[1].children.length < 6) {
        row = rowNodes[1]
    }
    else {
        row = rowNodes[2]
    }
    // console.log(song.album.id)
    row.innerHTML += ` <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <a href="album-page.html?id=${song.album.id}">
                <div class="card">
                    <img src="${song.album.cover_medium}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <button class="btn play-button ml-auto mr-3">
                            <svg role="img" height="24" width="24" aria-hidden="true"
                                viewBox="0 0 24 24" data-encore-id="icon"
                                class="Svg-sc-ytk21e-0 uPxdw">
                                <path
                                    d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z">
                                </path>
                            </svg>
                        </button>
                        <h5 class="card-title truncate">${song.album.title}</h5>
                        <a href="artist.html?id=${song.artist.id}"> 
                            <p class="card-text truncate">${song.artist.name}</p>
                        </a>
                    </div>
                </div>
            </a>
        </div>`
}



const getSongs = async (query) => {
    try {
        let response = await fetch(url + query);
        let songs = await response.json();
        return songs.data
    } catch (error) {
        console.log(error)
    }
}


const toggleProfileDropdown = () => {
    let profileNode = document.querySelector(".profile")
    profileNode.addEventListener("click", () => {
        let svgNode = document.querySelector(".down-arrow")
        let dropdownMenu = document.querySelector(".dropdown-menu")
        if (svgNode.hasAttribute("transform")) {
            svgNode.removeAttribute("transform")
            dropdownMenu.classList.replace("d-block", "d-none")
        }
        else {
            svgNode.setAttribute("transform", "rotate(180)")
            dropdownMenu.classList.replace("d-none", "d-block")
        }
    })
    bodyToggleProfileDropdown()
}

const bodyToggleProfileDropdown = () => {
    let sectionNode = document.querySelector(".main-container").querySelector("section:nth-of-type(1)");

    sectionNode.addEventListener("click", () => {

        let svgNode = document.querySelector(".down-arrow")
        let dropdownMenu = document.querySelector(".dropdown-menu")
        if (svgNode.hasAttribute("transform")) {
            svgNode.removeAttribute("transform")
            dropdownMenu.classList.replace("d-block", "d-none")
        }
    })
}
