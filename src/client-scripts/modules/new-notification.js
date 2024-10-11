/**
 * Displays new warning with.
 * @param message Accepts a message as parameter and appends the message to the innerHTML of warning div.
 */

function newNotification(message) {
  // console.log("New note ", message);
  if (document.getElementById("warning-div") == null) {
    let div = document.createElement("div");
    div.id = "warning-div";
    document.body.appendChild(div);
  }
  let warningDiv = document.getElementById("warning-div");
  warningDiv.innerHTML += `<p>${message}</p>`;
}
