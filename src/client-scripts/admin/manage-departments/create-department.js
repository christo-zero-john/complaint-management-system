console.log("Create department script loaded successfully");

const server = "http://localhost/Complaint%20Management%20System/backend";

let fields = {
  "department-name": document.getElementById("department-name"),
  "department-description": document.getElementById("department-description"),
};

function createDepartment(event) {
  // Prevent default form submission
  event.preventDefault();

  let departmentName = fields["department-name"].value;
  let departmentDescription = fields["department-description"].value;

  let missingFields = [];
  if (!departmentName) {
    missingFields.push("Name");
    fields["department-name"].classList.add("empty-field");
  }

  if (!departmentDescription) {
    missingFields.push("Description");
    fields["department-description"].classList.add("empty-field");
  }

  // If some field values are missing notify that.
  if (missingFields.length > 0) {
    newNotification(`${missingFields.join(", ")} missing`);
  }
  // If all field values are received, send the data to the server.
  else {
    let data = {
      name: departmentName,
      description: departmentDescription,
    };

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
}

// Event Listners
/**
 * 1. When an input field is focused, remove empty-fields class from that field if it has the class empty-field.
 * empty-field class is added to the element if the field value is null when create department is clicked.
 * This event listner is used to remove the class when the field is clicked again once the field is focused again.
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
