class Department {
  constructor(name, description, head) {
    this.name = name;
    this.description = description;
    this.head = head;
  }

  setDepartmentForm() {
    window.fieldsValues = {
      "department-name": null,
      "department-description": null,
      "department-head": null,
    };
  }

  newDepartment(department) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    };

    console.log("Creating new department with data: ", request);
    fetch(`${server}/api/departments/new-department.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // If some error occurred, handle error
        if (data.status === "error") {
          data.errors.forEach((error) => {
            // If error is department already exists
            if (error.message === "Department Already Exists") {
              newNotification("Department already exists.");
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
          newNotification("Department created successfully.");
          window.location.reload();
        }
      });
  }

  editDepartment(department) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    };

    fetch(server + "/api/departments/update-department.php", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("An Error occurred Unexpectedly");
          data.errors.forEach((error) => {
            newNotification(error.details);
          });
        } else {
          newNotification("Department Updated Successfully.");
          stopLoading();
          window.location.reload();
        }
      });
  }

  viewDepartments() {
    newNotification("Starting to display all departments");
    console.log("Fetching all departments");
    newNotification("Fetching all departments");

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

  deleteDepartment() {
    newNotification("Started Deleting Department");
    let requestData = {
      id: window.fieldsValues["department-id"],
    };

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    fetch(`${server}/api/departments/delete-department.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("Some Unexpected Error Occurred");
          data.errors.forEach((error) => {
            newNotification(error.details, 30000);
          });
        } else {
          newNotification("Department <b>Deleted Successfully</b>");
          window.location.reload();
        }
      });
  }
}

export { Department };
