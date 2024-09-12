<?php

/*function formatName($name){
    $name = strtolower($name);
    $name = ucwords($name);
    return $name;
}*/

if($_SERVER['REQUEST_METHOD'] === "POST"){
    //$name = formatName($_POST['name']);
    $name = htmlspecialchars(trim(ucwords(strtolower($_POST['name']))));
    //var_dump($name);
    $email = strtolower($_POST['email']);
    filter_var($email, FILTER_SANITIZE_EMAIL);
    filter_var($email, FILTER_VALIDATE_EMAIL);
    //var_dump($email);
    $phone = htmlspecialchars($_POST['phone']);
    //var_dump($phone);
    $course = $_POST['course'];
    //var_dump($course);

    if ($name and $email and $phone and $course) {
        echo "<br>Your name: " . $name . "<br>";
        echo "Your email: " . $email . "<br>";
        echo "Your phone number: " . $phone . "<br>";
        echo "Your chosen course: " . $course . "<br>";
    }

    if (isset($_FILES['photo']) and $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $photoTmpPath = $_FILES['photo']['tmp_name'];
        $photoName = uniqid() . '_' . $_FILES['photo']['tmp_name'];
        $uploadDir = 'uploads/';
        //var_dump($photoTmpPath , $photoName);
    }
    else{
        echo "<br>Hello, hello!";
    }

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $destination = $uploadDir . basename($photoName);
    if (move_uploaded_file($photoTmpPath, $destination)) {
        echo"<br>A feltöltött fotó:<br>";
        echo "<img src='" . $destination . "' alt='Feltöltött fotó' style='width: 200px;'>";
    }

}



?>