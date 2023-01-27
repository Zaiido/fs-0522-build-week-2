const url = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const par = new URLSearchParams(location.search);
const id = par.get("id");

const moreAlbumsId = [];

const artists = [
  "eminem",
  "rihanna",
  "simple plan",
  "drake",
  "metallica",
  "sick puppies",
  "Miley Cyrus",
  "Dua Lipa",
  "Shakira",
  "Pink Floyd",
  "Soja",
  "Manuel Turizo",
  "poor mans poison",
  "lady gaga",
  "demi lovato",
  "fall out boys",
  "tones and i",
  "Malinda",
];
let track_index = 0;
window.onload = async () => {
  await getAlbum();
  toggleAlbums();
  artists.forEach((artist) => {
    getAlbumId(artist);
  });
  defaultLoad(track_index);
};

const getAlbumId = async (artist) => {
  try {
    let response = await fetch(searchUrl + artist);
    let album = await response.json();
    let albumId = await album.data[0].album.id;
    await getMoreAlbums(albumId);
  } catch (error) {
    console.log(error);
  }
};

const getAlbum = async () => {
  try {
    let response = await fetch(url + id);
    let album = await response.json();
    displayAlbum(album);
  } catch (error) {
    console.log(error);
  }
};

const displayAlbum = async (album) => {
  try {
    // display top part
    const topAlbumInfoNode = document.querySelector("#top-album-info");
    topAlbumInfoNode.innerHTML = `
            <div class="album-cover-image">
                <img
                    src="${album.cover_medium}"
                    alt="${album.title}"
                />
            </div>
            <div class="album-infos">
                <h5>ALBUM</h5>
                <h1>${album.title}</h1>
                <div>
                    <img
                        src="${album.artist.picture}"
                        alt="Image of ${album.artist.name}"
                        class="artist-img"
                    />
                    <span>
                        <a href="./artist.html?name=${album.artist.name}">${
      album.artist.name
    }</a>
                    </span>
                    <span>· ${album.release_date} </span>
                    <span>· ${album.tracks.data.length} songs, </span>
                    <span>${Math.ceil(album.duration / 60 / 60)} h ${Math.ceil(
      album.duration % 60
    )} min</span>
                </div>
            </div>`;
    // display songs
    const songTableNode = document.querySelector("#songTable");
    let songArray = album.tracks.data;
    // console.log(songArray[2]);
    for (let i = 0; i < songArray.length; i++) {
      let song = songArray[i];
      const iterator = songArray[i];
      const {
        album: { cover_medium },
        artist: { name },
        title,
        preview,
      } = await iterator;
      songTableNode.innerHTML += `
      <tr class="table-row" onclick='loadTrack("${preview}"); updatePlayerCover("${cover_medium}"); updatePlayerName("${title}"); updatePlayerArtist("${name}"); makeGreen()'>
            <td>
                <span class="song-number">${i + 1}</span>
                <i class="bi bi-play-fill play-song-icon"></i>
            </td>
            <td class="song-btn">${title}<br/><span><a href="./artist.html?name=${
        song.artist.name
      }">${song.artist.name}</a></span></td>
            <td><i class="bi bi-heart"></i></td>
            <td>${Math.ceil(song.duration / 60)} min ${
        song.duration % 60
      } sec</td>
        </tr>`;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMoreAlbums = async (albumId) => {
  try {
    let response = await fetch(url + albumId);
    let album = await response.json();
    // console.log(album)
    displayMoreAlbums(album);
  } catch (error) {
    console.log(error);
  }
};

const displayMoreAlbums = (album) => {
  try {
    const moreAlbumsNode = document.querySelector("#moreAlbums");
    const moreAlbumsToggleNode = document.querySelector("#moreAlbumsToggle");
    let row;
    if (moreAlbumsNode.children.length < 6) {
      row = moreAlbumsNode;
    } else {
      row = moreAlbumsToggleNode;
    }
    row.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-2 px-0">
        <div class="card mb-2 p-4">
            <a href="./album-page.html?id=${album.id}">
                <img
                    src="${album.cover_medium}"
                    alt="Album Cover"
                    class="card-img-top"
                />
            </a>
            <div class="card-body px-0 mb-3">
                <a href="./artist.html?name=${album.artist.name}"
                    <p class="card-text album-title">${album.artist.name}</p>
                </a>
                <a href="./album-page.html?id=${album.id}">
                    <p class="card-text truncate">${album.title}<br/><span>${album.release_date}</span></p>
                </a>
            </div>
        </div>
    </div>`;
  } catch (error) {
    console.log(error);
  }
};

const toggleAlbums = () => {
  let aNode = document.querySelector("#seeDiscography");
  aNode.addEventListener("click", () => {
    let rowNode = document.querySelector("#moreAlbumsToggle");
    rowNode.classList.toggle("d-none");
  });
};

window.onscroll = () => {
  scrollNavbar();
};

scrollNavbar = () => {
  const headerNode = document.getElementsByTagName("header")[0];

  if (document.documentElement.scrollTop > 200) {
    headerNode.classList.add("bg-color");
  } else {
    headerNode.classList.remove("bg-color");
  }
};

/* player */

const updatePlayerCover = (cover) => {
  const container = document.getElementById("player-album");
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

let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    preview:
      "https://cdns-preview-4.dzcdn.net/stream/c-48b953f0ef2f149f93b067e11aed5c88-3.mp3",
  },
  {
    preview:
      "https://cdns-preview-9.dzcdn.net/stream/c-9b9f17556a728310cf7865ee6a89143f-11.mp3",
  },
];

const defaultLoad = (track_index) => {
  fetch(url + id)
    .then((dataRaw) => dataRaw.json())
    .then((data) => {
      const datamined = data.tracks.data;
      console.log(datamined);
      // Clear the previous seek timer
      clearInterval(updateTimer);
      resetValues();

      // Load a new track
      curr_track.src = datamined[track_index].preview;

      curr_track.load();
      updatePlayerCover(datamined[track_index].album.cover_medium);
      updatePlayerName(datamined[track_index].title);
      updatePlayerArtist(datamined[track_index].artist.name);

      // Set an interval of 1000 milliseconds
      // for updating the seek slider
      updateTimer = setInterval(seekUpdate, 1000);

      // Move to the next track if the current finishes playing
      // using the 'ended' event
      curr_track.addEventListener("ended", nextTrack);
    });
};

defaultLoad(track_index);
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
  let play = document.getElementById("ButtonInner-play");
  let stop = document.getElementById("ButtonInner-stop");

  play.classList.add("d-none");
  stop.classList.remove("d-none");
}

function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
  const PlayIconContainer = document.getElementById("play");
  const stopContainer = document.getElementById("stop");
  PlayIconContainer.classList.remove("d-none");
  stopContainer.classList.add("d-none");
  let play = document.getElementById("ButtonInner-play");
  let stop = document.getElementById("ButtonInner-stop");

  stop.classList.add("d-none");
  play.classList.remove("d-none");

  // Replace icon with the play icon
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list

  track_index++;
  // Load and play the new track

  defaultLoad(track_index);

  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list

  // Load and play the new track
  track_index--;
  defaultLoad(track_index);
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);

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
    let currentMinutes = Math.ceil(curr_track.currentTime / 60);
    let currentSeconds = Math.ceil(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.ceil(curr_track.duration / 60);
    let durationSeconds = Math.ceil(curr_track.duration - durationMinutes * 60);

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

// Load the first track in the tracklist
loadTrack(track_index);

function changeState() {
  let play = document.getElementById("ButtonInner-play");
  let stop = document.getElementById("ButtonInner-stop");
  const PlayIconContainer = document.getElementById("play");
  const stopContainer = document.getElementById("stop");
  if (stop.classList.contains("d-none")) {
    play.classList.add("d-none");
    stop.classList.remove("d-none");
    PlayIconContainer.classList.add("d-none");
    stopContainer.classList.remove("d-none");
    playTrack();
  } else {
    stop.classList.add("d-none");
    play.classList.remove("d-none");
    PlayIconContainer.classList.remove("d-none");
    stopContainer.classList.add("d-none");
    pauseTrack();
  }
}

const makeGreen = () => {
  let header = document.getElementById("songTable");
  let btns = header.getElementsByClassName("song-btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active-text");
      let current2 = header.getElementsByClassName("active-icon");
      if ((current2.length > 0) & (current.length > 0)) {
        current2[0].className = current2[0].className.replace(
          " active-icon",
          ""
        );
        current[0].className = current[0].className.replace(" active-text", "");
      }
      this.parentElement.className += " active-icon";
      this.className += " active-text";
    });
  }
};
