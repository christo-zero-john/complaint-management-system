console.log("My Complaints script connected loaded successfully");

function myComplaints() {
  newNotification("Starting to display your complaints");
  console.log("Fetching your complaints");
  newNotification("Fetching your complaints");

  startLoading();

  let userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);
  let user_id = userData.id;

  let complaint = new Complaint();
  complaint.viewMyComplaints(user_id);
}

export { myComplaints };
