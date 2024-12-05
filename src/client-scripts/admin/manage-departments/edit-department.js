window.fieldsValues = {
  "department-name": null,
  "department-description": null,
  "department-head": null,
  "department-id": null,
};

let offCanvas;

async function editDepartment(id) {
  console.log("Displaying department with ID: ", id);
  let department = await fetchDepartment(id);
  window.fieldsValues["department-name"] = department.name;
  window.fieldsValues["department-description"] = department.description;
  window.fieldsValues["department-head"] = department.head;
  window.fieldsValues["department-id"] = department.id;
  newCanvas(department);
}

async function fetchDepartment(DiD) {
  console.log("Fetching department with id: ", DiD);
  newNotification("Fetching department with id: " + DiD);
  startLoading();
  return fetch(server + "/api/departments/get-departments.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
        return null; // Return null or handle error appropriately
      } else {
        let departments = data.returned;
        let department = departments.filter((item) => item.id == DiD);
        newNotification(
          `${department[0].name} Department fetched successfully`
        );
        return department[0];
      }
    });
}

async function newCanvas(department) {
  console.log("Displaying department: ", department);

  let div;
  if (!document.getElementById("offcanvas-parent")) {
    div = document.createElement("div");
    div.id = "offcanvas-parent";

    document.body.appendChild(div);
  } else {
    div = document.getElementById("offcanvas-parent");
  }

  let offCanvasBody = `
    <div id="off-canvas" class="offcanvas show offcanvas-top h-100" tabindex="-1" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header border border-warning">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">Edit Department ${
              department.name
            }</h5>
            
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">

            <p class="">Name
                <input onchange="setFieldValues(event)" class="m-2 p-2" type="text" id="department-name" value="${
                  department.name
                }" /> 
            </p>

            <p class="department-desc">Description        
                <textarea onchange="setFieldValues(event)" id="department-description" class="w-100 m-2 p-2" rows="10">${
                  department.description
                }</textarea>
            </p>

            <p class="department-head">Head Of Department
                <select onchange="setFieldValues(event)" class="m-2 p-2 w-50" id="department-head">
                  <option value="">Empty Slot</option>
                    ${await renderUserNames(department.head)}
                </select>
            </p>

            <div class="mx-auto w-fit">
                <button class="btn btn-success wd-40 m-2 d-inline -block m-md-2 " type="button" onclick="saveDepartment()">Save Changes</button>
                <button class="btn btn-danger wd-40 m-2 d-inline -block m-md-2 " onclick="deleteDepartment()">Delete Department</button>
            </div>
        </div>
    </div>
`;

  div.innerHTML = offCanvasBody;

  offCanvas = new bootstrap.Offcanvas(document.getElementById("off-canvas"));

  offCanvas.show();

  //  Set department head name in the form
  document.getElementById("department-head").value = department.head || "";

  //   console.log(fields);
}

async function renderUserNames() {
  let options = [];
  return fetch(server + "/api/user/get-all-users.php")
    .then((res) => res.json())
    .then((data) => {
      let users = data.returned;
      users.forEach((user) => {
        options.push(`
            <option class="m-2" value='${user.id}'>
            ${user.name}\n
            ${user.id}
            </option>`);
      });
      return options.join("\n");
    });
}

function saveDepartment() {
  offCanvas.hide();
  newNotification("start saving department");
  startLoading();

  let requestData = {
    name: window.fieldsValues["department-name"],
    description: window.fieldsValues["department-description"],
    head: window.fieldsValues["department-head"],
    id: window.fieldsValues["department-id"],
  };

  let department = new Department();
  department.editDepartment(requestData);
}

/** Things to be done
 * ✅ Assign reference to form field elements to the keys in fields object.
 * ✅ Write logic for saveDepartment()
 * ✅ Write logic for renderUserNames()
 */

/** logic for saveDepartment()
 * ✅ Get values from form fields.
 * ✅ Hide offcanvas from document.
 * ✅ Show loading div
 * ✅ Update department with new values in database.
 */

export { editDepartment, saveDepartment };
