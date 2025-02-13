const toggleBtn = document.getElementById("toggle_sidebar");
const closeBtn = document.getElementById("close_sidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.remove("hidden");
  toggleBtn.classList.add("hidden");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.add("hidden");
  toggleBtn.classList.remove("hidden");
});
