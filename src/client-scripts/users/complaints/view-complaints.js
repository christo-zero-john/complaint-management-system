console.log("View Complaints script connected loaded successfully");

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

  let complaint = new Complaint();
  complaint.viewComplaints(isAdmin, userId);
}

export { viewComplaints };
