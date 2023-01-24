const link = " https://striveschool-api.herokuapp.com/api/deezer/artist/412";
const linksongs =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";

const getDataArtist = () => {
  fetch(link)
    .then((dataRaw) => dataRaw.json())
    .then((data) => {
      console.log(data);
      renderArtist(data);
    });
};

const getDataSongs = () => {
  fetch(linksongs)
    .then((dataRaw) => dataRaw.json())
    .then((data) => {
      console.log(data);
      renderSongs(data.data);
    });
};

const renderArtist = async (artist) => {
  const containerBg = document.getElementById("image-wrapper");
  containerBg.innerHTML = "";
  containerBg.innerHTML += `  
            <img src="${artist.picture_big}" alt="">
  `;
  const artistName = document.getElementById("artist-name");
  artistName.innerText = `${artist.name}`;
  const artistNameSmall = document.getElementById("artist-by-name");
  artistNameSmall.innerText = `${artist.name} Best of`;
  const artistPickImg = document.getElementById("album-photo");
  artistPickImg.innerHTML = "";
  artistPickImg.innerHTML += `
  <img src="${artist.picture}" alt="">`;
};

const renderSongs = async (songs) => {
  let containerList = document.getElementById("artist-list-songs");
  containerList.innerHTML = "";
  for (const iterator of songs) {
    containerList.innerHTML += `
    <li class="d-flex justify-content-between"><span> <img class="p-1" src="${
      iterator.album.cover
    }" height="48" width="48" alt="">
    ${iterator.album.title}</span><span class="grey">${parseInt(
      iterator.duration / 60
    )}m${iterator.duration % 60}s</span></li>`;
  }
};
//   await songs.forEach((singleSong) => {
//     containerList.innerHTML += `
//       <li class="d-flex justify-content-between"><span> <img class="p-1" src="${singleSong.album.cover}" height="48" width="48" alt="">
//       ${singleSong.album.title}</span><span class="grey">1.013,238.772</span><span class="grey">${singleSong.duration}</span></li>`;
//   });

window.onload = () => {
  getDataArtist();
  getDataSongs();
};

const imgChange = function () {
  const img = document.querySelector(".image-wrapper img");
  const imgContainer = document.querySelector(".image-wrapper");
  if (window.pageYOffset > 300) {
    console.log("it went there");
    console.log(img);
    img.classList.add("opacity");
    imgContainer.style.backgroundColor = "#525252";
  } else if (window.pageYOffset < 300) {
    img.classList.remove("opacity");
  }
};

window.addEventListener("scroll", imgChange);