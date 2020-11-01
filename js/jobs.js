// Variabler
let jobsEl = document.getElementById("data");

let jobId = document.getElementById("job-id");
let jobTitle = document.getElementById("jobtitle");
let workplace = document.getElementById("workplace");
let startDate = document.getElementById("start-date");
let endDate = document.getElementById("end-date");

// Variabler - knappar
let addJobBtn = document.getElementById("add-job-btn");
let saveEditsBtn = document.getElementById("save-job-edits-btn");
let clearEditsBtn = document.getElementById("clear-job-edits-btn");

// Händelsehanterare

// Laddar in jobb direkt
window.addEventListener('load', getJobs);

// Händelsehanterare för knapptryck
addJobBtn.addEventListener("click", addJob);
saveEditsBtn.addEventListener("click", saveEdits);
clearEditsBtn.addEventListener("click", clearEdits);


// Funktioner

// Funktion för att hämta jobb
function getJobs() {
    // Återställer element
    jobsEl.innerHTML = '';
    // Anrop mot webbtjänst
    fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/jobs.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(job => {
            // Skriver ut jobb och knappar för att ta bort eller redigera
                console.log(job);
                jobsEl.innerHTML +=
                    `
            <div class="data-field">
            <p><b>Jobbtitel:</b> ${job.jobtitle} 
            <br>
            <b>Arbetsplats:</b> ${job.workplace} 
            <br>
            <b>Startdatum:</b> ${job.date_start} 
            <br>
            <b>Slutdatum:</b> ${job.date_end}
            </p>
            <button id="${job.jobid}" onClick="deleteJob('${job.jobid}')">Radera</button>
            <button id="edit-${job.jobid}" onClick="updateJob('${job.jobid}','${job.jobtitle}','${job.workplace}','${job.date_start}','${job.date_end}')">Redigera</button>
            </div>
            `
            })
        })
}
// Funktion för att ta bort jobb
function deleteJob(id) {
    // Anrop mot webbtjänst med metoden delete
    fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/jobs.php?id=' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            // Laddar om jobb
            getJobs();
        })
        // Plockar upp ev. felmeddelanden
        .catch(error => {
            console.log('Error: ', error)
        })
}

// Funktion för att lägga till ett nytt jobb
function addJob() {
    // Läser in värden från form
    let jTitle = jobTitle.value;
    let wPlace = workplace.value;
    let sDate = startDate.value;
    let eDate = endDate.value;

    // Skapar ett objekt med värden från form
    let job = {
        'jobtitle': jTitle,
        'workplace': wPlace,
        'date_start': sDate,
        'date_end': eDate
    };
    // Kollar att allt är minst ett tecken långt
    if (jTitle.length > 0 && wPlace.length > 0 && sDate.length > 0 && eDate.length > 0) {
        // Anrop mot webbtjänst med metoden POST, och skickar objektet i JSON-format
        fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/jobs.php', {
            method: 'POST',
            body: JSON.stringify(job),
        })
            .then(response => response.json())
            .then(data => {
                getJobs();
            })
            .catch(error => {
                console.log('Error: ', error)
            })
    }
}
// Funktion som fyller i formen med den data från den man klickat redigera på
function updateJob(id, coursename, schoolname, date_start, date_end) {
    jobId.value = id;
    jobTitle.value = coursename;
    workplace.value = schoolname;
    startDate.value = date_start;
    endDate.value = date_end;
}
// Återställer formen
function clearEdits() {
    jobId.value = '';
    jobTitle.value = '';
    workplace.value = '';
    startDate.value = '';
    endDate.value = '';
}
// Funktion för att spara ändringar
function saveEdits() {
    // Variabler med värden från formen
    let id = jobId.value;
    let jTitle = jobTitle.value;
    let wPlace = workplace.value;
    let sDate = startDate.value;
    let eDate = endDate.value;

    // Skapar ett objekt
    let editedJob = {
        'jobtitle': jTitle,
        'workplace': wPlace,
        'date_start': sDate,
        'date_end': eDate
    };
    if (jTitle.length > 0 && wPlace.length > 0 && sDate.length > 0 && eDate.length > 0) {
        // Anrop med metoden PUT, och skickar data i JSON-format
        fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/jobs.php?id=' + id, {
            method: "PUT",
            body: JSON.stringify(editedJob)
        })
            .then(response => response.json())
            .then(data => {
                getCourses();
            })
            .catch(error => {
                console.log("Error: " + error)
            })
    }
}
