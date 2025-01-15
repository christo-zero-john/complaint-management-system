console.log("Create complaint script loaded successfully");

let fields = {
  "complaint-title": document.getElementById("complaint-title"),
  "complaint-description": document.getElementById("complaint-description"),
  "complaint-assign-to": document.getElementById("complaint-assign-to"),
  "complaint-category": document.getElementById("complaint-category"),
  "complaint-department": document.getElementById("complaint-department"),
  "complaint-private": document.getElementById("complaint-private"),
};

function createComplaint(event) {
  // Prevent default form submission
  event.preventDefault();

  let complaintTitle = fields["complaint-title"].value;
  let complaintDescription = fields["complaint-description"].value;
  let complaintCategory = fields["complaint-category"].value;
  let complaintDepartment = fields["complaint-department"].value;
  let complaintIsPrivate = fields["complaint-private"].checked;
  let complaintAssignedTo = fields["complaint-assign-to"].value;

  let missingFields = [];
  if (!complaintTitle) {
    missingFields.push("Title");
    fields["complaint-title"].classList.add("empty-field");
  }

  if (!complaintDescription) {
    missingFields.push("Description");
    fields["complaint-description"].classList.add("empty-field");
  }

  if (!complaintCategory) {
    missingFields.push("Category");
    fields["complaint-category"].classList.add("empty-field");
  }

  if (!complaintDepartment) {
    missingFields.push("Department");
    fields["complaint-department"].classList.add("empty-field");
  }

  if (!complaintAssignedTo) {
    missingFields.push("Assignee/Complaint Reviewer");
    fields["complaint-department"].classList.add("empty-field");
  }

  // If some field values are missing notify that.
  if (missingFields.length > 0) {
    newNotification(`${missingFields.join(", ")} missing`);
  }
  // If all field values are received, send the data to the server.
  else {
    let userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);

    let data = {
      title: complaintTitle,
      description: complaintDescription,
      category: complaintCategory,
      department: complaintDepartment,
      private: complaintIsPrivate,
      createdBy: userData.id,
      created_on: getToday(),
      assignee: complaintAssignedTo,
    };

    let complaint = new window.Complaint();
    console.log("Creating complaint with data: ", data);
    complaint.newComplaint(data);
  }
}

// Fetch department and fetch categories are called from the new-complaint.html
async function fetchCategories() {
  newNotification("Fetching all categories");

  return fetch(`${server}/api/categories/get-categories.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
      } else {
        newNotification("Categories fetched successfully");
        let categories = data.returned;

        newNotification("Setting Category options");

        return categories;
      }
    });
}

async function fetchDepartments() {
  newNotification("Fetching all departments");

  return fetch(`${server}/api/departments/get-departments.php`)
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

        newNotification("Setting Department options");

        return departments;
      }
    });
}

async function fetchRoles() {
  let roles = await window.role.getAllRoles();
  fields[
    "complaint-assign-to"
  ].innerHTML = ` <option value="">Choose Assignee</option>`;

  roles.forEach((role) => {
    // console.log(role);
    let excludedRoles = ["User", "Admin"];
    if (!excludedRoles.includes(role.name)) {
      fields[
        "complaint-assign-to"
      ].innerHTML += ` <option value="${role.id}">${role.name}</option>`;
    }
  });
}

function getToday() {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let year = today.getFullYear();
  return year + "-" + month + "-" + day;
}

// Event Listners
/**
 * 1. When an input field is focused, remove empty-fields class from that field if it has the class empty-field.
 * empty-field class is added to the element if the field value is null when create complaint is clicked.
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

export { createComplaint, fetchCategories, fetchDepartments, fetchRoles };
