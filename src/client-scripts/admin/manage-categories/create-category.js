console.log("Create category script loaded successfully");

let fields = {
  "category-name": document.getElementById("category-name"),
  "category-description": document.getElementById("category-description"),
};

function createCategory(event) {
  // Prevent default form submission
  event.preventDefault();

  let categoryName = fields["category-name"].value;
  let categoryDescription = fields["category-description"].value;

  let missingFields = [];
  if (!categoryName) {
    missingFields.push("Name");
    fields["category-name"].classList.add("empty-field");
  }

  if (!categoryDescription) {
    missingFields.push("Description");
    fields["category-description"].classList.add("empty-field");
  }

  // If some field values are missing notify that.
  if (missingFields.length > 0) {
    newNotification(`${missingFields.join(", ")} missing`);
  }
  // If all field values are received, send the data to the server.
  else {
    let data = {
      name: categoryName,
      description: categoryDescription,
    };

    let category = new Category();
    category.newCategory(data);
  }
}

// Event Listners
/**
 * 1. When an input field is focused, remove empty-fields class from that field if it has the class empty-field.
 * empty-field class is added to the element if the field value is null when create department is clicked.
 * This event listner is used to remove the class when the field is clicked again once the field is focused again.
 *
 */
let fieldElements = Object.values(fields);
// console.log(fieldElements);

fieldElements.forEach((element) => {
  if (element) {
    element.onfocus = (e) => {
      if (e.target.classList.contains("empty-field")) {
        e.target.classList.remove("empty-field");
      }
    };
  }
});

export { createCategory };
