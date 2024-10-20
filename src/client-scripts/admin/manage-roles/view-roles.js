console.log("View roles script connected loaded successfully");

viewRoles();

function viewRoles() {
  newNotification("Starting to display all roles");
  newNotification("Fetching all roles");

  /**
   * @var server is declared create-role.js
   */

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
