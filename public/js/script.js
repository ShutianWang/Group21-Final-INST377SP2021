
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

        return {x: new Date(parts[0], parts[1] - 1, parts[2]), y: Number(peakOnChart), toolTipContent: `#{y}, {x}, ${item.song_name} by ${songArtist}, ${songGenre}`, artist: songArtist, genre: songGenre, song: item.song_name}
        //return {name:item.song_name, artist:songArtist, genre:songGenre, peakposition:peakOnChart, release:albumReleaseDate}
    
    });
    console.log("hey", results)
    results.sort(function(a, b) {
        return b.x - a.x
    });
    console.log("hoy", results)
    console.log(results);
    data = results;

    autocomplete(artistInput, data)
    autocomplete(songInput, data)
    autocomplete(genreInput, data)
    filterData();
  
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        let artistList = []
        let songList = []
        let genreList = []
        let a, b, i, val = e.target.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (inp == artistInput){
          if (arr[i].artist.substr(0, val.length).toUpperCase() == val.toUpperCase() && !(artistList.includes(arr[i].artist))) {
            /*create a DIV element for each matching element:*/
            artistList.push(arr[i].artist)
            b = document.createElement("DIV");
            b.setAttribute("class", "autoDrop")
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].artist.substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].artist.substr(val.length);
            
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].artist + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                    filterData()
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
        else if(inp == genreInput){
            if (arr[i].genre.substr(0, val.length).toUpperCase() == val.toUpperCase() && !(genreList.includes(arr[i].genre))) {
                /*create a DIV element for each matching element:*/
                genreList.push(arr[i].genre)
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].genre.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].genre.substr(val.length);
                b.setAttribute("class", "autoDrop")
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].genre + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                        filterData()
                    closeAllLists();
                });
                a.appendChild(b);
              }
        }
        else if(inp == songInput){
            if (arr[i].song.substr(0, val.length).toUpperCase() == val.toUpperCase() && !(songList.includes(arr[i].song))) {
                /*create a DIV element for each matching element:*/
                songList.push(arr[i].song)
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].song.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].song.substr(val.length);
                b.setAttribute("class", "autoDrop")
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].song + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                        filterData()
                    closeAllLists();
                });
                a.appendChild(b);
              }
        }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
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
    // Date filtering
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

    // Artist Filtering
    let artistName = document.getElementById("artist").value;
    console.log(artistName, "heyhey")

        if(artistName != "")
            {
                artistName = titleCase(artistName);
                
                _data = _data.filter((item) => item.artist == artistName)
                console.log("artistfiltering", _data)
            }
        console.log(_data)

    // Genre Filtering
    let genre = document.getElementById("genre").value;
    console.log(genre, "genre")

        if (genre != "") {
            genre = titleCase(genre);
            _data = _data.filter((item) => item.genre == genre)
            console.log("gfilter", _data)
        }
    
    // Peak Position Filtering
    let chartingMin = document.getElementById("chartingMin").value;
    let chartingMax = document.getElementById("chartingMax").value;
        console.log(chartingMax, chartingMin)   
        if(chartingMin >= 1 && chartingMin <= 100 && chartingMax >= 1 && chartingMax <= 100 && chartingMax <= chartingMin){
            _data = _data.filter((item) => item.y >= chartingMax && item.y <= chartingMin)
        }
        else{
            chartingMin = 100;
            chartingMax = 1;
            _data = _data.filter((item) => item.y >= chartingMax && item.y <= chartingMin)
        }
    
    // Song Filtering
    let songName = document.getElementById("song").value;
        if (songName != "")
        {
            songName = titleCase(songName)
            _data = _data.filter((item => item.song == songName))
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

let artistInput = document.getElementById("artist");
let songInput = document.getElementById("song");
let genreInput = document.getElementById("genre");
// artistInput.addEventListener("change", displayArtistMatches);
// songInput.addEventListener("change", displaySongMatches);
// genreInput.addEventListener("change", displayGenreMatches);

// songInput.addEventListener("keyup", displaySongMatches);
// genreInput.addEventListener("keyup", displayGenreMatches);

window.onload = windowActions