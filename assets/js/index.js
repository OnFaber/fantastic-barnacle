const button = document.getElementById("button");
const sidebar = document.getElementsByClassName("sidebar")[0];
const main = document.getElementsByTagName("main")[0];
const body = document.getElementsByTagName("body")[0];

function hide() {
  sidebar.style.display = "none";
}

function show() {
  sidebar.style.display = "flex";
}

button.addEventListener("click", function (e) {
  body.classList.toggle("close");
  if (sidebar.style.display == "none") {
    sidebar.style.display = "flex";
  } else {
    sidebar.style.display = "none";
  }
});
