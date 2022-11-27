<?php

class Database
{
    protected $arr;
    public function __construct() {
        $this->arr = json_decode(file_get_contents("./json_db/db.json"), true);
    }

    //Load info from class object to json file
    public function reload_db(){
        file_put_contents("./json_db/db.json", json_encode($this->arr));
    }

    //CRUD

    //CREATE
    public function create_line(string $name, string $login, string $email, string $password) {
        $md = md5($password);
        if(count($this->arr["users"])==0)
        {
            $md = md5($md . "1");
            $new_line = ["id" => 1, "name" => $name, "login" => $login, "email" => $email, "password" => $md, "available" => true];
        }
        else
        {
            $salt = end($this->arr["users"])["id"]+1;
            $md = md5($md . $salt);
            $new_line = ["id" => end($this->arr["users"])["id"]+1, "name" => $name, "login" => $login, "email" => $email, "password" => $md, "available" => true];
        }
        array_push($this->arr["users"], $new_line);
        $this->reload_db();
    }

    //READ
    public function read_line(int $id){
        foreach($this->arr["users"] as $user){
            if ($user["id"] == $id){
                return $user;
            }
        }
        return null;
    }

    //UPDATE
    public function update_line(int $id, string $name, string $login, string $email, string $password, bool $available){
        foreach($this->arr["users"] as $key => $user){
            if ($user["id"] == $id){
                $md = md5($password);
                $md = md5($md . $id);
                $new_line = ["id" => $id, "name" => $name, "login" => $login, "email" => $email, "password" => $md, "available" => $available];
                $this->arr["users"][$key] = $new_line;
                $this->reload_db();
            }
        }
    }

    //DELETE
    public function delete_line(int $id){
        foreach($this->arr["users"] as $key => $user){
            if ($user["id"] == $id){
                $user["available"]=false;
                $this->arr["users"][$key] = $user;
                $this->reload_db();
            }
        }
    }
    
    //find if $column with $value exists
    public function find_value(string $value, string $column){
        foreach($this->arr["users"] as $user){
            if ($user[$column] == $value){
                return true;
            }
        }
        return false;
    }

    //check if user $login exists and available
    public function is_available(string $login){
        foreach($this->arr["users"] as $user){
            if ($user["login"] == $login){
                return $user["available"];
            }
        }
        return false;
    }

    //check if user $login has $password
    public function check_password(string $login, string $password){
        foreach($this->arr["users"] as $user){
            if($user["login"] == $login){
                $md = md5($password);
                $salt = $user["id"];
                $md = md5($md . $salt);
                if($user["password"]==$md)
                    return true;
                else
                    return false;
            }
        }
        return false;
    }
}

?>