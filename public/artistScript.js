
async function artistsTable() {
    const artists = await fetch("/api/artists");
    const artistsData = await artists.json();
    const artistsTable = document.querySelector(".tableBody");
    console.log(artistsTable);
    console.log(artistsData);
    
    artistsData.data.forEach((item) => {
        console.log(item)
        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `<td>${item.artist_id}</td><td>${item.artist_name}</td><td>${item.artist_label}</td>`
        resTable.append(appendItem)
    });
}
window.onload = artistsTable;