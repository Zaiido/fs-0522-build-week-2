const url = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

const par = new URLSearchParams(location.search);
const id = par.get("id");

window.onload = async () => {
  getAlbum();
};

const getAlbum = async () => {
  try {
    let response = await fetch(url);
    let album = await response.json();
    console.log(album);
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
                    <span>${album.artist.name} </span>
                    <span>· ${album.release_date} </span>
                    <span>· ${album.tracks.data.length} songs, </span>
                    <span>${Math.floor(album.duration / 60)} min</span>
                </div>
            </div>`;
    // display songs
    const songTableNode = document.querySelector("#songTable");
    let songArray = album.tracks.data;
    for (let i = 0; i < songArray.length; i++) {
      let song = songArray[i];
      songTableNode.innerHTML += `
        <tr>
            <td>
                <span class="song-number">${i + 1}</span>
                <i class="bi bi-play-fill"></i>
            </td>
            <td>${song.title}<br/><span>${song.artist.name}</span></td>
            <td><i class="bi bi-heart"></i></td>
            <td>${song.duration} sec</td>
        </tr>`;
    }
  } catch (error) {
    console.log(error);
  }
};
