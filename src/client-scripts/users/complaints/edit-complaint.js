let fieldsValues = {
  "complaint-id": null,
  "complaint-title": null,
  "complaint-description": null,
  "complaint-category": null,
  "complaint-created-by": null,
  "complaint-department": null,
  "complaint-private": null,
  "complaint-created-on": null,
  "complaint-feedback": null,
  "complaint-report": null,
};

let offCanvas;

async function editComplaint(id) {
  console.log("Displaying complaint with ID: ", id);
  let complaint = await fetchMyComplaint(id);
  console.log(complaint);
  fieldsValues["complaint-title"] = complaint["title"];
  fieldsValues["complaint-id"] = complaint["id"];
  fieldsValues["complaint-description"] = complaint["description"];

  fieldsValues["complaint-category"] = complaint["CiD"];
  fieldsValues["complaint-created-by"] = complaint["created_by_id"];
  fieldsValues["complaint-department"] = complaint["DiD"];
  fieldsValues["complaint-private"] = complaint["is_private"];
  fieldsValues["complaint-created-on"] = complaint["created_on"];
  fieldsValues["complaint-feedback"] = complaint["feedback"];
  fieldsValues["complaint-report"] = complaint["report"];

  newCanvas(complaint);
}

async function fetchMyComplaint(id) {
  newNotification("Starting to display your complaints");
  console.log("Fetching your complaints");
  newNotification("Fetching your complaints");

  startLoading();

  let userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);
  let user_id = userData.id;

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  };

  return fetch(`${server}/api/complaints/get-my-complaints.php`, request)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      startLoading();
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
      } else {
        let complaints = data.returned;
        let complaint = complaints.filter((item) => item.id == id);
        newNotification(`${complaint[0].title} Complaint fetched successfully`);
        return complaint[0];
      }
    });
}

async function fetchComplaintOld(CiD) {
  console.log("Fetching complaint with id: ", CiD);
  newNotification("Fetching complaint with id: " + CiD);

  startLoading();

  let userData = JSON.parse(localStorage.getItem("user")) || null;
  console.log(userData);
  let isAdmin = false;
  if (
    userData &&
    userData.hasOwnProperty("roles") &&
    userData.roles.includes("admin")
  ) {
    isAdmin = true;
  }

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_admin: isAdmin,
    }),
  };

  return fetch(server + "/api/complaints/get-complaints.php")
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
        return null; // Return null or handle error appropriately
      } else {
        let complaints = data.returned;
        let complaint = complaints.filter((item) => item.id == CiD);
        newNotification(`${complaint[0].title} Complaint fetched successfully`);
        return complaint[0];
      }
    });
}

async function newCanvas(complaint) {
  console.log("Displaying complaint: ", complaint);

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
                <h5 class="offcanvas-title" id="offcanvasTopLabel">Complaint Details</h5>
                
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
               POPULATE EDIT COMPLAINT FORM
  
              <div class="mx-auto w-fit">
                  <button class="btn btn-success wd-40 m-2 d-inline -block m-md-2 " type="button" onclick="saveComplaint()">Save Changes</button>
                  <button class="btn btn-danger wd-40 m-2 d-inline -block m-md-2 " onclick="deleteComplaint()">Delete Complaint</button>
              </div>
    
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

function saveComplaint() {
  offCanvas.hide();
  newNotification("start saving complaint");
  startLoading();

  let requestData = {
    title: fieldsValues["complaint-title"],
    description: fieldsValues["complaint-description"],
    id: fieldsValues["complaint-id"],
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  };

  fetch(server + "/api/complaints/update-complaint.php", request)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status == "error") {
        newNotification("An Error occurred Unexpectedly");
        data.errors.forEach((error) => {
          newNotification(error.details);
        });
      } else {
        newNotification("Complaint Updated Successfully.");
        stopLoading();
        window.location.reload();
      }
    });
}
