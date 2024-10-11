console.log("Script connected successfully");
let warningDiv = document.getElementById("warning");

show("login-form");

function show(ctx) {
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("login-form").classList.add("hidden");
    console.log(`Showing ${ctx}`);
    document.getElementById(ctx).classList.remove("hidden");
}



function validatePassword() {
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    if (password != confirmPassword) {
        console.log("Passwords does not match");
        warningDiv.innerHTML = "Passwords does not match";
        console.log(password, confirmPassword)
    }
}

function createAccount() {
    console.log();
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;

    console.log("Creating Account: ", name, email, password)
    let data = new FormData;
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
}




















document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from PHP
    fetch('http://localhost/Christo%20John/Complaint%20Management%20System/data.php')
        .then(response => response.json())
        .then(data => {
            // Store data in localStorage
            localStorage.setItem('userData', JSON.stringify(data));

            // Optionally, retrieve and log data to verify
            const storedData = JSON.parse(localStorage.getItem('userData'));
            console.log('Stored data:', storedData);
        })
        .catch(error => console.error('Error fetching data:', error));
});