function reOpenComplaint(id) {
  // Create modal element
  let modal = document.createElement("div");
  modal.className = "modal fade";
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", "confirmReopenModalLabel");
  modal.setAttribute("aria-hidden", "true");

  // Set modal content
  let modalContent = `
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="confirmReopenModalLabel">Confirm Reopen Complaint</h5>
                <button type="button" class="btn-reopen" data-bs-dismiss="modal" aria-label="Reopen"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to reopen this complaint?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">No, Don't Reopen</button>
                <button type="button" class="btn btn-danger" id="confirmReopenButton">Yes, Reopen Complaint</button>
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
    .getElementById("confirmReopenButton")
    .addEventListener("click", function () {
      confirmReopenComplaint(id);
      newNotification(`Confirmed Re Opening of complaint with id: ${id}`);
      document.body.removeChild(bootstrapModal);
    });

  // Remove modal from document after hiding
  modal.addEventListener("hidden.bs.modal", function () {
    modal.remove();
    newNotification(
      "Successfully Cancelled Reopen Operation. Complaint <b>Not Re Opened</b>"
    );
  });
}

function confirmReopenComplaint(CiD) {
  newNotification("Started Re Opening Complaint");
  let requestData = {
    id: CiD,
  };

  let complaint = new Complaint();
  complaint.reOpenComplaint(requestData);
}

export { reOpenComplaint };
