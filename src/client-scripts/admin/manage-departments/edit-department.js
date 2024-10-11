let fieldsValues = {
  "department-name": null,
  "department-description": null,
  "department-head": null,
  "department-id": null,
};

let offCanvas;

async function editDepartment(id) {
  console.log("Displaying department with ID: ", id);
  let department = await fetchDepartment(id);
  newCanvas(department);
}

async function fetchDepartment(DiD) {
  console.log("Fetching department with id: ", DiD);
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
        newNotification("Departments fetched successfully");
        let departments = data.returned;
        let department = departments.filter((item) => item.id == DiD);
        return department[0];
      }
    });
}

function newCanvas(department) {
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
                    <option value="">${department.head || "Empty Slot"}</option>
                    ${renderUserNames(department.head)}
                </select>
            </p>

            <button class="btn btn-success" type="button" onclick="saveDepartment()">Save</button>
        </div>
    </div>
`;

  div.innerHTML = offCanvasBody;

  offCanvas = new bootstrap.Offcanvas(document.getElementById("off-canvas"));

  offCanvas.show();

  //   console.log(fields);
}

function setFieldValues(event) {
  console.log("Updating fieldsValues");
  fieldsValues[event.target.id] = event.target.value;
  console.log("fieldsValues changed: ", fieldsValues);
}

function renderUserNames(departmentHead) {
  return "<option>Christo John</option>";
}

function saveDepartment() {
  newNotification("start saving department");
  offCanvas.hide();
  startLoading();

  let requestData = {
    name: fieldsValues["department-name"],
    description: fieldsValues["department-description"],
    head: fieldsValues["department-head"],
    id: fieldsValues["department-id"],
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  };

  fetch();
}

function startLoading() {
  console.log("started loading");
  let loadingDiv;
  if (!document.getElementById("loading-div")) {
    loadingDiv = document.createElement("div");
    loadingDiv.id = "loading-div";
    loadingDiv.innerHTML = "Loading div";
    document.body.appendChild(loadingDiv);
  } else {
    loadingDiv = document.getElementById("loading-div");
  }
  loadingDiv.classList.add("show-loading");
}

function stopLoading() {
  console.log("started loading");
  let loadingDiv = document.getElementById("loading-div");

  loadingDiv.classList.remove("show-loading");
}

/** Things to be done
 * ✅ Assign reference to form field elements to the keys in fields object.
 * Write logic for saveDepartment()
 * Write logic for renderUserNames()
 */

/** logic for saveDepartment()
 * ✅ Get values from form fields.
 * ✅ Hide offcanvas from document.
 * ✅Show loading div
 *  Update department with new values in database.
 */
