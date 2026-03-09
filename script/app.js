
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

function displayIssues(list){

const container = document.getElementById("issuesContainer")

container.innerHTML = ""

document.getElementById("issueCount").innerText =
list.length + " Issues"



list.forEach(issue => {

const border =
issue.status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500"



const card = document.createElement("div")

card.className =
`card bg-base-100 shadow ${border} cursor-pointer`



card.innerHTML = `

<div class="card-body">

<h2 class="font-semibold">${issue.title}</h2>

<p class="text-sm text-gray-500 line-clamp-2">
${issue.description}
</p>

<div class="flex justify-between text-xs mt-2">

<span>${issue.author}</span>

<span>${issue.priority}</span>

</div>

</div>
`
card.onclick = () => openModal(issue)

container.appendChild(card)

})

}
