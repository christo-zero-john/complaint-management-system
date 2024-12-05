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

export { fetchCategory };
