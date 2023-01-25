// const link = " https://striveschool-api.herokuapp.com/api/deezer/artist/412";
const linksongs =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";

// const getDataArtist = () => {
//   fetch(link)
//     .then((dataRaw) => dataRaw.json())
//     .then((data) => {
//       console.log(data);
//       renderArtist(data);
//     });
// };

const getDataSongs = () => {
  fetch(linksongs)
    .then((dataRaw) => dataRaw.json())
    .then((data) => {
      console.log(data);
      renderArtist(data.data[0]);
      renderSongs(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderArtist = async (artist) => {
  const containerBg = document.getElementById("image-wrapper");
  containerBg.innerHTML = "";
  containerBg.innerHTML += `  
            <img src="${artist.artist.picture_big}" alt="">
  `;
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
  console.log(songs);
  let containerList = document.getElementById("tbody");
  containerList.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const iterator = songs[i];
    const {
      album: { cover },
      artist: { name },
      title,
      duration,
      preview,
    } = await iterator;
    // updatePlayerDuration("${duration}")
    containerList.innerHTML += await ` 
    <tr onclick='player("${preview}"); updatePlayerCover("${cover}"); updatePlayerName("${title}"); updatePlayerArtist("${name}")')>
    <th scope="row" class="grey">${i + 1}</th>
    <td>
    <img class="p-1" src="${cover}" height="48" width="48" alt="">
    </td>
    <td><span class="grey" )>
      ${title}
    </span></td>
    <td><span class="grey"><a href="/album-page.html?id=${
      iterator.album.id
    }"> @ ${iterator.album.title}</a></span></td>
    <td><span class="grey">${parseInt(duration / 60)}m${
      duration % 60
    }s</span></td>
  </tr>`;
  }
  document.getElementById("see-more").addEventListener("click", function () {
    renderMoreSongs(songs);
    document.getElementById("see-more").remove();
  });
};

const renderMoreSongs = (songs) => {
  console.log(songs);
  let containerList = document.getElementById("tbody");
  for (let i = 5; i < songs.length; i++) {
    const iterator = songs[i];
    containerList.innerHTML += `
    <tr onclick='player("${iterator.preview}")')>
    <th scope="row" class="grey">${i + 1}</th>
    <td>
    <img class="p-1" src="${
      iterator.album.cover
    }" height="48" width="48" alt="">
    </td>
    <td><span class="grey">
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
};

const imgChange = function () {
  const img = document.querySelector(".image-wrapper img");
  const imgContainer = document.querySelector(".image-wrapper");
  if (window.pageYOffset > 300) {
    img.classList.add("opacity");
    imgContainer.style.backgroundColor = "#525252";
  } else if (window.pageYOffset < 300) {
    img.classList.remove("opacity");
  }
};
let playState = "play";
const ifPlay = () => {
  const audio = document.querySelector("audio");
  const PlayIconContainer = document.getElementById("play");
  const stopContainer = document.getElementById("stop");
  if (playState === "play") {
    audio.play();
    playState = "pause";
    PlayIconContainer.classList.add("d-none");
    stopContainer.classList.remove("d-none");
  } else {
    audio.pause();
    playState = "play";
    PlayIconContainer.classList.remove("d-none");
    stopContainer.classList.add("d-none");
  }
};
// let seconds = 0;
const playDefaultEvent = () => {
  const PlayIconContainer = document.getElementById("play");
  const stopContainer = document.getElementById("stop");
  PlayIconContainer.addEventListener("click", ifPlay);
  stopContainer.addEventListener("click", ifPlay);
};

// const updateTime = (audio) => {
//   const sliderTime = document.getElementById("slider-time");
//   sliderTime.innerText = audio.currentTime;
// };
// const upTimer = () => {
//   ++seconds;

//   let minute = Math.floor(seconds / 60);

//   let updSecond = seconds - minute * 60;

//   document.getElementById("slider-time").innerText = minute + ":" + updSecond;
// };

const player = (song) => {
  const audioContainer = document.getElementById("audio-container");
  audioContainer.innerHTML = "";
  audioContainer.innerHTML += `<audio controls src="${song}" preload=”metadata” loop></audio>`;
  const audio = document.querySelector("audio");
  audio.play();
  const PlayIconContainer = document.getElementById("play");
  const stopContainer = document.getElementById("stop");

  PlayIconContainer.addEventListener("click", ifPlay());
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
// const updatePlayerDuration = (duration) => {
//   const container = document.getElementById("player-time");
//   const minutes = parseInt(duration / 60);
//   const seconds = parseFloat(duration % 60);
//   container.innerText = `${minutes}:${seconds}`;
// };

window.addEventListener("scroll", imgChange);
window.onload = () => {
  // getDataArtist();
  getDataSongs();
  playDefaultEvent();
};
