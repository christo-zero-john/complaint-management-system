class Role {
  async newRole(role) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(role),
    };

    console.log("Creating new Role with data: ", request);

    fetch(`${server}/api/roles/new-role.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // If some error occurred, handle error
        if (data.status === "error") {
          data.errors.forEach((error) => {
            // If error is Role already exists
            if (error.message === "Role Already Exists") {
              newNotification("Role already exists.");
            }
            // If some unknown or unexpected error occurred.
            else {
              newNotification(
                "Some error occurred unexpectedly." + error.details
              );
            }
          });
        }

        // If server returned status as success, then display success message
        else {
          newNotification("Role created successfully.");
          window.location.reload();
        }
      });
  }

  async editRole(role) {
    console.log("Updating roel with data: ", role);
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(role),
    };

    fetch(server + "/api/roles/update-role.php", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("An Error occurred Unexpectedly");
          data.errors.forEach((error) => {
            newNotification(error.details);
          });
        } else {
          newNotification("Role Updated Successfully.");
          stopLoading();
          window.location.reload();
        }
      });
  }

  async viewRoles() {
    newNotification("Fetching all roles");

    const renderUserNames = (users) => {
      console.log("rendering user names: ", users);
      let html = "";
      users.forEach((user) => {
        console.log(user);
        html += `<div class="user-name"><p>${user.name}</p></div>`;
      });
      return html;
    };

    fetch(`${server}/api/roles/get-roles.php`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "error") {
          data.errors.forEach((error) => {
            newNotification("An unexpected error occurred: " + error.details);
          });
        } else {
          newNotification("Roles fetched successfully");
          let roles = data.returned;
          console.log(roles.length);
          roles.forEach((role) => {
            // console.log(role);
            this.fetchUsersWithRole(role.id).then((users) => {
              document.getElementById("roles").innerHTML += `     
              <tr>
                <td>${
                  role.name
                } <button class="d-block badge bg-none link-primary fw-normal border-0 p-0 my-2" onclick="window.role.addAssignee('${
                role.id
              }')">Add Assignee</button> </td>
                <td>${renderUserNames(users)}</td>                
              </tr>
            `;
            });
          });
        }
      });
  }

  async fetchUsersWithRole(roleId) {
    // console.log("Fetching user with role");

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role_id: roleId }),
    };

    return fetch(`${server}/api/user-roles/get-users-by-role.php`, request)
      .then((res) => res.json())
      .then((data) => {
        if (data.returned.length > 0) {
          console.log(roleId, data);
          return data.returned;
        } else {
          console.log("Not ended");
          return [{ name: "Not Assigned", id: null }];
        }
      });
  }

  async addAssignee(roleId) {
    console.log("Adding new Assignee for role: ", roleId);

    let modalTitle = `Select User to assign Role ${roleId}`;
    let users = await window.user.fetchAllUsers();
    console.log(users);

    let options = ``;

    users.forEach((user) => {
      options += `<option value="${user.id}">${user.name}</option>`;
    });

    let modalContent = `
      <select class="form-select" id="assignee-options">
        ${options}
      </select>
    `;

    const confirmAddAssignee = (roleId) => {
      let user = document.getElementById("assignee-options").value;
      console.log(`setting new role ${roleId} for user ${user}`);
      window.modal.hide();
      newNotification("Setting New Role for User");
      this.setUserRole(roleId, user);
    };

    window.modal.setTitle(modalTitle);
    window.modal.setContent(modalContent);
    window.modal.setCallback(confirmAddAssignee, roleId);
    window.modal.show();
  }

  async setUserRole(roleId, userId) {
    console.log("Setting new role for user: ", userId, " Role: ", roleId);

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, role_id: roleId }),
    };

    fetch(`${server}/api/user-roles/add-assignee.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success") {
          newNotification("New Role Added Successfully");
          window.location.reload();
        } else {
          if (data.errors[0].message == "Role Already Assigned") {
            newNotification("User Already Has This Role");
          } else {
            newNotification("Some unexpected error occurred");
          }
        }
      });
  }

  async deleteRole(roleId) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleId),
    };

    console.log("Deketing Role with: ", request);

    fetch(`${server}/api/roles/delete-role.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("Some Unexpected Error Occurred");
          data.errors.forEach((error) => {
            newNotification(error.details, 30000);
          });
        } else {
          newNotification("Role <b>Deleted Successfully</b>");
          window.location.reload();
        }
      });
  }

  async getAllRoles() {
    console.log("Fetching all roles from database");
    return fetch(`${server}/api/roles/get-roles.php`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "error") {
          data.errors.forEach((error) => {
            newNotification("An unexpected error occurred: " + error.details);
          });
        } else {
          newNotification("Roles fetched successfully");
          let roles = data.returned;
          return roles;
        }
      });
  }
}

export { Role };
