import AccountHandler from "./AccountHandler.js";

let whoIsLoggedIn = AccountHandler.whoIsLoggedIn();
console.log(whoIsLoggedIn);
if (whoIsLoggedIn == null) {
    window.location.href = "../index.html";
}