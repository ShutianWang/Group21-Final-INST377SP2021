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

        console.log(albumReleaseDate);

        return {x: new Date(parts[0], parts[1] - 1, parts[2]), y: peakOnChart, indexLabel: item.song_name, markerType: "circle",  markerColor: "#6B8E23"}
        return {name:item.song_name, artist:songArtist, genre:songGenre, peakposition:peakOnChart, release:albumReleaseDate}
    });

    console.log(chartingData);
    console.log(results)

    loadVisualization(results);
}


function loadVisualization(data) {
    var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title:{
            text: "Song Line Chart"
        },
        axisX: {
            interval: 1,
            intervalType: "month"
        },
        data: [{
            type: "line",
            dataPoints: [data]
        }]
    });

    chart.render();
}


window.onload = windowActions