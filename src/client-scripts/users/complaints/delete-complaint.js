function deleteComplaint(id) {
  // Create modal element
  let modal = document.createElement("div");
  modal.className = "modal fade";
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", "confirmDeleteModalLabel");
  modal.setAttribute("aria-hidden", "true");

  // Set modal content
  let modalContent = `
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="confirmDeleteModalLabel">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this complaint?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">No, Don't Delete</button>
                <button type="button" class="btn btn-danger" id="confirmDeleteButton">Yes, Delete Complaint</button>
              </div>
            </div>
          </div>
        `;

  modal.innerHTML = modalContent;
  document.body.appendChild(modal);

  // Initialize and show the modal
  let bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();

  // Add event listener for the confirm button
  document
    .getElementById("confirmDeleteButton")
    .addEventListener("click", function () {
      confirmDeleteComplaint(id);
      newNotification(`Confirmed Deletion of complaint with id: ${id}`);
      bootstrapModal.hide();
    });

  // Remove modal from document after hiding
  modal.addEventListener("hidden.bs.modal", function () {
    modal.remove();
    newNotification(
      "Successfully Cancelled Delete Operation. Complaint <b>Not Deleted</b>"
    );
  });
}

function confirmDeleteComplaint(CiD) {
  newNotification("Started Deleting Complaint");
  let requestData = {
    id: CiD,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
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
