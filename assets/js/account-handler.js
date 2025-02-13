document.getElementById("logOutButton").addEventListener("click", logOut);


function logOut (event) {
    let authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));
    console.log(authenticatedUser);
    if (authenticatedUser != null) {
        localStorage.removeItem("authenticatedUser")
    }
}