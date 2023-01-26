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
            <button class="btn play-button ml-auto mr-3">
              <svg role="img" height="24" width="24" aria-hidden="true"
              viewBox="0 0 24 24" data-encore-id="icon"
              class="Svg-sc-ytk21e-0 uPxdw">
              <path
                d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z">
              </path>
              </svg>
            </button>
            <a href="./album-page.html?id=${song.album.id}"><h5 class="card-title truncate">${song.album.title}</h5></a>
            <a href="./artist.html?name=${song.artist.name}"><p class="card-text truncate">${song.artist.name}</p></a>
            </div>
        </div>
    </div>`;
  }
};
