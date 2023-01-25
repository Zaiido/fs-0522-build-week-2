let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

window.onload = async () => {
  try {
    getSongs();
  } catch (error) {
    console.log(`onload() error is${error}`);
  }
};

const getSongs = async () => {
  try {
    let response = await fetch(url + "yes");
    let songs = await response.json();
    console.log(songs.data);
    displaySongs(songs.data);
  } catch (error) {
    console.log(`getSongs() error is${error}`);
  }
};

const displaySongs = (arr) => {
  const searchSongResultsNode = document.querySelector("#search-song-results");
  for (let i = 0; i < 5; i++) {
    let song = arr[i];
    console.log(song);
    searchSongResultsNode.innerHTML += `
    <div class="col">
        <div class="card">
            <a href="#"
            ><img class="card-img-top" src="${song.album.cover}" alt="song cover"
            /></a>
            <div class="card-body">
            <a href="#"><h5 class="card-title">${song.album.title}</h5></a>
            <a href="#"><p class="card-text">${song.artist.name}</p></a>
            </div>
        </div>
    </div>`;
  }
};
