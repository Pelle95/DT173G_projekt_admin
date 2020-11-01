// Variabler
let websitesEl = document.getElementById("data");

let websiteId = document.getElementById("website-id");
let websiteTitle = document.getElementById("website-title");
let websiteUrl = document.getElementById("website-url");
let websiteDesc = document.getElementById("website-description");

// Variabler - knappar
let addWebsiteBtn = document.getElementById("add-website-btn");
let saveEditsBtn = document.getElementById("save-website-edits-btn");
let clearEditsBtn = document.getElementById("clear-website-edits-btn");

// Händelsehanterare

// Laddar in webbplatser direkt 
window.addEventListener('load', getWebsites);

// Händelsehanterare för knapptryck
addWebsiteBtn.addEventListener("click", addWebsite);
saveEditsBtn.addEventListener("click", saveEdits);
clearEditsBtn.addEventListener("click", clearEdits);

// Funktioner

// Hämtar webbplatser
function getWebsites(){
    // Återställer element
    websitesEl.innerHTML = '';
    // Anrop mot webbtjänst
    fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/websites.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(website => {
            // Skriver ut webbplatser och knappar för att ta bort eller redigera
            console.log(website);
            websitesEl.innerHTML +=
            `
            <div class="data-field">
            <p><b>Webbplatstitel:</b> ${website.websitetitle}
            <br>
            <b>Webbplatslänk:</b> <a title="${website.websitetitle} (Öppnas i nytt fönster)" target="_blank" href="${website.websiteurl}">${website.websitetitle} (länk)</a>
            <br>
            <b>Beskrivning:</b> ${website.description} 
            </p>
            <button id="${website.websiteid}" onClick="deleteWebsite('${website.websiteid}')">Radera</button>
            <button id="edit-${website.websiteid}" onClick="updateWebsite('${website.websiteid}','${website.websitetitle}','${website.websiteurl}','${website.description}')">Redigera</button>
            </div>
            `
        })
    })
}
// Funktion för att ta bort webbplats
function deleteWebsite(id) {
    // Anrop mot webbtjänst med metoden delete
    fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/websites.php?id=' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            // Laddar om webbplatser
            getWebsites();
        })
        // Felmeddelanden
        .catch(error => {
            console.log('Error: ', error)
        })
}

// Funktion för att lägga till webbplats
function addWebsite() {
    // Läser in värden från form
    let wTitle = websiteTitle.value;
    let wUrl = websiteUrl.value;
    let desc = websiteDesc.value;
    // Skapar ett objekt med värden från form
    let website = {
        'websitetitle': wTitle,
        'websiteurl': wUrl,
        'description': desc
    };
    // Kollar att allt är minst ett tecken långt
    if (wTitle.length > 0 && wUrl.length > 0 && desc.length > 0) {
        // Anrop mot webbtjänst med metoden POST, och skickar objektet i JSON-format
        fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/websites.php', {
            method: 'POST',
            body: JSON.stringify(website),
        })
            .then(response => response.json())
            .then(data => {
                getWebsites();
            })
            .catch(error => {
                console.log('Error: ', error)
            })
    }
}

// Funktion som fyller i formen med den data från den man klickat redigera på
function updateWebsite(id, websitetitle, websiteurl, description) {
    websiteId.value = id;
    websiteTitle.value = websitetitle;
    websiteUrl.value = websiteurl;
    websiteDesc.value = description;
}

// Återställer formen
function clearEdits() {
    websiteId.value = '';
    websiteTitle.value = '';
    websiteUrl.value = '';
    websiteDesc.value = '';
}

// Funktion för att spara ändringar
function saveEdits() {
    // Variabler med värden från formen
    let id = websiteId.value;
    let wTitle = websiteTitle.value;
    let wUrl = websiteUrl.value;
    let desc = websiteDesc.value;

    // Skapar ett objekt
    let editedWebsite = {
        'websitetitle': wTitle,
        'websiteurl': wUrl,
        'description': desc
    };
    if (wTitle.length > 0 && wUrl.length > 0 && desc.length > 0) {
        // Anrop med metoden PUT, och skickar data i JSON-format
        fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/websites.php?id=' + id, {
            method: "PUT",
            body: JSON.stringify(editedWebsite)
        })
            .then(response => response.json())
            .then(data => {
                getWebsites();
            })
            .catch(error => {
                console.log("Error: " + error)
            })
    }
}