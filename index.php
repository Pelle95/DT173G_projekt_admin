<?php
// Inkluderar filen config.php
include("includes/config.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projekt - Admingränssnitt</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div id="container">
<?php

// Skapar en ny instans av klassen Admin
$Admin = new Admin();

// Inloggning
if(isset($_POST['login'])){
    $acc_user = $_POST['username'];
    $acc_pass = $_POST['password'];
    // Funktion från klassen Admin körs för att försöka logga in
    if($Admin->loginUser($acc_user, $acc_pass)){
        echo "Logged in.";
    }else{
        echo "Could not find user.";
        echo "<pre>";
        var_dump($Admin->getUsers());
        echo "</pre>";
    }
}
// Utloggning
if(isset($_POST['logout'])){
    // Rensar sessionsvariabler
    session_start();
    session_unset();
    session_destroy();
    // Laddar om sidan
    header("Location: index.php");
}
?>

<?php 
// Ifall användaren inte är inloggad visas ett inloggningsformulär
if(!isset($_SESSION['currentuser'])) { ?>
    <form method="POST">
        <label for="username">Användarnamn:</label>
        <br>
        <input type="text" name="username" id="username" placeholder="Användarnamn...">

        <br>
        <label for="password">Lösenord:</label>
        <br>
        <input type="password" name="password" id="password" placeholder="Lösenord...">
        <br>
        <input type="submit" value="Logga in" name="login" id="login">
    </form>
<?php } else { 
    // Detta visas ifall användaren är inloggad
    ?>
    <!-- Utloggningsknapp -->
<form method="POST">
    <input type="submit" value="Logga ut" name="logout" id="logout">
</form>
<!-- Meny -->
<header id="main-header">
    <nav id="main-nav">
        <ul>
            <li>
                <a href="?courses">Kurser</a>
            </li>
            <li>
                <a href="?jobs">Jobb</a>
            </li>
            <li>
                <a href="?websites">Webbplatser</a>
            </li>
        </ul>
    </nav>
</header>


<!-- Kurser -->
<?php 
// Laddar om sidan vid klick 
if(isset($_REQUEST['add-course-btn']) || isset($_REQUEST['clear-course-edits-btn']) || isset($_REQUEST['save-course-edits-btn'])){
    header("Location: index.php?courses");
}
// Menyalternativ som styrs via GET-parameter
if(isset($_GET['courses'])){ ?>
<!-- Där data från databasen läses ut -->
<div id="data">
</div>
<!-- Form för att lägga till/justera data -->
<form id="add-data">
    <!-- Gömd input som lagrar ID vid förändring -->
    <input type="hidden" id="course-id" style="display:none;">

    <label for="coursename">Kursnamn:</label>
    <br>
    <input type="text" id="coursename" name="coursename" placeholder="Ange minst ett tecken...">
    <br>

    <label for="schoolname">Universitet:</label>
    <br>
    <input type="text" id="schoolname" name="schoolname" placeholder="Ange minst ett tecken...">
    <br>

    <label for="start-date">Startdatum:</label>
    <br>
    <input type="text" id="start-date" name="start-date" placeholder="Ange minst ett tecken...">
    <br>

    <label for="end-date">Slutdatum:</label>
    <br>
    <input type="text" id="end-date" name="end-date" placeholder="Ange minst ett tecken...">
    <br>

    <input type="submit" value="Lägg till ny" id="add-course-btn" name="add-course-btn">
    <br>
    <input type="submit" value="Spara ändringar" id="save-course-edits-btn" name="save-course-edits-btn">
    <br>
    <input type="submit" value="Rensa/Avbryt" id="clear-course-edits-btn" name="clear-course-edits-btn">
</form>
<!-- JavaScript fil för kurser -->
<script src="js/courses.js"></script>
<?php } ?>


<!-- Jobb -->
<?php 
// Laddar om sidan vid klick 
if(isset($_REQUEST['add-job-btn']) || isset($_REQUEST['clear-job-edits-btn']) || isset($_REQUEST['save-job-edits-btn'])){
    header("Location: index.php?jobs");
}
// Menyalternativ som styrs via GET-parameter
if(isset($_GET['jobs'])){ ?>
<!-- Där data från databasen läses ut -->
<div id="data">
</div>
<!-- Form för att lägga till/justera data -->
<form id="add-data">
    <!-- Gömd input som lagrar ID vid förändring -->
    <input type="hidden" id="job-id" style="display:none;">

    <label for="jobtitle">Jobbtitel:</label>
    <br>
    <input type="text" id="jobtitle" name="jobtitle" placeholder="Ange minst ett tecken...">
    <br>

    <label for="workplace">Arbetsplats:</label>
    <br>
    <input type="text" id="workplace" name="workplace" placeholder="Ange minst ett tecken...">
    <br>

    <label for="start-date">Startdatum:</label>
    <br>
    <input type="text" id="start-date" name="start-date" placeholder="Ange minst ett tecken...">
    <br>

    <label for="end-date">Slutdatum:</label>
    <br>
    <input type="text" id="end-date" name="end-date" placeholder="Ange minst ett tecken...">
    <br>

    <input type="submit" value="Lägg till ny" id="add-job-btn" name="add-job-btn">
    <br>
    <input type="submit" value="Spara ändringar" id="save-job-edits-btn" name="save-job-edits-btn">
    <br>
    <input type="submit" value="Rensa/Avbryt" id="clear-job-edits-btn" name="clear-job-edits-btn">
</form>
<!-- JavaScript-fil för jobb -->
<script src="js/jobs.js"></script>
<?php } ?>

<!-- Hemsidor -->
<?php 
// Laddar om sidan vid klick 
if(isset($_REQUEST['add-website-btn']) || isset($_REQUEST['clear-website-edits-btn']) || isset($_REQUEST['save-website-edits-btn'])){
    header("Location: index.php?websites");
}
// Menyalternativ som styrs via GET-parameter
if(isset($_GET['websites'])){ ?>
<!-- Där data från databasen läses ut -->
<div id="data">
</div>
<!-- Form för att lägga till/justera data -->
<form id="add-data">
    <!-- Gömd input som lagrar ID vid förändring -->
    <input type="hidden" id="website-id" style="display:none;">

    <label for="website-title">Webbplatstitel:</label>
    <br>
    <input type="text" id="website-title" name="website-title" placeholder="Ange minst ett tecken...">
    <br>

    <label for="website-url">Website URL:</label>
    <br>
    <input type="text" id="website-url" name="website-url" placeholder="Ange minst ett tecken...">
    <br>

    <label for="website-description">Beskrivning:</label>
    <br>
    <input type="text" id="website-description" name="website-description" placeholder="Ange minst ett tecken...">
    <br>

    <input type="submit" value="Lägg till ny" id="add-website-btn" name="add-website-btn">
    <br>
    <input type="submit" value="Spara ändringar" id="save-website-edits-btn" name="save-website-edits-btn">
    <br>
    <input type="submit" value="Rensa/Avbryt" id="clear-website-edits-btn" name="clear-website-edits-btn">
</form>
<!-- JavaScript-fil för webbplatser -->
<script src="js/websites.js"></script>
<?php } ?>


<?php } ?>

</div>
</body>
</html>
