
async function albumTable() {
    const charting = await fetch("/api/charting");
    const chartingData = await charting.json();

    const artists = await fetch("/api/artist");
    const artistData = await artists.json();

    const genres = await fetch("/api/genres");
    const genreData = await genres.json();

    const songs = await fetch("/api/songs");
    const songsData = await songs.json();

    const albums = await fetch("/api/albums");
    const albumData = await albums.json();

    const albumTable = document.querySelector(".tableBody");

    
    albumData.forEach((item) => {
        let albumArtist = artistData[item.artist_id-1].artist_name;
        

        console.log(item)
        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `<td>${item.album_id}</td><td>${item.album_name}</td><td>${albumArtist}</td><td>${item.album_type}</td><td>${item.album_release_date}</td>`
        albumTable.append(appendItem)
    });
}
window.onload = albumTable;