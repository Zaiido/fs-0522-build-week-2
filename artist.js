// const link = " https://striveschool-api.herokuapp.com/api/deezer/artist/412";
const linksongs = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const params = new URLSearchParams(location.search);
const id = params.get("name");
// const getDataArtist = () => {
//   fetch(link)
//     .then((dataRaw) => dataRaw.json())
//     .then((data) => {
//       console.log(data);
//       renderArtist(data);
//     });
// };

const getDataSongs = () => {
  fetch(linksongs + id)
    .then((dataRaw) => dataRaw.json())
    .then((data) => {
      // console.log(data);
      renderArtist(data.data[0]);
      renderSongs(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderArtist = async (artist) => {
  const containerBg = document.getElementById("image-wrapper");
  // containerBg.innerHTML = "";
  containerBg.style.backgroundImage = `url(${artist.artist.picture_big})`;
  const artistName = document.getElementById("artist-name");
  artistName.innerText = `${artist.artist.name}`;
  const artistNameSmall = document.getElementById("artist-by-name");
  artistNameSmall.innerText = `${artist.artist.name} Best of`;
  const artistPickImg = document.getElementById("album-photo");
  artistPickImg.innerHTML = "";
  artistPickImg.innerHTML += `
  <img src="${artist.artist.picture}" alt="">`;
};

const renderSongs = async (songs) => {
  // console.log(songs);
  let containerList = document.getElementById("tbody");
  containerList.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const iterator = songs[i];
    const {
      album: { cover_medium },
      artist: { name },
      title,
      duration,
      preview,
    } = await iterator;
    // updatePlayerDuration("${duration}")
    containerList.innerHTML += ` 
    <tr onclick='loadTrack("${preview}"); updatePlayerCover("${cover_medium}"); updatePlayerName("${title}"); updatePlayerArtist("${name}"); makeGreen(); makeChange(event)')>
    <th scope="row" class="grey row-btn">${i + 1}</th>
    <td>
    <img class="p-1" src="${
      iterator.album.cover_medium
    }" height="48" width="48" alt="">
    </td>
    <td><span class="grey song-btn" id="title">
      ${iterator.title}
    </span></td>
    <td><span class="grey"><a href="/album-page.html?id=${
      iterator.album.id
    }"> @ ${iterator.album.title}</a></span></td>
    <td><span class="grey">${parseInt(iterator.duration / 60)}m${
      iterator.duration % 60
    }s</span></td>
  </tr>`;
  }
  document.getElementById("see-more").addEventListener("click", function () {
    renderMoreSongs(songs);
    document.getElementById("see-more").remove();
  });
};

const renderMoreSongs = async (songs) => {
  // console.log(songs);
  let containerList = document.getElementById("tbody");
  for (let i = 5; i < songs.length; i++) {
    const iterator = songs[i];
    const {
      album: { cover_medium },
      artist: { name },
      title,
      duration,
      preview,
    } = await iterator;

    containerList.innerHTML += `
    <tr onclick='loadTrack("${preview}"); updatePlayerCover("${cover_medium}"); updatePlayerName("${title}"); updatePlayerArtist("${name}"); makeGreen(event);')>
    <th scope="row" class="grey row-btn">${i + 1}</th>
    <td>
    <img class="p-1" src="${
      iterator.album.cover_medium
    }" height="48" width="48" alt="">
    </td>
    <td><span class="grey song-btn" id="title">
      ${iterator.title}
    </span></td>
    <td><span class="grey"><a href="/album-page.html?id=${
      iterator.album.id
    }"> @ ${iterator.album.title}</a></span></td>
    <td><span class="grey">${parseInt(iterator.duration / 60)}m${
      iterator.duration % 60
    }s</span></td>
  </tr>
`;
  }
};

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

const makeGreen = () => {
  let header = document.getElementById("tbody");
  let btns = header.getElementsByClassName("song-btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active-text");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active-text", "");
      }
      this.className += " active-text";
    });
  }
};

window.onload = () => {
  getDataSongs();
  playDefaultEvent();
};

const scrollNavbar = () => {
  const headerNode = document.querySelector(".navbar");
  if (window.scrollY >= 90) {
    headerNode.classList.add("bg-color");
  } else {
    headerNode.classList.remove("bg-color");
  }
};

window.onscroll = () => {
  scrollNavbar();
};

/* music player */

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

// Load the first track in the tracklist
loadTrack(track_index);
