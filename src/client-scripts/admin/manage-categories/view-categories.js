console.log("View categories script connected loaded successfully");


function viewCategories() {
  newNotification("Starting to display all categories");
  console.log("Fetching all categories");
  newNotification("Fetching all categories");

  /**
   * @var server is declared create-category.js
   */

  fetch(`${server}/api/categories/get-categories.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
      } else {
        newNotification("Categories fetched successfully");
        let categories = data.returned;

        categories.forEach((category) => {
          let adjustedDescription = category.description.split(" ");
          adjustedDescription = adjustedDescription.splice(0, 40);
          adjustedDescription = adjustedDescription.join(" ");
          adjustedDescription += "...";

          document.getElementById("categories").innerHTML += `     
            <div class="department card col-10 col-sm-9 col-md-5 my-2 mx-md-2 py-3 hover-scale-11 transition-04" onclick="editCategory('${category.id}')">
                <h3 class="name">${category.name}</h3>
                <p class="desc small">${adjustedDescription}</p>
            </div>
          `;
        });
      }
    });
}

export { viewCategories };
