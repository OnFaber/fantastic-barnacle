const button = document.getElementsByClassName("button")[0];
const nav = document.getElementsByTagName("nav")[0];
const main = document.getElementsByTagName("main")[0];
const body = document.getElementsByTagName("body")[0];

function hide() {
  nav.style.display = "none";
}

function show() {
  nav.style.display = "flex";
}

button.addEventListener("click", function (e) {
  body.classList.toggle("body");
  if (nav.style.display == "none") {
    nav.style.display = "flex";
  } else {
    nav.style.display = "none";
  }
});
