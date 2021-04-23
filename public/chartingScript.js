
async function chartingTable() {
    const charting = await fetch("/api/charting");
    const chartingData = await charting.json();

    const artists = await fetch("/api/artist");
    const artistData = await artists.json();

    const genres = await fetch("api/genres");
    const genreData = await genres.json();

    const songs = await fetch("api/songs");
    const songsData = await songs.json();

    const chartTable = document.querySelector(".tableBody");
    console.log(songTable)
    console.log(chartingData);
    
    chartingData.data.forEach((item) => {
        let chartSong = songsData[item.song_id]
        let ChArtist = artistData[item.artist_id].artist_name;
        let chartGenre = genreData[item.genre_id].genre_name;

        console.log(item)
        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `<td>${item.charting_id}</td><td>${item.song_name}</td><td>${songArtist}</td><td>${songGenre}</td><td>${item.song_duration}</td>`
        resTable.append(appendItem)
    });
}
window.onload = chartingTable;