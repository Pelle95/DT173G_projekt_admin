// Variabler
let coursesEl = document.getElementById("data");

let courseId = document.getElementById("course-id");
let courseName = document.getElementById("coursename");
let schoolName = document.getElementById("schoolname");
let startDate = document.getElementById("start-date");
let endDate = document.getElementById("end-date");


// Variabler - knappar
let addCourseBtn = document.getElementById("add-course-btn");
let saveEditsBtn = document.getElementById("save-course-edits-btn");
let clearEditsBtn = document.getElementById("clear-course-edits-btn");

// Händelsehanterare

// Laddar in kurser direkt
window.addEventListener('load', getCourses);
// Händelsehanterare för knapptryck
addCourseBtn.addEventListener("click", addCourse);
saveEditsBtn.addEventListener("click", saveEdits);
clearEditsBtn.addEventListener("click", clearEdits);

// Funktioner

// Hämtar kurser
function getCourses(){
    // Återställer element
    coursesEl.innerHTML = '';
    // Anrop mot webbtjänst
    fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/courses.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(course => {
            // Skriver ut kurser och knappar för att ta bort eller redigera
            console.log(course);
            coursesEl.innerHTML +=
            `
            <div class="data-field">
            <p><b>Kursnamn:</b> ${course.coursename} 
            <br>
            <b>Universitet:</b> ${course.schoolname}
            <br>
            <b>Startdatum:</b> ${course.date_start} 
            <br>
            <b>Slutdatum:</b> ${course.date_end}
            </p>
            <button id="delete-${course.courseid}" onClick="deleteCourse('${course.courseid}')">Radera</button>
            <button id="edit-${course.courseid}" onClick="updateCourse('${course.courseid}','${course.coursename}','${course.schoolname}','${course.date_start}','${course.date_end}')">Redigera</button>
            </div>
            `
        })
    })
}
// Funktion för att ta bort kurs
function deleteCourse(id){
    // Anrop mot webbtjänst med metoden delete
    fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/courses.php?id=' + id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        // Laddar om kurser
        getCourses();
    })
    // Felmeddelanden
    .catch(error => {
        console.log('Error: ', error)
    })
}
// Funktion för att lägga till kurs
function addCourse(){
    // Läser in värden från form
    let cName = courseName.value;
    let sName = schoolName.value;
    let sDate = startDate.value;
    let eDate = endDate.value;

    // Skapar ett objekt med värden från form
    let course = {
        'coursename': cName,
        'schoolname': sName,
        'date_start': sDate,
        'date_end': eDate
    };
    // Kollar att allt är minst ett tecken långt
    if(cName.length > 0 && sName.length > 0 && sDate.length > 0 && eDate.length > 0){
        // Anrop mot webbtjänst med metoden POST, och skickar objektet i JSON-format
        fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/courses.php', {
            method: 'POST',
            body: JSON.stringify(course),
        })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error: ', error)
        })
    }
}

// Funktion som fyller i formen med den data från den man klickat redigera på
function updateCourse(id, coursename, schoolname, date_start, date_end){
    courseId.value = id;
    courseName.value = coursename;
    schoolName.value = schoolname;
    startDate.value = date_start;
    endDate.value = date_end;
}

// Återställer formen
function clearEdits(){
    courseId.value = '';
    courseName.value = '';
    schoolName.value = '';
    startDate.value = '';
    endDate.value = '';
}

// Funktion för att spara ändringar
function saveEdits(){
    // Variabler med värden från formen
    let id = courseId.value;
    let cName = courseName.value;
    let sName = schoolName.value;
    let sDate = startDate.value;
    let eDate = endDate.value;
    
    // Skapar ett objekt
    let editedCourse = {
         'coursename': cName,
         'schoolname': sName,
         'date_start': sDate,
         'date_end': eDate
    };
    
    if(cName.length > 0 && sName.length > 0 && sDate.length > 0 && eDate.length > 0){
        // Anrop med metoden PUT, och skickar data i JSON-format
        fetch('http://studenter.miun.se/~peek1901/dt173g/Projekt%20-%20Service/courses.php?id=' + id, {
            method: "PUT",
            body: JSON.stringify(editedCourse)
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