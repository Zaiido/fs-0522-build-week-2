const url = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const par = new URLSearchParams(location.search);
const id = par.get("id");

const moreAlbumsId = [];
const artists = [
  "eminem",
  "rihanna",
  "simple plan",
  "beyonce",
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

window.onload = async () => {
  await getAlbum();
  artists.forEach((artist) => {
    getAlbumId(artist);
  });
};

const getAlbumId = async (artist) => {
  try {
    let response = await fetch(searchUrl + artist);
    let album = await response.json();
    let albumId = await album.data[0].album.id;
    console.log(albumId);
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
                    src="${album.cover}"
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
                        <a href="./artist.html?id=${album.artist.id}">${
      album.artist.name
    }</a>
                    </span>
                    <span>· ${album.release_date} </span>
                    <span>· ${album.tracks.data.length} songs, </span>
                    <span>${Math.floor(
                      album.duration / 60 / 60
                    )} h ${Math.floor(album.duration % 60)} min</span>
                </div>
            </div>`;
    // display songs
    const songTableNode = document.querySelector("#songTable");
    let songArray = album.tracks.data;
    console.log(songArray[2]);
    for (let i = 0; i < songArray.length; i++) {
      let song = songArray[i];
      songTableNode.innerHTML += `
        <tr>
            <td>
                <span class="song-number">${i + 1}</span>
                <i class="bi bi-play-fill play-song-icon"></i>
            </td>
            <td>${song.title}<br/><span><a href="./artist.html?id=${
        song.artist.id
      }">${song.artist.name}</a></span></td>
            <td><i class="bi bi-heart"></i></td>
            <td>${Math.floor(song.duration / 60)} min ${
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
    displayMoreAlbums(album);
  } catch (error) {
    console.log(error);
  }
};

const displayMoreAlbums = (album) => {
  try {
    const moreAlbumsNode = document.querySelector("#moreAlbums");
    moreAlbumsNode.innerHTML += `
        <div class="card col">
            <a href="./album-page.html?id=${album.id}">
                <img
                    src="${album.cover}"
                    alt="Album Cover"
                    class="card-img-top"
                />
            </a>
            <div class="card-body">
                <a href="./artist.html?id=${album.artist.id}"
                    <p class="card-text album-title">${album.artist.name}</p>
                </a>
                <a href="./album-page.html?id=${album.id}">
                    <p class="card-text">${album.title}<br/><span>${album.release_date}</span></p>
                </a>
            </div>
        </div>`;
  } catch (error) {
    console.log(error);
  }
};
