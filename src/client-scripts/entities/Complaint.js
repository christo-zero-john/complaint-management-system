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

  async setEditComplaintForm(complaintId) {
    window.modal.setTitle(`Editing Complaint ${complaintId}`);
    window.modal.setContent(`
        <form class="mx-auto text-center col-md-9" action="" method="">
        <a
          href="./all-complaints.html"
          class="btn btn-success m-2 float-end d-inline"
          >All Complaints</a
        >
        <h1 class="m-2 wd-fit d-inline">Create New Complaint</h1>
        <input
          class="col-10 col-md-12"
          type="text"
          name="name"
          placeholder="name"
          id="complaint-title"
          cols="10"
        /><br />

        <textarea
          name="description"
          class="col-10 col-md-12"
          id="complaint-description"
          placeholder="Description"
          cols="50"
          rows="10"
        ></textarea>

        <p class="text-start fw-500">
          <label for="complaint-category">Category</label>
          <select class="w-25 p-2" name="category" id="complaint-category">
            <option value="">Choose Category</option>
          </select>
        </p>
        <p class="text-start fw-500">
          <label for="complaint-department">Department</label>
          <select class="w-25 p-2" name="department" id="complaint-department">
            <option value="">Choose Department</option>
          </select>
        </p>

        <p class="text-start fw-500">
          <label for="complaint-assign-to">Assign a Reviewer</label>
          <select class="w-25 p-2" name="assign-to" id="complaint-assign-to">
            <option value="">Choose Assignee</option>
          </select>
        </p>

        <p class="text-start fw-500">
          <label for="complaint-private">Make Complaint Private</label>
          <input class="" type="checkbox" id="complaint-private" />
        </p>

        <br />
        <button
          class="btn btn-primary col-10 col-md-12"
          type="button"
          onclick="editComplaint(event)"
        >
          Create New Complaint
        </button>
      </form>
      `);

    setTimeout(() => {
      window.fields = {
        "complaint-title": document.getElementById("complaint-title"),
        "complaint-description": document.getElementById(
          "complaint-description"
        ),
        "complaint-assign-to": document.getElementById("complaint-assign-to"),
        "complaint-category": document.getElementById("complaint-category"),
        "complaint-department": document.getElementById("complaint-department"),
        "complaint-private": document.getElementById("complaint-private"),
      };
      window.fetchCategories().then((categories) => {
        categories.forEach((category) => {
          document.getElementById(
            "complaint-category"
          ).innerHTML += ` <option value="${category.id}">${category.name}</option>
      `;
        });
      });

      window.fetchDepartments().then((departments) => {
        departments.forEach((department) => {
          document.getElementById(
            "complaint-department"
          ).innerHTML += ` <option value="${department.id}">${department.name}</option>
      `;
        });
      });
      setTimeout(() => window.fetchRoles(), 100);
    }, 200);
  }

  async updateComplaint(complaint) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaint),
    };

    console.log("Editing complaint with data: ", request);
    fetch(`${server}/api/complaints/update-complaint.php`, request)
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

          let displayEl = document.getElementById("my-complaints");
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

  async setStatus(CiD, status) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complaint_id: CiD, status: status }),
    };

    console.log(`updating status of complaint ${CiD} as ${status}`);

    fetch(`${server}/api/complaints/status/change-status.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
}

export { Complaint };
