class Complaint {
  async newComplaint(complaint) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaint),
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

  async editComplaint(complaintRef) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaintRef),
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

  async viewMyComplaints(user_id) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    };

    fetch(`${server}/api/complaints/get-my-complaints.php`, request)
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

          let displayEl =
            document.getElementById("my-complaints") ||
            document.getElementById("complaints");
          displayEl.innerHTML = "";

          complaints.forEach((complaint) => {
            let adjustedDescription = complaint.description.split(" ");
            adjustedDescription = adjustedDescription.splice(0, 40);
            adjustedDescription = adjustedDescription.join(" ");
            adjustedDescription += "...";

            displayEl.innerHTML += `     
            <div class="department card col-10 col-sm-9 col-md-5 my-2 mx-md-2 py-3 hover-scale-11 transition-04" onclick="viewComplaintDetails('${
              complaint.id
            }', 'my-complaints')">
                <h3 class="title">${complaint.title}</h3>
                <p class="desc small">${adjustedDescription}</p>

              <p class="inline-block">
                ${
                  (complaint["is_private"] == 1 &&
                    '<p class="w-fit py-1 px-4 border rounded border-danger text-danger" > Private</p>') ||
                  (complaint["is_private"] == 0 &&
                    '<p class="w-fit py-1 px-4 border rounded border-success text-success" > Public</p>')
                }
              </p>

                <p class="text-start inline-block">
                  ${complaint.created_on.split("-").reverse().join("-")}
                </p>

                <p class="">
                ${
                  (complaint.status == 0 &&
                    '<p class="text-warning">Not Seen</p>') ||
                  (complaint.status == 1 &&
                    '<p class="text-primary">Processing</p>') ||
                  (complaint.status == 2 &&
                    '<p class="text-success">Resolved</p>') ||
                  (complaint.status == 3 &&
                    '<p class="text-danger">Rejected</p>') ||
                  (complaint.status == 4 && '<p class="text-danger">Closed</p>')
                }
                </p>
            </div>
          `;
          });
        }
      });
  }

  async closeComplaint(Cdata) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Cdata),
    };

    console.log("Closing Complaint with: ", request);

    fetch(`${server}/api/complaints/status/close-complaint.php`, request)
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("Some Unexpected Error Occurred");
          data.errors.forEach((error) => {
            newNotification(error.details, 30000);
          });
        } else {
          newNotification("Complaint <b>Closed Successfully</b>");
          window.location.reload();
        }
      });
  }

  async deleteComplaint(Cdata) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Cdata),
    };

    console.log("Deleting Complaint with: ", request);

    fetch(`${server}/api/complaints/delete-complaint.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("Some Unexpected Error Occurred");
          data.errors.forEach((error) => {
            newNotification(error.details, 30000);
          });
        } else {
          newNotification("Complaint <b>Deleted Successfully</b>");
          window.location.reload();
        }
      });
  }

  async reOpenComplaint(Cdata) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Cdata),
    };

    console.log("Re Opening Complaint with: ", request);

    fetch(`${server}/api/complaints/status/reopen-complaint.php`, request)
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("Some Unexpected Error Occurred");
          data.errors.forEach((error) => {
            newNotification(error.details, 30000);
          });
        } else {
          newNotification("Complaint <b>Re Opened Successfully</b>");
          window.location.reload();
        }
      });
  }

  async viewComplaintDetails(isAdmin, CiD) {
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

  async viewComplaints(isAdmin, userId) {
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
}

export { Complaint };
