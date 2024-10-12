function deleteDepartment() {
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
            <p>Are you sure you want to delete this department?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteButton">Yes, Delete Department</button>
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
      confirmDeleteDepartment();
      newNotification(
        `Confirmed Deletion of department: ${fieldsValues["department-name"]} with id ${fieldsValues["department-id"]}`
      );
      bootstrapModal.hide();
      modal.remove();
    });

  // Remove modal from decoument after hiding
  modal.addEventListener("hidden.bs.modal", function () {
    modal.remove();
    newNotification(
      "Successfully Cancelled Delete Operation. Department <b>Not Deleted</b>"
    );
  });
}

function confirmDeleteDepartment() {
  newNotification("Started Deleting Department");
  let requestData = {
    id: fieldsValues["department-id"],
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  };

  fetch(`${server}/api/departments/delete-department.php`, request)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status == "error") {
        newNotification("Some Unexpected Error Occurred");
        data.errors.forEach((error) => {
          newNotification(error.details, 30000);
        });
      } else {
        newNotification("Department <b>Deleted Successfully</b>");
        window.location.reload();
      }
    });
}
