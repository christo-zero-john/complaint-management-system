async function fetchDepartment(DiD) {
  console.log("Fetching department with id: ", DiD);
  newNotification("Fetching department with id: " + DiD);
  startLoading();
  return fetch(server + "/api/departments/get-departments.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "error") {
        data.errors.forEach((error) => {
          newNotification("An unexpected error occurred: " + error.details);
        });
        return null; // Return null or handle error appropriately
      } else {
        let departments = data.returned;
        let department = departments.filter((item) => item.id == DiD);
        newNotification(
          `${department[0].name} Department fetched successfully`
        );
        return department[0];
      }
    });
}

export { fetchDepartment };
