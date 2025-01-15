class Category {
  newCategory(category) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    };

    console.log("Creating new Category with data: ", request);

    fetch(`${server}/api/categories/new-category.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // If some error occurred, handle error
        if (data.status === "error") {
          data.errors.forEach((error) => {
            // If error is Category already exists
            if (error.message === "Category Already Exists") {
              newNotification("Category already exists.");
            }
            // If some unknown or unexpected error occurred.
            else {
              newNotification(
                "Some error occurred unexpectedly." + error.details
              );
            }
          });
        }

        // If server returned status as success, then display success message
        else {
          newNotification("Category created successfully.");
          window.location.reload();
        }
      });
  }

  editCategory(category) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    };

    fetch(server + "/api/categories/update-category.php", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("An Error occurred Unexpectedly");
          data.errors.forEach((error) => {
            newNotification(error.details);
          });
        } else {
          newNotification("Category Updated Successfully.");
          stopLoading();
          window.location.reload();
        }
      });
  }

  viewCategories() {
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
            <div class=" card col-10 col-sm-9 col-md-5 my-2 mx-md-2 py-3 hover-scale-11 transition-04" onclick="editCategory('${category.id}')">
                <h3 class="name">${category.name}</h3>
                <p class="desc small">${adjustedDescription}</p>
            </div>
          `;
          });
        }
      });
  }

  deleteCategory(Cdata) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Cdata),
    };

    console.log("Deketing Category with: ", request);

    fetch(`${server}/api/categories/delete-category.php`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "error") {
          newNotification("Some Unexpected Error Occurred");
          data.errors.forEach((error) => {
            newNotification(error.details, 30000);
          });
        } else {
          newNotification("Category <b>Deleted Successfully</b>");
          window.location.reload();
        }
      });
  }
}
export { Category };
