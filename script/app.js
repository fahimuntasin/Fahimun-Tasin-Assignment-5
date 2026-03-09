const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let issues = []


// LOGIN
function login(){

const user = document.getElementById("username").value
const pass = document.getElementById("password").value

if(user === "admin" && pass === "admin123"){
window.location.href = "app.html"
}else{
alert("Invalid Credentials")
}

}


// LOAD ALL ISSUES
async function loadIssues(){

showLoading()

try{

const res = await fetch(API)
const data = await res.json()

issues = data.data

displayIssues(issues)

}catch(error){

console.error("Error loading issues", error)

}

}


// DISPLAY ISSUE CARDS
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


const priority = (issue.priority || "").toLowerCase()

let priorityColor = "badge-info"

if(priority === "high"){
priorityColor = "badge-error"
}
else if(priority === "medium"){
priorityColor = "badge-warning"
}


const card = document.createElement("div")

card.className =
`card bg-base-100 shadow ${border} cursor-pointer`


card.innerHTML = `

<div class="card-body">

<h2 class="font-semibold">
${issue.title}
</h2>

<p class="text-sm text-gray-500 line-clamp-2">
${issue.description}
</p>

<div class="flex justify-between text-xs mt-2">

<span>${issue.author}</span>

<span class="badge ${priorityColor}">
${issue.priority}
</span>

</div>

</div>

`

card.onclick = () => openModal(issue.id)

container.appendChild(card)

})

}



// FILTER ISSUES
function filterIssues(type){

document
.querySelectorAll(".tab")
.forEach(t => t.classList.remove("tab-active"))

document
.getElementById("tab-" + type)
.classList.add("tab-active")


if(type === "all"){

displayIssues(issues)

}
else{

const filtered =
issues.filter(i => i.status === type)

displayIssues(filtered)

}

}



// SEARCH ISSUE
async function searchIssue(){

const text =
document.getElementById("searchInput").value

try{

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)

const data = await res.json()

displayIssues(data.data)

}catch(error){

console.error("Search error", error)

}

}
