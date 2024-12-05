window.fieldsValues = {
  "role-name": null,
  "role-description": null,
  "role-id": null,
};

let offCanvas;

async function editRole(id) {
  console.log("Displaying role with ID: ", id);
  let role = await fetchRole(id);
  window.fieldsValues["role-name"] = role.name;
  window.fieldsValues["role-description"] = role.description;
  window.fieldsValues["role-id"] = role.id;
  newCanvas(role);
}

async function fetchRole(RiD) {
  console.log("Fetching role with id: ", RiD);
  newNotification("Fetching role with id: " + RiD);
  startLoading();
  return fetch(server + "/api/roles/get-roles.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
        return null; // Return null or handle error appropriately
      } else {
        let roles = data.returned;
        let role = roles.filter((item) => item.id == RiD);
        newNotification(`${role[0].name} Role fetched successfully`);
        return role[0];
      }
    });
}

async function newCanvas(role) {
  console.log("Displaying role: ", role);

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
                <h5 class="offcanvas-title" id="offcanvasTopLabel">Edit Role ${role.name}</h5>
                
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
    
                <p class="">Name
                    <input onchange="setFieldValues(event)" class="m-2 p-2" type="text" id="role-name" value="${role.name}" /> 
                </p>
    
                <p class="role-desc">Description        
                    <textarea onchange="setFieldValues(event)" id="role-description" class="w-100 m-2 p-2" rows="10">${role.description}</textarea>
                </p>
    
                <div class="mx-auto w-fit">
                    <button class="btn btn-success wd-40 m-2 d-inline -block m-md-2 " type="button" onclick="saveRole()">Save Changes</button>
                    <button class="btn btn-danger wd-40 m-2 d-inline -block m-md-2 " onclick="deleteRole()">Delete Role</button>
                </div>
            </div>
        </div>
    `;

  div.innerHTML = offCanvasBody;

  offCanvas = new bootstrap.Offcanvas(document.getElementById("off-canvas"));

  offCanvas.show();

  //   console.log(fields);
}

function saveRole() {
  offCanvas.hide();
  newNotification("start saving role");
  startLoading();

  let requestData = {
    name: window.fieldsValues["role-name"],
    description: window.fieldsValues["role-description"],
    id: window.fieldsValues["role-id"],
  };

  let role = new Role();
  role.editRole(requestData);
}

export { editRole, saveRole };
