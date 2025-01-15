console.log("View all users script connected loaded successfully");

function viewUserRoles() {
  newNotification("Starting to display all users");
  console.log("Fetching all users");
  newNotification("Fetching all users");

  /**
   * @var server is declared create-user.js
   */

  fetch(`${server}/api/user/get-all-users.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
      } else {
        newNotification("Categories fetched successfully");
        let users = data.returned;

        users.forEach((user) => {
          console.log(user);
          document.getElementById("all-users").innerHTML += `          
            <tr class="">
              <td class="">${user.name}</td>
              <td class="">${user.email}</td>
              <td class="">${user.created_on}</td>
              <td class="">${getUserRoles()}</td>
            </tr>
          `;
        });
      }
    });
}

export { viewUserRoles };
