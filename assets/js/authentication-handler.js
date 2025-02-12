document.getElementById("logOutButton").addEventListener("click", logOut);

function print () {
    console.log("TEST");
}
function logOut (event) {
    let usersArray = [];
    for (let i=0; i<localStorage.length; i++) {
        usersArray[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    for (let i=0; i<usersArray.length; i++) {
        console.log(usersArray[i]);
        if (usersArray[i].isAuthenticated) {
            console.log(`Autenticato con+${usersArray[i].credentials.email}`);
            usersArray[i].isAuthenticated = false;
            let userStringified = JSON.stringify(usersArray[i])
            localStorage.setItem(localStorage.key(i), userStringified);
        }
    }
}