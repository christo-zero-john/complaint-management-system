console.log("View roles script connected loaded successfully");

function viewRoles() {
  newNotification("Starting to display all roles");
  let role = new Role();
  role.viewRoles();
}

export { viewRoles };
