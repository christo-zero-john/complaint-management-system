function startLoading() {
  console.log("started loading");
  let loadingDiv;
  if (!document.getElementById("loading-div")) {
    loadingDiv = document.createElement("div");
    loadingDiv.id = "loading-div";
    loadingDiv.innerHTML = "Loading div";
    document.body.appendChild(loadingDiv);
  } else {
    loadingDiv = document.getElementById("loading-div");
  }
  loadingDiv.classList.remove("hidden");
}

export { startLoading };
