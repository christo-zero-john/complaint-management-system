console.log("View Departments script connected loaded successfully");

viewDepartments();

function viewDepartments() {
  newNotification("Starting to display all departments");
  console.log("Fetching all departments");
  newNotification("Fetching all departments");

  /**
   * @var server is declared create-department.js
   */

  fetch(server + "/api/departments/get-departments.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
      } else {
        newNotification("Departments fetched successfully");
        let departments = data.returned;
        departments.forEach((department) => {
          let adjustedDescription = department.description.split(" ");
          adjustedDescription = adjustedDescription.splice(0, 20);
          adjustedDescription = adjustedDescription.join(" ");
          adjustedDescription += "...";
          //   console.log(adjustedDescription);
          document.getElementById("departments").innerHTML += `     
            <div class="department card" onclick="editDepartment('${
              department.id
            }')">
                <h3 class="name">${department.name}</h3>
                <p class="desc">${adjustedDescription}</p>
                <p class="head"><b>HOD</b>: ${
                  department.head || "Empty Slot"
                }</p>
            </div>
          `;
        });
      }
    });
}
