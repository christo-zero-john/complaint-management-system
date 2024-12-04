console.log("Create role script loaded successfully");

let fields = {
  "role-name": document.getElementById("role-name"),
  "role-description": document.getElementById("role-description"),
};

function createRole(event) {
  // Prevent default form submission
  event.preventDefault();

  let roleName = fields["role-name"].value;
  let roleDescription = fields["role-description"].value;

  let missingFields = [];
  if (!roleName) {
    missingFields.push("Name");
    fields["role-name"].classList.add("empty-field");
  }

  if (!roleDescription) {
    missingFields.push("Description");
    fields["role-description"].classList.add("empty-field");
  }

  // If some field values are missing notify that.
  if (missingFields.length > 0) {
    newNotification(`${missingFields.join(", ")} missing`);
  }
  // If all field values are received, send the data to the server.
  else {
    let data = {
      name: roleName,
      description: roleDescription,
    };

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  if (element) {
    element.onfocus = (e) => {
      if (e.target.classList.contains("empty-field")) {
        e.target.classList.remove("empty-field");
      }
    };
  }
});

export { createRole };
