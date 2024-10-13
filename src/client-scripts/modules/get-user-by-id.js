async function getUserById(UiD) {
  console.log("Fetching user with ID: ", UiD);
  if (UiD) {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: UiD,
      }),
    };
    return fetch(server + "/api/user/get-user-by-id.php", request)
      .then((res) => res.json())
      .then((data) => {
        return data.returned;
      });
  } else {
    throw new Error("User ID not specified");
  }
}
