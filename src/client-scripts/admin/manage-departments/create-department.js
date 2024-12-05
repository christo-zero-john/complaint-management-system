console.log("Create department script loaded successfully");

window.fieldsValues = {
  "department-name": null,
  "department-description": null,
  "department-head": null,
};

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
      head: "",
    };
    let department = new Department();
    department.newDepartment(data);
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

export { createDepartment };
