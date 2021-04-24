
async function artistsTable() {
    const artists = await fetch("api/artist");
    const artistsData = await artists.json();
    const artistTable = document.querySelector(".tableBody");
    console.log(artistTable);
    console.log(artists)
    console.log(artistsData);
    
    artistsData.forEach((item) => {
        console.log(item)
        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `<td>${item.artist_id}</td><td>${item.artist_name}</td>`
        artistTable.append(appendItem)
    });
}
window.onload = artistsTable;