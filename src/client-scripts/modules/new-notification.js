/**
 * Displays new warning with.
 * @param message Accepts a message as parameter and appends the message to the innerHTML of warning div.
 */

function newNotification(message, timeout) {
  if (document.getElementById("warning-div") == null) {
    let div = document.createElement("div");
    div.id = "warning-div";
    document.body.appendChild(div);
  }

  let warningDiv = document.getElementById("warning-div");

  warningDiv.classList =
    "toast-container position-fixed mb-2 top-0 end-0 w-fit h-fit";

  // Create toast element
  let toast = document.createElement("div");
  toast.className =
    "toast align-items-center m-3 border border-success overflow-auto";
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.setAttribute("autohide", "false");

  // Set toast content
  let toastContent = `
    <div class="d-flex">
      <div class="toast-body">
        <p class="">${message}</p>
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toast.innerHTML = toastContent;
  warningDiv.appendChild(toast);

  // Initialize and show the toast
  let bootstrapToast = new bootstrap.Toast(toast);
  bootstrapToast.show();

  if (!timeout) {
    timeout = 5000;
  }

  // console.log("Timeout is: ", timeout);

  setTimeout(() => {
    bootstrapToast.hide();
    bootstrapToast._element.remove();
  }, timeout);

  console.log(message);
}

export { newNotification };
