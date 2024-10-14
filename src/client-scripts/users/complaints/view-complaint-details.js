async function viewComplaintDetails(id) {
  let complaint = await fetchComplaint(id);
  newNotification(`Displaying complaint: ${complaint.title}`);

  openModal(complaint);
}

async function fetchComplaint(CiD) {
  console.log("Fetching complaint with id: ", CiD);
  newNotification("Fetching complaint with id: " + CiD);
  startLoading();

  let userData = JSON.parse(localStorage.getItem("user"));
  let isAdmin = false;
  if (userData.hasOwnProperty("roles") && userData.roles.includes("admin")) {
    isAdmin: true;
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
        let complaint = complaints.filter((item) => item.id == CiD);
        newNotification(`Complaint fetched successfully`);
        stopLoading();

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

  let offCanvasBody = `
        <div id="off-canvas" class="offcanvas show offcanvas-top h-100" tabindex="-1" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header border border-warning">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">Complaint Details</h5>
                
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                ${
                  (complaint["is_private"] == 1 &&
                    '<p class="w-fit p-2 px-4 border rounded border-danger text-danger"> Private Complaint</p>') ||
                  (complaint["is_private"] == 0 &&
                    `<p class="w-fit p-2 px-4 border rounded border-success text-success"> Public Complaint</p>`)
                }

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
                ${
                  (complaint.status == 0 &&
                    '<p class="text-warning">Not Yet Noted By the Reviewer</p>') ||
                  (complaint.status == 1 &&
                    '<p class="text-primary">Complaint Noted By the Reviewer and is in the process of resolving</p>') ||
                  (complaint.status == 2 &&
                    '<p class="text-success">Complaint Resolved By the Reviewer</p>') ||
                  (complaint.status == 3 &&
                    '<p class="text-danger">Rejected</p>')
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

                <p class="complaint-desc">
                    
                ${
                  (complaint.created_by_id == userData.id) &&
                  `<button type='button' onclick='editComplaint(${complaint.id})' class='btn btn-primary float-end'>Edit Complaint</button>`
                }
                </p>
    
            </div>
        </div>
    `;

  div.innerHTML = offCanvasBody;

  offCanvas = new bootstrap.Offcanvas(document.getElementById("off-canvas"));

  offCanvas.show();

  //   console.log(fields);
}