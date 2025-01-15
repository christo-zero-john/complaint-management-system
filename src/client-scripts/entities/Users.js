// Class For the entity user

/**
 * Expects parameters name, id and roles in the constructor function
 */
class User {
  constructor(name, id, roles) {
    if (name && id && roles) {
      console.log(`Creating user with data: name: ${name}`);
      this.name = name;
      this.id = id;
      this.roles = roles;
      this.type = "User";
    } else if (localStorage.getItem("user")) {
      console.log("Creating logged in user object");
      let user = JSON.parse(localStorage.getItem("user"));
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      };

      fetch(`${server}/api/user-roles/get-user-roles-by-uid.php`, request)
        .then((res) => res.json())
        .then((data) => {
          user.roles = data.returned;
          this.name = user.name;
          this.id = user.id;
          this.roles = user.roles;
          localStorage.setItem("user", JSON.stringify(user));
        });
    }
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

          window.user.name = data.returned.name;
          window.user.name = data.returned.id;
          window.user.name = data.returned.roles;

          this.saveUser(
            data.returned.name,
            data.returned.id,
            data.returned.roles
          );

          newNotification(
            `Account Created Successfully with mail ID: ${data.returned.id}. Loading Dashboard... If not loaded properly, <a href="../user/dashboard.html">Go to dashboard</a>`
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

          window.user.name = data.returned.name;
          window.user.name = data.returned.id;
          window.user.name = data.returned.roles;

          this.saveUser(
            data.returned.name,
            data.returned.id,
            data.returned.roles
          );
          // localStorage.setItem(
          //   "user",
          //   JSON.stringify({
          //     id: data.returned.id,
          //     roles: data.returned.roles,
          //   })
          // );
          newNotification(
            `User with mail ID: ${data.returned.id} logged in successfully. Loading Dashboard... If not loaded properly, <a href="../user/dashboard.html">Go to dashboard</a>`
          );

          window.location.href = "../user/dashboard.html";
        }
      });
  }

  saveUser(name, id, roles) {
    console.log(
      `Saving user with data: name = ${name}, $id=${id}, roles=${roles}`
    );
    localStorage.setItem(
      "user",
      JSON.stringify({ name: name, id: id, roles: roles })
    );
  }

  async fetchAllUsers() {
    return fetch(server + "/api/user/get-all-users.php")
      .then((res) => res.json())
      .then((data) => {
        let users = data.returned;
        return users;
      });
  }

  async fetchUserById(UiD) {
    this.fetchAllUsers().then((users) => {
      users.forEach((user) => {
        if (user.id === UiD) {
          return user;
        }
      });
      return {
        name: "Deleted Account",
        id: "0",
        roles: ["User"],
      };
    });
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  checkLogin(ctx) {
    if (this.getUser()) {
      console.log("User Logged In");
      return 1;
    } else {
      if (ctx) {
        return 0;
      } else {
        window.location.href = "../../index.html";
      }
    }
  }

  checkAdmin(ctx) {
    if (this.getUser()) {
      console.log("User Logged In");
      return 1;
    } else {
      if (ctx) {
        return 0;
      } else {
        window.location.href = "../../index.html";
      }
    }
  }

  checkReviewer(ctx) {
    if (this.getUser()) {
      console.log("User Logged In");
      return 1;
    } else {
      if (ctx) {
        return 0;
      } else {
        window.location.href = "../../index.html";
      }
    }
  }

  logout() {
    localStorage.removeItem("user");
    window.user = new User();
    newNotification("Successfully Logged out");
    window.location.href = "../../pages/user/login-signup.html";
  }
}

export { User };
