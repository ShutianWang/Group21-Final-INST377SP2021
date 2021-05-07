
let data;

async function getTable() {
    const request = await fetch('/api/artisticMovement');
    const movements = await request.json();
    console.log(movements)
}


async function windowActions() {
    console.log('Javascript is connected!');
    await getData();
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

        return {x: new Date(parts[0], parts[1] - 1, parts[2]), y: Number(peakOnChart), toolTipContent: `#{y}, {x}, ${item.song_name} by ${songArtist}, ${songGenre}`  }
        //return {name:item.song_name, artist:songArtist, genre:songGenre, peakposition:peakOnChart, release:albumReleaseDate}
    
    });
    console.log("hey", results)
    results.sort(function(a, b) {
        return b.x - a.x
    });
    console.log("hoy", results)
    console.log(results);
    data = results;

    filterData();
  
}

function titleCase(str) {

    str = str.toLowerCase();
    str = str.split(' ');

    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }

    return str.join(' ');
  }

function filterData()
{
    let _data = data;
    let startDate = document.getElementById("startdate").value;

        if(startDate == "")
        {
            startDate = new Date("2016-07-03");
        }
        else
        {
            let parts = startDate.split('-');
            startDate = new Date(parts[0], parts[1] - 1, parts[2]);
        }

        console.log(startDate);
        _data = _data.filter((item) => item.x > startDate);

    let endDate = document.getElementById("enddate").value;

        if(endDate == "")
        {
            endDate = new Date("2019-11-22");
        }
        else
        {
            let parts = endDate.split('-');
            endDate = new Date(parts[0], parts[1] - 1, parts[2]);
        }

        console.log(endDate);

        _data = _data.filter((item) => item.x < endDate);

    let artistName = document.getElementById("artist").value;
    console.log(artistName, "heyhey")
        
        if(artistName == "")
            {
                artistName = "";
            }
        else
            {
                artistName = titleCase(artistName);
                
                _data = _data.filter((item) => item.artist == artistName)
                console.log("artistfiltering", _data)
            }
        console.log(_data)

    let genre = document.getElementById("genre").value;
    console.log(genre, "genre")

        if(genre == "")
        {
            genre = ""
        }
        else {
            genre = titleCase(genre);
            _data = _data.filter((item) => item.genre == genre)
            console.log("gfilter", _data)
        }
        

        

    loadVisualization(_data);
}

function loadVisualization(_data) {
    console.log(_data);

    var chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        zoomType: "xy",
        animationEnabled: true,
        theme: "dark1",
        title:{text: "Song Peak Position Chart"},
        axisX: {
            title: "Release Date"
        },
        axisY: {
            title: "Peak Position on Billboard"
            
        },
        data: [{
            type: "scatter",
            markerSize: 8,
            dataPoints: _data
        }],
        toolTip:{
            content: "song: {indexLabel}, artist: {artist}, genre: {genre}, peak position: {y}"
        }
    });
    
    chart.render();
}


window.onload = windowActions