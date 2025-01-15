let server = "http://127.0.0.1:5500/data.php";

fetch(server)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
