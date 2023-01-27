let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

let categoryArr = [
  "Potcast",
  "Made For You",
  "New releases",
  "Hip-Hop",
  "Pop",
  "Mood",
  "Rock",
  "Charts",
  "Live Events",
  "Dance/Electronic",
  "Chill",
  "Indie",
  "Fresh Finds",
  "Discover",
  "EQUAL",
  "RADAR",
  "Workout",
  "K-pop",
  "Sleep",
  "Party",
  "At Home",
  "Focus",
  "Decades",
  "Latin",
  "R&B",
  "Romance",
  "Kids & Family",
  "Metal",
  "Jazz",
  "Trending",
  "Anime",
  "In the car",
  "Classical",
  "Folk & Acoustic",
  "Country",
  "Disney",
  "Soul",
  "Gaming",
  "GLOW",
  "TV & Movies",
  "Netflix",
  "Instrumental",
  "Wellness",
  "Punk",
  "Ambient",
  "Blues",
  "Cooking & Dining",
  "Alternative",
  "Travel",
  "Reggae",
  "Caribbean",
  "Afro",
  "Songwriters",
  "Funk & Disco",
  "League of Legends",
  "Spotify Singles",
];
console.log(categoryArr.length);

const getSongs = async () => {
  try {
    let searchInput = document.querySelector("#search-input").value;
    if (searchInput == 0) {
      showDefault();
    } else {
      console.log(searchInput);
      let response = await fetch(url + searchInput);
      let songs = await response.json();
      // console.log(songs.data);
      displaySongs(songs.data);
    }
  } catch (error) {
    console.log(`getSongs() error is${error}`);
  }
};

const showDefault = () => {
  const searchSongResultsNode = document.querySelector("#search-song-results");
  searchSongResultsNode.innerHTML = "";
  for (let i = 0; i < 55; i++) {
    let color = random_bg_color();
    console.log(color);
    searchSongResultsNode.innerHTML += `
    <div class="col placeholder">
      <a href="#">
        <div class="card d-flex" style="background-color: ${color}">
          <h3 class="card-title">${categoryArr[i]}</h3>
          <div class="random-picture-container">
            <img
            src="https://source.unsplash.com/random/100x100?sig=${i + 1}"
            alt="random picture"
            />
          </div>
        </div>
      </a>
    </div>`;
  }
};

const random_bg_color = () => {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  // console.log(bgColor);
  return bgColor;
  // document.body.style.background = bgColor;
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
            <a href="./album-page.html?id=${song.album.id}"
            ><img class="card-img-top" src="${song.album.cover_medium}" alt="song cover"
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

const scrollNavbar = () => {
  const headerNode = document.querySelector("header");
  if (window.scrollY >= 70) {
    headerNode.classList.add("bg-color");
  } else {
    headerNode.classList.remove("bg-color");
  }
};

window.onscroll = () => {
  scrollNavbar();
};

window.onload = () => {
  showDefault();
};

window.history.forward();
