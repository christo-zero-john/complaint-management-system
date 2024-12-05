class Role {
  newRole(role) {
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

  editRole(role) {
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

  viewRoles() {
    newNotification("Fetching all roles");

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

          roles.forEach((role) => {
            let adjustedDescription = role.description.split(" ");
            adjustedDescription = adjustedDescription.splice(0, 40);
            adjustedDescription = adjustedDescription.join(" ");
            adjustedDescription += "...";

            document.getElementById("roles").innerHTML += `     
              <div class="department card col-10 col-sm-9 col-md-5 my-2 mx-md-2 py-3 hover-scale-11 transition-04" onclick="editRole('${role.id}')">
                  <h3 class="name">${role.name}</h3>
                  <p class="desc small">${adjustedDescription}</p>
              </div>
            `;
          });
        }
      });
  }

  deleteRole(roleId) {
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
}

export { Role };
