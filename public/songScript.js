
async function songsTable() {
    const songs = await fetch("/api/songs");
    const songsData = await songs.json();
    const songTable = document.querySelector(".tableBody");
    console.log(songTable)
    console.log(songsData);
    
    songsData.data.forEach((item) => {
        console.log(item)
        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `<td>${item.song_id}</td><td>${item.song_name}</td><td>${item.song_id}</td>`
        resTable.append(appendItem)
    });
}
window.onload = songsTable;