// Class For the entity user
/**
 * Expects parameters name, id and roles in the constructor function
 */
class User {
  constructor(name, id, roles) {
    this.name = name;
    this.id = id;
    this.roles = roles;
  }

  createAccount(name, email, password) {
    console.log(
      `Creating New User Account with: name ${name}, email ${email},password ${password}`
    );

    let userData = {
      name: name,
      email: email,
      password: password,
      role: "User",
    };

    console.log(
      "Sending Request to server to create new user account with: ",
      userData
    );
    newNotification("Sending Request to server to create new user account");
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
              newNotification(
                "An Error occurred unexpectedly: ",
                error.details
              );
              console.log(error.details);
            }
          });
        } else {
          // Save userdata to mail id.
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: data.returned.id,
              roles: data.returned.roles,
            })
          );
          newNotification(
            `Account Created Successfully with mail ID: ${data.returned.mail}. Loading Dashboard... If not loaded properly, <a href="../user/dashboard.html">Go to dashboard</a>`
          );

          window.location.href = "../user/dashboard.html";
        }
      });
  }

  login(email, password) {
    console.log(
      `Trying to login user with: email ${email},password ${password}`
    );
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
        } else {
          // Save userdata to mail id.
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: data.returned.id,
              roles: data.returned.roles,
            })
          );
          newNotification(
            `User with mail ID: ${data.returned.mail} logged in successfully. Loading Dashboard... If not loaded properly, <a href="../user/dashboard.html">Go to dashboard</a>`
          );

          window.location.href = "../user/dashboard.html";
        }
      });
  }
}

export { User };
