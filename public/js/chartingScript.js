
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
 
    console.log(chartingData);
    
    chartingData.forEach((item) => {
        let chartSong = songsData[item.song_id-1]
        let ChArtist = artistData[item.song_id-1].artist_name;
        let chartGenre = genreData[chartSong.genre_id-1].genre_name;

        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `<td>${item.charting_id}</td>
        <td>${chartSong.song_name}</td>
        <td>${ChArtist}</td>
        <td>${item.peak_on_chart}</td>
        <td>${item.weeks_on_chart}</td>
        <td>${item.latest_position}</td>
        <td>${item.last_week_on_chart}</td>
        <td>${chartGenre}</td>`
        chartTable.append(appendItem)
    });
}
window.onload = chartingTable;