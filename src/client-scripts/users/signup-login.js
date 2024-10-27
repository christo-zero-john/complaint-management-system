console.log("signup-login script loaded successfully");

let forms = {
  "login-form": document.getElementById("login-form"),
  "signup-form": document.getElementById("signup-form"),
};

let fields = {
  "signup-name": document.getElementById("signup-name"),
  "signup-email": document.getElementById("signup-email"),
  "signup-password": document.getElementById("signup-password"),
  "signup-confirm-password": document.getElementById("signup-confirm-password"),

  "login-email": document.getElementById("login-email"),
  "login-password": document.getElementById("login-password"),
};

// console.log(fields);

/**
 * @description Stores the base url of the server of Complaint management system.
 * Its a constant value.
 * Used to create GET, POST requests with the backend api.
 * @author Christo John
 */
const server = "http://localhost/Complaint%20Management%20System/backend";

/**
 * Used to show the `signup` form or `login` form according to the situation.
 * @param ctx - `ctx` or `context` is used to tell the function which form to show.
 * If `ctx` is `login`, it will displays the `login-form` and hides the `signup-form`.
 * If `ctx` is `signup-form` it will displays the `signup-form` and hides the `login-form`.
 
 */
function show(ctx) {
  for (let x in forms) {
    forms[x].classList.add("hidden");
  }
  let message = `Showing ${ctx}`;
  // console.log(message)
  newNotification(message);
  document.getElementById(ctx).classList.remove("hidden");
}

/**
 * @description Accept values from the user and create new account.
 * No Parameters are required.
 * Returns no values either.
 * Handles all logic for form validation and sents data for new user account creation to createNewUser function.
 * @author Christo John
 *
 */
function createAccount() {
  const name = fields["signup-name"].value;
  const email = fields["signup-email"].value;
  const password = fields["signup-password"].value;
  const confirmPassword = fields["signup-confirm-password"].value;

  let message = `Starting to Create New Account with credentials: <br/>
      <b>name</b>: ${name || "Enter some value"}<br/>
      <b>emai</b>l: ${email || "Enter some value"}<br/>
      <b>passwor</b>d: ${password || "Enter some value"}<br/>
      <b>confirmed password</b>: ${confirmPassword || "Enter some value"}  `;
  // console.log(message);
  newNotification(message);

  let missingFields = [];
  if (!name) {
    missingFields.push("name");
    fields["signup-name"].classList.add("empty-field");
  }

  if (!email) {
    missingFields.push("email");
    fields["signup-email"].classList.add("empty-field");
  }

  if (!password) {
    missingFields.push("password");
    fields["signup-password"].classList.add("empty-field");
  }

  if (!confirmPassword) {
    missingFields.push("confirm password");
    fields["signup-confirm-password"].classList.add("empty-field");
  }

  if (missingFields.length > 0) {
    let message = "Enter " + missingFields.join(", ");
    // console.log(message);
    newNotification(message);
  } else {
    if (password == confirmPassword) {
      let message = "<p>All Fields  are filled. Creating new account...</p>";
      // console.log(message);
      newNotification(message);

      let newUser = {
        name: name,
        email: email,
        password: password,
      };
      createNewUser(newUser);
    }
    else {
      newNotification("Passwords Doesn't match.")
    }
  }
}

function createNewUser(userData) {
  console.log("Sending Request to server");
  newNotification("Sending Request to server");
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  // Connect with server api. Sent a post request to create new user account with proper user credentials and handle server response accordingly.
  fetch(`${server}/api/user/create-account.php`, request)
    .then((res) => res.json())
    .then((data) => {
      console.log("Server response", data);

      // If some error occurred in the server side display it.
      if (data.status == "error") {
        data.errors.forEach((error) => {
          // If error is duplicate account creation. Then warn it.
          if (error.message === "Email already exists") {
            newNotification(
              error.message + ". Try Logging in to your account."
            );
          }
          // If reason for error was something unexpected, handle it.
          else {
            newNotification("An Error occurred unexpectedly: ", error.details);
            console.log(error.details);
          }
        });
      } else {
        // Save userdata to mail id.
        localStorage.setItem(
          "user",
          JSON.stringify({ mail: data.returned.mail, roles:["User"]})
        );
        newNotification(
          `Account Created Successfully with mail ID: ${data.returned.mail}. Loading Dashboard... If not loaded properly, <a href="../admin/dashboard.html">Go to dashboard</a>`
        );

        window.location.href = "../admin/dashboard.html";
      }
    });
}

function loginToAccount() {
  newNotification("Starting to Log User Into the System...");
  let requestData = {
    email: fields["login-email"].value,
    password: fields["login-password"].value,
  };

  console.log(requestData);

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  };

  fetch(server + "/api/user/login.php", request)
    .then((res) => res.json())
    .then((data) => {
      console.log("Response Data: ", data);

      // If server returned some error handle it.
      if (data.status === "error") {
        data.errors.forEach((error) => {
          // If error message is Incorrect email.
          if (error.message === "Incorrect Email") {
            newNotification(error.message + " Try with different email ID.");
          }

          // If error message is Incorrect password.
          else if (error.message === "Incorrect Password") {
            newNotification(error.message + " Try  with different password.");
          } else if (error.message === "No user roles Found") {
            newNotification("Warning: No role Found for user");
            data.returned.login = 1;
          }

          // If error message is some unknown error
          else {
            newNotification("An Error occurred unexpectedly: ");
            newNotification(error.details);
            console.log(error.details);
          }
        });
      }

      // If server returned success

      if (data.returned.login == 1) {
        console.log("Saving User data: ", data.returned);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.returned.mail })
        );
        newNotification("Logged in Successfully.");
        window.location.href = "../admin/dashboard.html";
      }
    });
}

// function devHelper() {
//   let tempData = {
//     name: "Christo John",
//     email: "10.christojohn@gmail.com",
//     password: "admin",
//   };
//   // console.log("Creating new user account with: ", tempData);
//   // createNewUser(tempData);
// }

/**Event Listners */
/**
 * 1. When the document loads do the following things.
 * Show signup-form:  The signup form is displayed by default.
 */

document.addEventListener("DOMContentLoaded", (e) => {
  let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  if (user && user.hasOwnProperty("id")) {
    newNotification("Already Logged In.");
    window.location.href = "../user/dashboard.html";
  } else {
    show("login-form");
  }
});

// Event Listners

/**
 * 1. When an input field is focused, remove empty-fields class from that field if it has the class empty-field.
 * empty-field class is added to the element if the field value is null when create account or login account is clicked.
 * This event listner is used to remove the class when the field is clicked again after the field is focused again.
 *
 */
let fieldElements = Object.values(fields);
// console.log(fieldElements);
fieldElements.forEach((element) => {
  element.onfocus = (e) => {
    if (e.target.classList.contains("empty-field")) {
      e.target.classList.remove("empty-field");
    }
  };
});
