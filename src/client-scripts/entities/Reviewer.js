class Reviewer {
  constructor() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.name = user.name;
      this.id = user.id;
      if (user.roles.includes()) {
        this.role = true;
      } else {
        this.role = false;
      }
    } else {
      this.name = "Log In First";
      this.id = null;
      this.role = false;
    }
  }

  assignedComplaints() {
    console.log("assignedComplaints");
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: this.id }),
    };

    fetch(`${server}/api/assignments/get-assigned-complaints.php`, request)
      .then((res) => res.json())
      .then((data) => {
        let complaints = data.returned;
        console.log(complaints);
        let html = "";
        complaints.forEach((complaint) => {
          if (complaint) {
            html += `
          <tr onclick="window.reviewer.viewComplaint(${complaint.id})">
            <td>${complaint.title}</td>
            <td>${complaint.created_on}</td>
            <td>${complaint.created_by_id}</td>
            <td>${
              (complaint.status == 0 && "Not Yet Noted") ||
              (complaint.status == 1 && "Noted") ||
              (complaint.status == 2 && "Resolved") ||
              (complaint.status == 3 && "Rejected") ||
              (complaint.status == 4 && "Closed")
            }</td>
          </tr>`;
          }
        });
        document.getElementById("reviewer-table").innerHTML = html;
      });
  }

  resolvedComplaints() {
    console.log("Resolved Complaints");
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: this.id }),
    };

    fetch(`${server}/api/assignments/get-assigned-complaints.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let complaints = data.returned;
        let html = "";
        complaints.forEach((complaint) => {
          if (complaint && complaint.status == 2) {
            html += `
          <tr onclick="window.reviewer.viewComplaint(${complaint.id})">
            <td>${complaint.title}</td>
            <td>${complaint.created_on}</td>
            <td>${complaint.created_by_id}</td>
            <td>${
              (complaint.status == 0 && "Not Yet Noted") ||
              (complaint.status == 1 && "Noted") ||
              (complaint.status == 2 && "Resolved") ||
              (complaint.status == 3 && "Rejected") ||
              (complaint.status == 4 && "Closed")
            }</td>
          </tr>`;
          }
        });
        document.getElementById("reviewer-table").innerHTML = html;
      });
  }

  async forwardComplaint(complaintId) {
    console.log("Forward Complaint");
    window.modal.setTitle("Choose another reviewer");
    let roles = await window.role.getAllRoles();
    let options = ` <option value="">Choose Assignee</option>`;

    // -------------------------------------
    const confirmForwardComplaint = () => {
      let assignee = document.getElementById("get-forward-assignee").value;
      console.log(assignee);
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complaint_id: complaintId,
          assignee_id: assignee,
        }),
      };
      fetch(`${server}/api/assignments/change-assignee.php`, request)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status == "success") {
            newNotification("Assignee Changed Successfully");
            window.location.reload();
          } else {
            newNotification("Some unexpected error occurred");
          }
        });
    };
    // -------------------------------------

    roles.forEach((role) => {
      // console.log(role);
      let excludedRoles = ["User", "Admin"];
      if (!excludedRoles.includes(role.name)) {
        options += ` <option value="${role.id}">${role.name}</option>`;
      }
    });

    window.modal.setContent(
      `<select class="form-select mx-2" id="get-forward-assignee">${options}</select>`
    );

    window.modal.setCallback(confirmForwardComplaint, {});

    window.modal.show();
  }

  viewComplaint(CiD) {
    window.complaint.viewComplaintDetails(true, CiD).then((complaint) => {
      console.log(complaint);
      window.offcanvas.setTitle(`Complaint Details`);

      let html = `
      <p class="inline-block">
        ${
          (complaint["is_private"] == 1 &&
            '<span class="w-fit p-2 px-4 border rounded border-danger text-danger"> Private Complaint</span>') ||
          (complaint["is_private"] == 0 &&
            `<span class="w-fit p-2 px-4 border rounded border-success text-success"> Public Complaint</span>`)
        }

        ${
          (complaint["status"] != 4 &&
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
        <select class="p-2 border-secondary border-rounded" id="get-complaint-status">
          <option value="0">Not Yet Noted</option>
          <option value="1">Mark as Noted</option>
          <option value="2">Mark as Resolved</option>
          <option value="3">Reject Complaint</option>
        </select>
        
        <p class="complaint-desc">
            <span class="fw-700">        
            Created On
            </span> 
        ${complaint.created_on.split("-").reverse().join("-")}
        </p>

        <p class="complaint-desc">
            <p>        
            <span class="fw-700">Feedback From<span/> <span>${
              complaint.createdBy
            }</span>
            </p> 
        ${complaint.feedback}
        </p>

        
        <p class="complaint-desc">
            <p class="fw-700">        
            Report of Reviewer
            </p> 
        </p>
        <p class="small text-primary"><span class="bg-secondary text-light rounded-5 py-0 px-1 mx-2 fw-700 small">i</span>Type your thoughts or provide final report to the complainant</p>
        <textarea class="col-11" rows="6" placeholder="Type your thoughts or provide final report to the complainant">${
          complaint.report
        }</textarea>
        
        <button type='button' onclick="window.reviewer.saveChanges('${
          complaint.status
        }', '${complaint.report}', ${
        complaint.id
      })" class='btn btn-success m-2'>Save Changes</button>       
        
        ${
          ((complaint.status == 0 || complaint.status == 1) &&
            `<button type='button' onclick="window.reviewer.forwardComplaint(${complaint.id})" class='btn btn-primary m-2'>Forward To Someone Else</button>`) ||
          ""
        }            
        `;

      window.offcanvas.setContent(html);
      window.offcanvas.show();

      document.getElementById("get-complaint-status").value = complaint.status;
    });
  }

  saveChanges(oldStatus, oldReport, complaintId) {
    let status = document.getElementById("get-complaint-status").value;
    let report = document.querySelector("textarea").value;
    console.log(oldStatus, status, oldReport, report, complaintId);

    let changes = [];

    const confirmChanges = (data) => {
      console.log(data);
      // data = JSON.parse(data);
      console.log("Confirmed Changes");
      // const changes = data.changes;
      // const complaintId = data.complaintId;

      if (changes.includes("status")) {
        const newStatus = data.values.status;
        window.complaint.setStatus(complaintId, status);
      }
      if (changes.includes("report")) {
        const newReport = data.values.report;
      }
    };

    if (status != +oldStatus) {
      changes.push("status");
    }

    if (report != oldReport) {
      changes.push("report");
    }

    if (changes.length == 0) {
      window.modal.setTitle("Confirm Action");
      window.modal.setContent("There are no changes to save");
    } else if (changes.length == 1) {
      console.log("One found: ", changes);
      window.modal.setTitle("Confirm Action");
      window.modal.setContent(`Do you want to change complaint ${changes[0]}`);
    } else {
      console.log("Two found: ", changes);

      window.modal.setTitle("Confirm Action");
      window.modal.setContent(
        `Do you want to change complaint ${changes.join(" and ")}`
      );
    }

    window.modal.setCallback(confirmChanges, {
      changes: changes,
      values: {
        status: status,
        report: report,
        complaintId: complaintId,
      },
    });
    window.modal.show();
  }
}
export { Reviewer };
