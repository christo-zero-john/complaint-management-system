console.log("View Complaints script connected loaded successfully");

let server = "http://localhost/Complaint%20Management%20System/backend";

viewComplaints();

function viewComplaints() {
  newNotification("Starting to display all complaints");
  console.log("Fetching all complaints");
  newNotification("Fetching all complaints");

  fetch(`${server}/api/complaints/get-complaints.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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


          document.getElementById("complaints").innerHTML += `     
            <div class="department card col-10 col-sm-9 col-md-5 my-2 mx-md-2 py-3 hover-scale-11 transition-04" onclick="viewComplaintDetails('${
              complaint.id
            }')">
                <h3 class="title">${complaint.title}</h3>
                <p class="desc small">${adjustedDescription}</p>

              <p class="inline-block">
                ${
                  (complaint.visibility == 1 &&
                    '<p class="w-fit py-1 px-4 border rounded border-danger text-danger" > Private</p>') ||
                  (complaint.visibility == 0 &&
                    '<p class="w-fit py-1 px-4 border rounded border-success text-success" > Public</p>')
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
