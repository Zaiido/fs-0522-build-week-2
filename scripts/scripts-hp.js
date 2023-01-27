let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let allSongsArray = []
let artistsArray = ["eminem", "queen", "metallica", "drake", "marc antony", "witney houston", "michael jackson"]




window.onload = async () => {
    try {
        mainFunction()

        playButtonFunctionality()

    } catch (error) {
        console.log(error)
    }

}

const mainFunction = async () => {
    allSongsArray = await getSongsPerArtist()
    // console.log(allSongsArray)

    removeDuplicates(allSongsArray)

    shuffleSongs(allSongsArray)

    addCards(allSongsArray)
}

const getSongsPerArtist = async () => {
    for (let artist of artistsArray) {
        let songs = await getSongs(artist)
        for (let song of songs) {
            // console.log(song)
            allSongsArray.push(song)

        }
    }
    return allSongsArray
}

const removeDuplicates = (allSongsArray) => {
    for (let i = 0; i < allSongsArray.length - 1; i++) {
        for (let j = i + 1; j < allSongsArray.length; j++) {
            if (allSongsArray[i].album.title === allSongsArray[j].album.title) {
                allSongsArray.splice(j, 1)
                j--
            }
        }
    }
}

const addCards = (allSongsArray) => {
    for (let i = 0; i < 18; i++) {
        renderSongs(allSongsArray[i])
    }
}

const shuffleSongs = (allSongsArray) => {
    for (let i = allSongsArray.length - 1; i > 0; i--) {
        var y = Math.floor(Math.random() * i);
        var temp = allSongsArray[i];
        allSongsArray[i] = allSongsArray[y];
        allSongsArray[y] = temp;
    }
}


const renderSongs = (song) => {
    // console.log(song.preview)
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
    row.innerHTML += ` 
    <div class="col-12 col-sm-6 col-md-4 col-lg-2">
    <div class="card">
    <img src="${song.album.cover_medium}"
    class="card-img-top" alt="...">
                    <div class="card-body">
                        <button onclick='loadTrack("${song.preview}"); playpauseTrack(); updatePlayerCover("${song.album.cover_medium}"); updatePlayerName("${song.title}"); updatePlayerArtist("${song.artist.name}")') class="btn play-button ml-auto mr-3">
                            <svg role="img" height="24" width="24" aria-hidden="true"
                            viewBox="0 0 24 24" data-encore-id="icon"
                            class="Svg-sc-ytk21e-0 uPxdw">
                                <path
                            d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z">
                                </path>
                            </svg>
                        </button>
                        <a href="album-page.html?id=${song.album.id}">
                            <h5 class="card-title truncate">${song.album.title}</h5>
                            <a href="artist.html?name=${song.artist.name}"> 
                                <p class="card-text truncate">${song.artist.name}</p>
                            </a>
                        </a>
                    </div>
                </div>
            </div>`
}


const getSongs = async (query) => {
    try {
        let response = await fetch(url + query);
        if (response.ok) {
            let songs = await response.json();
            return songs.data

        } else {
            mainFunction()
        }
    } catch (error) {
        console.log(error)
    }
}

let click = 0;
const playButtonFunctionality = () => {
    setTimeout(() => {
        let buttonNodes = document.querySelectorAll(".row:not(:first-of-type) .play-button")
        buttonNodes.forEach(button => {
            button.addEventListener("click", async (event) => {
                click++
                if (click % 2 !== 0) {
                    button.innerHTML = `<svg role="img" height="24" width="24" aria-hidden="true" 
                    viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 
                    uPxdw"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 
                    00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 
                    0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
                } else {
                    button.innerHTML = `<svg role="img" height="24" width="24" aria-hidden="true"
                    viewBox="0 0 24 24" data-encore-id="icon"
                    class="Svg-sc-ytk21e-0 uPxdw">
                    <path
                    d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z">
                    </path>
                    </svg>`
                }
            })
        });
    }, 2000)

}

const scrollNavbar = () => {
    const headerNode = document.querySelector("header");
    if (window.scrollY >= 100) {
        headerNode.classList.add("bg-color");
    } else {
        headerNode.classList.remove("bg-color");
    }
};

window.onscroll = () => {
    scrollNavbar();
};



// Select all the elements in the HTML page
// and assign them to a variable

let playpause_btn = document.querySelector(".play");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let muteButton = document.getElementById("mute");
let unMuteButton = document.getElementById("unmute");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

function loadTrack(song) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = song;
    curr_track.load();
    const PlayIconContainer = document.getElementById("play");
    const stopContainer = document.getElementById("stop");
    PlayIconContainer.classList.remove("d-none");
    stopContainer.classList.add("d-none");

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;

    // Replace icon with the pause icon
    const PlayIconContainer = document.getElementById("play");
    const stopContainer = document.getElementById("stop");
    PlayIconContainer.classList.add("d-none");
    stopContainer.classList.remove("d-none");
}

function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    const PlayIconContainer = document.getElementById("play");
    const stopContainer = document.getElementById("stop");
    PlayIconContainer.classList.remove("d-none");
    stopContainer.classList.add("d-none");

    // Replace icon with the play icon
}

function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0) track_index -= 1;
    else track_index = track_list.length - 1;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    let seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}
function mute() {
    curr_track.volume = 0;
    muteButton.classList.add("d-none");
    unMuteButton.classList.remove("d-none");
}
function unMute() {
    setVolume();
    unMuteButton.classList.add("d-none");
    muteButton.classList.remove("d-none");
}
function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(
            curr_track.currentTime - currentMinutes * 60
        );
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(
            curr_track.duration - durationMinutes * 60
        );

        // Add a zero to the single digit time values
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
const updatePlayerCover = (cover) => {
    const container = document.querySelector(".album-photo");
    container.innerHTML = "";
    container.innerHTML += `
    <img src="${cover}" height="48" width="48" alt="">`;
};

const updatePlayerName = (title) => {
    const container = document.getElementById("player-title");
    container.innerText = title;
};
const updatePlayerArtist = (artist) => {
    const container = document.getElementById("player-artist");
    container.innerText = artist;
};
// Load the first track in the tracklist
loadTrack(track_index);





// BACKGROUND COLOR
let backgroundNode = document.querySelector(".background-effect");
const back = () => {
    backgroundNode.style.background = `linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(55, 9, 9, 1) 56%)`;
}

const changeBackgroundColor = () => {
    let r = localStorage.getItem("r");
    let g = localStorage.getItem("g");
    let b = localStorage.getItem("b");
    // console.log(r, g, b)
    backgroundNode.style.background = `linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(${r}, ${g}, ${b}, 1) 56%)`;
}

const main = (eventData) => {
    let image;
    let canvas;
    if (eventData.target.tagName === "IMG") {
        image = eventData.target;
    } else if (eventData.target.tagName === "SPAN") {
        // console.log(eventData.target.parentElement.querySelector("img"))
        image = eventData.target.parentElement.querySelector("img")
    } else {
        image = eventData.target.querySelector("img");
    }

    image.crossOrigin = "Anonymous";

    if (eventData.target.tagName === "IMG") {
        canvas = eventData.target.nextElementSibling;
    } else {
        canvas = eventData.target.querySelector("canvas");
    }

    canvas.width = image.width;
    canvas.height = image.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let rgbArray = buildRgb(imageData.data);
    let { r, g, b } = rgbArray[0]
    // console.log(r, g, b)
    localStorage.setItem("r", r)
    localStorage.setItem("g", g)
    localStorage.setItem("b", b)
    changeBackgroundColor()

}

const buildRgb = (imageData) => {
    let rgbValues = [];
    for (let i = 0; i < imageData.length; i += 4) {
        let rgb = {
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
        };
        rgbValues.push(rgb);
    }
    return rgbValues;
};






