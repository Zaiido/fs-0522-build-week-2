let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// window.onload = async () => {
//   try {
//     await getSongs();
//   } catch (error) {
//     console.log(`onload() error is${error}`);
//   }
// };

const getSongs = async () => {
  try {
    let searchInput = document.querySelector("#search-input").value;
    console.log(searchInput);
    let response = await fetch(url + searchInput);
    let songs = await response.json();
    console.log(songs.data);
    displaySongs(songs.data);
  } catch (error) {
    console.log(`getSongs() error is${error}`);
  }
};

const displaySongs = (arr) => {
  const searchSongResultsNode = document.querySelector("#search-song-results");
  searchSongResultsNode.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let song = arr[i];
    console.log(song);
    searchSongResultsNode.innerHTML += `
    <div class="col">
        <div class="card">
            <a href="#"
            ><img class="card-img-top" src="${song.album.cover}" alt="song cover"
            /></a>
            <div class="card-body">
            <a href="./album-page.html?id=${song.album.id}"><h5 class="card-title truncate">${song.album.title}</h5></a>
            <a href="./artist.html?name=${song.artist.name}"><p class="card-text truncate">${song.artist.name}</p></a>
            </div>
        </div>
    </div>`;
  }
};
