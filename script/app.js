function login(){

const user = document.getElementById("username").value
const pass = document.getElementById("password").value

if(user === "admin" && pass === "admin123"){

window.location.href = "app.html"

}else{

alert("Invalid Credentials")

}

}



console.log("Login script loaded successfully")