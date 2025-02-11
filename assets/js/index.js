const user = window.localStorage.getItem("user");

user ? null : (window.location.href = "/sign-up.html");
