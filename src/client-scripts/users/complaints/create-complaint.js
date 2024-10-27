console.log("Create complaint script loaded successfully");

const server = "http://localhost/Complaint%20Management%20System/backend";

fetchCategories();
fetchDepartments();

let fields = {
  "complaint-title": document.getElementById("complaint-title"),
  "complaint-description": document.getElementById("complaint-description"),
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
    };

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    console.log("Creating new complaint with data: ", request);
    fetch(`${server}/api/complaints/new-complaint.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // If some error occurred, handle error
        if (data.status === "error") {
          data.errors.forEach((error) => {
            newNotification(
              "Some error occurred unexpectedly." + error.details
            );
          });
        }

        // If server returned status as success, then display success message
        else {
          newNotification("Complaint created successfully.");
          window.location.reload();
        }
      });
  }
}

function fetchCategories() {
  newNotification("Fetching all categories");

  fetch(`${server}/api/categories/get-categories.php`)
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

        categories.forEach((category) => {
          fields[
            "complaint-category"
          ].innerHTML += ` <option value="${category.id}">${category.name}</option>
          `;
        });
      }
    });
}

function fetchDepartments() {
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

        newNotification("Setting Department options");

        departments.forEach((department) => {
          fields[
            "complaint-department"
          ].innerHTML += ` <option value="${department.id}">${department.name}</option>
          `;
        });
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
  element.onfocus = (e) => {
    if (e.target.classList.contains("empty-field")) {
      e.target.classList.remove("empty-field");
    }
  };
});
