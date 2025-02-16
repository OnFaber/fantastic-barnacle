import AccountHandler from "./AccountHandler.js";

let whoIsLoggedIn = AccountHandler.whoIsLoggedIn();
if (whoIsLoggedIn == null) {
    window.location.href = "../index.html";
}