const amountToDisplay = 50;

async function getTable() {
    const request = await fetch('/api/artisticMovement');
    const movements = await request.json();
    console.log(movements)
}


async function windowActions() {
    console.log('Javascript is connected!');
    await getData();
    loadVisualization();
}

async function getData() {
    const songs = await fetch("/api/songs");
    const songsData = await songs.json();

    const charting = await fetch("/api/charting");
    const chartingData = await charting.json();

    const artists = await fetch("/api/artist");
    const artistData = await artists.json();
    
    const genres = await fetch("/api/genres");
    const genreData = await genres.json();

    const albums = await fetch("/api/albums");
    const albumData = await albums.json();


    let results = songsData.map((item) => {
        const songArtist = artistData[item.artist_id-1].artist_name;
        const songGenre = genreData[item.genre_id-1].genre_name;
        const peakOnChart = chartingData[item.song_id-1].peak_on_chart;
        const albumReleaseDate = albumData[item.album_id-1].album_release_date;

        let parts = albumReleaseDate.split('-');

        return {x: new Date(parts[0], parts[1] - 1, parts[2]), y: Number(peakOnChart), indexLabel: item.song_name}
        return {name:item.song_name, artist:songArtist, genre:songGenre, peakposition:peakOnChart, release:albumReleaseDate}
    });

    console.log(results)

    loadVisualization(results);
}


function loadVisualization(_data) {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "dark1",
        title:{text: "Song Line Chart"},
        axisX: {
            title: "Release Date"
        },
        axisY: {
            title: "Peak Position on Billboard"
        },
        data: [{
            type: "line",
            dataPoints: _data
        }]
    });

    chart.render();
}


window.onload = windowActions