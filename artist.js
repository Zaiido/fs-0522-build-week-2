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
    <tr onclick='player("${preview}"); updatePlayerCover("${cover_medium}"); updatePlayerName("${title}"); updatePlayerArtist("${name}"); makeGreen(); makeChange(event)')>
    <th scope="row" class="grey row-btn">${i + 1}</th>
    <td>
    <img class="p-1" src="${iterator.album.cover_medium
      }" height="48" width="48" alt="">
    </td>
    <td><span class="grey song-btn" id="title">
      ${iterator.title}
    </span></td>
    <td><span class="grey"><a href="/album-page.html?id=${iterator.album.id
      }"> @ ${iterator.album.title}</a></span></td>
    <td><span class="grey">${parseInt(iterator.duration / 60)}m${iterator.duration % 60
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
    <tr onclick='player("${preview}"), updatePlayerCover("${cover_medium}"), updatePlayerName("${title}"), updatePlayerArtist("${name}"), makeGreen(event), makeChange(event)')>
    <th scope="row" class="grey row-btn">${i + 1}</th>
    <td>
    <img class="p-1" src="${iterator.album.cover_medium
      }" height="48" width="48" alt="">
    </td>
    <td><span class="grey song-btn" id="title">
      ${iterator.title}
    </span></td>
    <td><span class="grey"><a href="/album-page.html?id=${iterator.album.id
      }"> @ ${iterator.album.title}</a></span></td>
    <td><span class="grey">${parseInt(iterator.duration / 60)}m${iterator.duration % 60
      }s</span></td>
  </tr>
`;
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
  stopContainer.addEventListener("click", ifPlay());
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

const makeChange = (event) => {
  const rowTo = event.target.parentElement.parentElement.firstElementChild;
  // console.log(event.target.parentElement.parentElement.firstElementChild);
  // const secondrow = rowTo.nextSibling.nextSibling.nextSibling.nextSibling;

  rowTo.innerHTML = `<i class="bi bi-play-fill"></i>`;
};


window.onload = () => {
  // getDataArtist();
  getDataSongs();
  playDefaultEvent();
};

const scrollNavbar = () => {
  const headerNode = document.querySelector(".navbar");
  // console.log(headerNode)
  if (window.scrollY >= 90) {
    headerNode.classList.add("bg-color");
  } else {
    headerNode.classList.remove("bg-color");
  }
};

window.onscroll = () => {
  scrollNavbar();
};