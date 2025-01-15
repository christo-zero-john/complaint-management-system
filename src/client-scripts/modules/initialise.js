// initialize window objects for different classes
function initializer() {
  window.addEventListener("DOMContentLoaded", () => {
    console.log("Initializing things. Creating window objects");

    let user = new User();
    window.user = user;

    let department = new Department();
    window.department = department;

    let role = new Role();
    window.role = role;

    let category = new Category();
    window.category = category;

    let complaint = new Complaint();
    window.complaint = complaint;

    let popup = new PopUp();
    window.popup = popup;

    let modal = new Modal();
    window.modal = modal;

    let offcanvas = new OffCanvas();
    window.offcanvas = offcanvas;

    let reviewer = new Reviewer();
    window.reviewer = reviewer;

    let dashboard = new Dashboard();
    window.dashboard = dashboard;
  });
}

export { initializer };
