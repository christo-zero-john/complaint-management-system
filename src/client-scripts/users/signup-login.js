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

      let newUser = new User();
      newUser.createAccount(name, email, password);
    } else {
      newNotification("Passwords Doesn't match.");
    }
  }
}

function loginToAccount() {
  let user = new User();
  let email = fields["login-email"].value;
  let password = fields["login-password"].value;
  let missingFields = [];
  if (!email) {
    missingFields.push("email");
    fields["login-email"].classList.add("empty-field");
  }

  if (!password) {
    missingFields.push("password");
    fields["login-password"].classList.add("empty-field");
  }

  if (missingFields.length > 0) {
    let message = "Enter " + missingFields.join(", ");
    // console.log(message);
    newNotification(message);
  }
  user.login(email, password);
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
