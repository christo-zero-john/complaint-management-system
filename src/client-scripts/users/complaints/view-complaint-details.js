async function viewComplaintDetails(id, context) {
  let complaint = await fetchComplaint(id, context);

  if (complaint.hasOwnProperty("title")) {
    newNotification(`Displaying complaint: ${complaint.title}`);

    openModal(complaint);
  }
  else {
    newNotification("No Complaint to display");
  }
}

async function fetchComplaint(CiD, context) {
  console.log("Fetching complaint with id: ", CiD, " In context of: ", context);

  newNotification("Fetching complaint with id: " + CiD + " in context of: ", context);
  startLoading();

  let userData = JSON.parse(localStorage.getItem("user")) || {
    id: "",
    roles: [],
  };

  let requestBody = {};

  switch (context) {
    case "my-complaints": {
      console.log("Fetching my complaint");
      if (userData.hasOwnProperty("roles") && userData.roles.includes("admin")) {
        requestBody.is_admin = true;
      } else {
        requestBody.is_admin = false;
      }
      requestBody.
        break;
    }
    case "all-complaints": {
      console.log("Fetching all complaint.");
      if (userData.hasOwnProperty("roles") && userData.roles.includes("admin")) {
        requestBody.is_admin = true;
      } else {
        requestBody.is_admin = false;
      }
      break;
    }

  }

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  // Nested async promises. First fetches the complaint then fetches the complaint category and at last fetches the complaint department.
  return fetch(server + "/api/complaints/get-complaints.php", request)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
        return null; // Return null or handle error appropriately
      } else {
        let complaints = data.returned;

        console.log(complaints);
        let complaint = complaints.filter((item) => item.id == CiD);
        newNotification(`Complaint fetched successfully`);
        stopLoading();

        if (complaint.length > 0) {
          return fetchCategory(complaint[0].CiD).then((category) => {
            complaint[0].category = category.name;

            return fetchDepartment(complaint[0].DiD).then((department) => {
              complaint[0].department = department.name;

              return getUserById(complaint[0].created_by_id).then((data) => {
                complaint[0].createdBy = data.name;
                return complaint[0];
              });
            });
          });
        } else {
          newNotification("Complaint not found in database");
        }
      }
    });
}

async function openModal(complaint) {
  console.log("Displaying complaint: ", complaint);

  let div;
  if (!document.getElementById("offcanvas-parent")) {
    div = document.createElement("div");
    div.id = "offcanvas-parent";

    document.body.appendChild(div);
  } else {
    div = document.getElementById("offcanvas-parent");
  }

  let userData = JSON.parse(localStorage.getItem("user")) || { id: "" };

  console.log(userData);
  // complaint.status = 4;

  let offCanvasBody = `
        <div id="off-canvas" class="offcanvas show offcanvas-top h-100" tabindex="-1" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header border border-warning">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">Complaint Details</h5>
                
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">         
              <p class="inline-block">
                ${(complaint["is_private"] == 1 &&
      '<span class="w-fit p-2 px-4 border rounded border-danger text-danger"> Private Complaint</span>') ||
    (complaint["is_private"] == 0 &&
      `<span class="w-fit p-2 px-4 border rounded border-success text-success"> Public Complaint</span>`)
    }

                ${(complaint["status"] != 4 &&
      '<span class="w-fit p-2 px-4 border rounded border-success text-success" > Open</span>') ||
    (complaint["status"] == 4 &&
      '<span class="w-fit p-2 px-4 border rounded border-danger text-danger" > Closed</span>')
    }
                </p>

                <p class="fs-1 fw-500">${complaint.title}
                </p>
    
                <p class="complaint-desc">
                    <p class="fw-700">        
                    Details
                    </p> 
                ${complaint.description}
                </p>

                <p class="complaint-desc">
                    <span class="fw-700">        
                    Category
                    </span> 
                ${complaint.category || "Not Specified"}
                </p>

                <p class="complaint-desc">
                    <span class="fw-700">        
                    Department
                    </span> 
                ${complaint.department || "Not Specified"}
                </p>

                <p class="complaint-desc">
                    <span class="fw-700">        
                    Created By 
                    </span> 
                ${complaint.createdBy || "Creator Not Found"}
                </p>

                <p class="fw-700">        
                Complaint Status
                ${(complaint.status == 0 &&
      '<p class="text-warning">Not Yet Noted By the Reviewer</p>') ||
    (complaint.status == 1 &&
      '<p class="text-primary">Complaint Noted By the Reviewer and is in the process of resolving</p>') ||
    (complaint.status == 2 &&
      '<p class="text-success">Complaint Resolved By the Reviewer</p>') ||
    (complaint.status == 3 &&
      '<p class="text-danger">Rejected</p>') ||
    (complaint.status == 4 &&
      '<p class="text-primary">Complaint Closed</p>')
    }
                
                <p class="complaint-desc">
                    <span class="fw-700">        
                    Created On
                    </span> 
                ${complaint.created_on.split("-").reverse().join("-")}
                </p>

                <p class="complaint-desc">
                    <p class="fw-700">        
                    Feedback From ${complaint.createdBy}
                    </p> 
                ${complaint.feedback}
                </p>

                
                <p class="complaint-desc">
                    <p class="fw-700">        
                    Report of Reviewer
                    </p> 
                ${complaint.report}
                </p>
                    
                ${complaint.created_by_id == userData.id &&
    `<div class="float-end">

                  ${(complaint.status == 4 &&
      "<button type='button' onclick='reOpenComplaint(${complaint.id})' class='btn btn-primary m-2'>Re Open Complaint</button>") ||
    "<button type='button' onclick='closeComplaint(${complaint.id})' class='btn btn-primary m-2'>Close Complaint</button>"
    }
                    
                    <button type='button' onclick='editComplaint(${complaint.id})' class='btn btn-success m-2'>Edit Complaint</button>

                    <button type='button' onclick='deleteComplaint(${complaint.id})' class='btn btn-danger m-2'>Delete Complaint</button>
                  </div>
                  `
    }
    
            </div>
        </div>
    `;

  div.innerHTML = offCanvasBody;

  offCanvas = new bootstrap.Offcanvas(document.getElementById("off-canvas"));

  offCanvas.show();

  //   console.log(fields);
}
