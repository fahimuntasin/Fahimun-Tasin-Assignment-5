
const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let issues = []




function login(){

const user = document.getElementById("username").value
const pass = document.getElementById("password").value

if(user === "admin" && pass === "admin123"){

window.location.href = "app.html"

}else{

alert("Invalid Credentials")

}

}


async function loadIssues(){

showLoading()

const res = await fetch(API)

const data = await res.json()

issues = data.data

displayIssues(issues)

}
