console.log("My Complaints script connected loaded successfully");

function myComplaints() {
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

        complaints.forEach((complaint) => {
          let adjustedDescription = complaint.description.split(" ");
          adjustedDescription = adjustedDescription.splice(0, 40);
          adjustedDescription = adjustedDescription.join(" ");
          adjustedDescription += "...";

          document.getElementById("my-complaints").innerHTML += `     
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

export { myComplaints };
