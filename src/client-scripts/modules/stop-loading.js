function stopLoading() {
  console.log("stopped loading");
  let loadingDiv = document.getElementById("loading-div");

  loadingDiv.classList.add("hidden");
}

export { stopLoading };
