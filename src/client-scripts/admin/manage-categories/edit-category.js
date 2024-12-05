window.fieldsValues = {
  "category-name": null,
  "category-description": null,
  "category-id": null,
};

let offCanvas;

async function editCategory(id) {
  console.log("Displaying category with ID: ", id);
  let category = await fetchCategory(id);
  window.fieldsValues["category-name"] = category.name;
  window.fieldsValues["category-description"] = category.description;
  window.fieldsValues["category-id"] = category.id;
  newCanvas(category);
}

async function fetchCategory(CiD) {
  console.log("Fetching category with id: ", CiD);
  newNotification("Fetching category with id: " + CiD);
  startLoading();
  return fetch(server + "/api/categories/get-categories.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
        return null; // Return null or handle error appropriately
      } else {
        let categorys = data.returned;
        let category = categorys.filter((item) => item.id == CiD);
        newNotification(`${category[0].name} Category fetched successfully`);
        return category[0];
      }
    });
}

async function newCanvas(category) {
  console.log("Displaying category: ", category);

  let div;
  if (!document.getElementById("offcanvas-parent")) {
    div = document.createElement("div");
    div.id = "offcanvas-parent";

    document.body.appendChild(div);
  } else {
    div = document.getElementById("offcanvas-parent");
  }

  let offCanvasBody = `
      <div id="off-canvas" class="offcanvas show offcanvas-top h-100" tabindex="-1" aria-labelledby="offcanvasTopLabel">
          <div class="offcanvas-header border border-warning">
              <h5 class="offcanvas-title" id="offcanvasTopLabel">Edit Category ${category.name}</h5>
              
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
  
              <p class="">Name
                  <input onchange="setFieldValues(event)" class="m-2 p-2" type="text" id="category-name" value="${category.name}" /> 
              </p>
  
              <p class="category-desc">Description        
                  <textarea onchange="setFieldValues(event)" id="category-description" class="w-100 m-2 p-2" rows="10">${category.description}</textarea>
              </p>
  
              <div class="mx-auto w-fit">
                  <button class="btn btn-success wd-40 m-2 d-inline -block m-md-2 " type="button" onclick="saveCategory()">Save Changes</button>
                  <button class="btn btn-danger wd-40 m-2 d-inline -block m-md-2 " onclick="deleteCategory()">Delete Category</button>
              </div>
          </div>
      </div>
  `;

  div.innerHTML = offCanvasBody;

  offCanvas = new bootstrap.Offcanvas(document.getElementById("off-canvas"));

  offCanvas.show();

  //   console.log(fields);
}

function saveCategory() {
  offCanvas.hide();
  newNotification("start saving category");
  startLoading();

  let requestData = {
    name: window.fieldsValues["category-name"],
    description: window.fieldsValues["category-description"],
    id: window.fieldsValues["category-id"],
  };

  let category = new Category();
  category.editCategory(requestData);
}

export { editCategory, saveCategory };
