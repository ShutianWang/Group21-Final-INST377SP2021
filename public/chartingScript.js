
async function chartingTable() {
    const charting = await fetch("/api/charting");
    const chartingData = await charting.json();

    const artists = await fetch("/api/artist");
    const artistData = await artists.json();

    const genres = await fetch("api/genres");
    const genreData = await genres.json();

    const songs = await fetch("api/charting");
    const songsData = await songs.json()

    const songTable = document.querySelector(".tableBody");
    console.log(songTable)
    console.log(chartingData);
    
    chartingData.data.forEach((item) => {
        let songArtist = artistData[item.artist_id].artist_name;
        let songGenre = genreData[item.genre_id].genre_name;

        console.log(item)
        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `<td>${item.song_id}</td><td>${item.song_name}</td><td>${songArtist}</td><td>${songGenre}</td><td>${item.song_duration}</td>`
        resTable.append(appendItem)
    });
}
window.onload = chartingTable;