console.log("View categories script connected loaded successfully");

function viewCategories() {
  newNotification("Starting to display all categories");
  let category = new Category();
  category.viewCategories();
}

export { viewCategories };
