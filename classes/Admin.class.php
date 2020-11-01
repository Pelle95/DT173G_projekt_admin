<?php
class Admin
{
    // Lagrar databasvariabel
    private $db;

    // Konstruerare
    public function __construct()
    {
        // Skapar en databasanslutning
        $this->db = new mysqli(DBHOST, DBUSER, DBPASS, DBDATABASE);
        if ($this->db->connect_errno > 0) {
            die("Fel vid anslutning: " . $this->db->connect_error);
        }
    }
    // Hämtar användare
    public function getUsers(){
        // Fråga till databasen
        $sql = "SELECT * FROM `dt173g_proj_accounts`";
        // Svar från databasen
        $result = $this->db->query($sql);

        // Returnerar svar som en array
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    // Funktion för att logga in en användare
    public function loginUser($acc_user, $acc_pass)
    {
        // Gör alla tecken till gemener i användarnamnet, för att det inte ska spela någon roll vid inloggning.
        $acc_user = strtolower($acc_user);
        // Fråga till databasen
        $sql = "SELECT * FROM `dt173g_proj_accounts`";
        // Svar från databsen
        $result = $this->db->query($sql);
        // Variabel för att hålla koll ifall en matchning sker
        $match = 0;
        // Loopar igenom alla använder och jämför användarnamn och lösenord
        while($row = $result->fetch_assoc()){
            if(strtolower($row['acc_user']) == $acc_user && $row['acc_pass'] == $acc_pass){
                // Sker en match deklareras en sessionsvariabel
                $_SESSION['currentuser'] = $row;
                $match = 1;
                return true;
            }
        }
        if($match == 0){
            return false;
        }
    }
}