console.log("View Departments script connected loaded successfully");

function viewDepartments() {
  newNotification("Starting to display all departments");
  console.log("Fetching all departments");
  newNotification("Fetching all departments");

  /**
   * @var server is declared create-department.js
   */

  fetch(`${server}/api/departments/get-departments.php`)
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
          adjustedDescription = adjustedDescription.splice(0, 10);
          adjustedDescription = adjustedDescription.join(" ");
          adjustedDescription += "...";

          getUserById(department.head).then((data) => {
            let departmentHeadName = "";
            if (data) {
              departmentHeadName = data.name;
            }
            // console.log(departmentHeadName);
            document.getElementById("departments").innerHTML += `     
            <div class="department card col-10 col-sm-9 col-md-5 my-2 mx-md-2 py-3 hover-scale-11 transition-04" onclick="editDepartment('${
              department.id
            }')">
                <h3 class="name">${department.name}</h3>
                <p class="desc small">${adjustedDescription}</p>
                <p class="head border-bottom border-end rounded border-info w-fit p-2 border-2 hover-scale-11 transition-04"><b>HOD</b>: ${
                  departmentHeadName || "Empty Slot"
                }</p>
            </div>
          `;
          });

          //   console.log(adjustedDescription);
        });
      }
    });
}

export { viewDepartments };
