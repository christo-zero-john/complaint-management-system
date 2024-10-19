console.log("View Complaints script connected loaded successfully");

// Check if server is defined
if (typeof server === "undefined") {
  var server = "http://localhost/Complaint%20Management%20System/backend";
}

viewComplaints();

async function viewComplaints() {
  newNotification("Starting to display all complaints");
  console.log("Fetching all complaints");
  newNotification("Fetching all complaints");

  startLoading();

  let userData = JSON.parse(localStorage.getItem("user")) || null;
  console.log(userData);
  let isAdmin = false;
  let userId = "";

  if (userData) {
    if (userData.hasOwnProperty("roles") && userData.roles.includes("admin")) {
      isAdmin = true;
      userId = userData.id;
    }
  }

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_admin: isAdmin,
      user_id: userId,
    }),
  };

  fetch(`${server}/api/complaints/get-complaints.php`, request)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      startLoading();
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
      } else {
        newNotification("Complaints fetched successfully");
        let complaints = data.returned;

        document.getElementById(
          "total-complaints"
        ).innerHTML = `<p class="text-center fs-3  fw-100 text-primary">Total Found ${complaints.length}</p>`;

        complaints.forEach((complaint) => {
          let adjustedDescription = complaint.description.split(" ");
          adjustedDescription = adjustedDescription.splice(0, 40);
          adjustedDescription = adjustedDescription.join(" ");
          adjustedDescription += "...";

          // complaint.status = 4;

          document.getElementById("complaints").innerHTML += `     
            <div class="department card col-10 col-sm-9 col-md-5 my-2 mx-md-2 py-3 hover-scale-11 transition-04" onclick="viewComplaintDetails('${
              complaint.id
            }', 'all-complaints')">
                <h3 class="title">${complaint.title}</h3>
                <p class="desc small">${adjustedDescription}</p>

              <p class="inline-block">
                ${
                  (complaint["is_private"] == 1 &&
                    '<span class="w-fit py-1 px-4 border rounded border-danger text-danger" > Private</span>') ||
                  (complaint["is_private"] == 0 &&
                    '<span class="w-fit py-1 px-4 border rounded border-success text-success" > Public</span>')
                }

                ${
                  (complaint["status"] != 4 &&
                    '<span class="w-fit py-1 px-4 border rounded border-success text-success" > Open</span>') ||
                  (complaint["status"] == 4 &&
                    '<span class="w-fit py-1 px-4 border rounded border-danger text-danger" > Closed</span>')
                }
              </p>

                <p class="text-start inline-block">
                  ${complaint.created_on.split("-").reverse().join("-")}
                </p>

                <p class="">
                ${
                  (complaint.status == 0 &&
                    '<p class="text-warning">Not Tracked</p>') ||
                  (complaint.status == 1 &&
                    '<p class="text-primary">On Track</p>') ||
                  (complaint.status == 2 &&
                    '<p class="text-success">Resolved</p>') ||
                  (complaint.status == 3 &&
                    '<p class="text-danger">Rejected</p>')
                }
                </p>
            </div>
          `;
        });
      }
    });
}
