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


// FIXED LABEL HANDLING
const label =
issue.label || issue.labels?.[0] || "No label"


const card = document.createElement("div")

card.className =
`card bg-base-100 border border-base-200 shadow-sm ${border} cursor-pointer hover:shadow-md transition`


card.innerHTML = `

<div class="card-body gap-3">

<div class="flex justify-between items-center">

<div class="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
<img src="/assets/Open-Status.png">
</div>

<span class="badge ${priorityColor}">
${issue.priority}
</span>

</div>


<h2 class="font-semibold text-base">
${issue.title}
</h2>


<p class="text-sm text-gray-500 line-clamp-2">
${issue.description}
</p>


<div>
<span class="badge badge-outline">
${label}
</span>
</div>

</div>


<div class="border-t px-4 py-3 flex justify-between text-xs text-gray-500">

<span>#${issue.id} by ${issue.author}</span>

<span>${new Date(issue.createdAt).toLocaleDateString()}</span>

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



// OPEN MODAL
async function openModal(id){

try{

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data = await res.json()

const issue = data.data


document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description
document.getElementById("modalAuthor").innerText = issue.author
document.getElementById("modalLabel").innerText =
issue.label || issue.labels?.[0] || "No label"

document.getElementById("modalAssignee").innerText =
issue.assignee || "Unassigned"


const date = new Date(issue.createdAt).toLocaleDateString()

document.getElementById("modalDate").innerText = date



// STATUS
const statusEl = document.getElementById("modalStatus")

statusEl.innerText = issue.status

statusEl.className =
issue.status === "open"
? "badge badge-success"
: "badge badge-secondary"



// PRIORITY
const priorityEl =
document.getElementById("modalPriority")

const priority = (issue.priority || "").toLowerCase()

priorityEl.innerText = issue.priority

priorityEl.className =
priority === "high"
? "badge badge-error"
: priority === "medium"
? "badge badge-warning"
: "badge badge-info"






document.getElementById("issueModal").showModal()

}catch(error){

console.error("Issue load error", error)

}

}



// CLOSE MODAL
function closeModal(){

document.getElementById("issueModal").close()

}



// LOADING SPINNER
function showLoading(){

const container =
document.getElementById("issuesContainer")

if(container){

container.innerHTML =
`<div class="flex justify-center col-span-4">
<span class="loading loading-spinner loading-lg"></span>
</div>`

}

}



// AUTO LOAD
if(window.location.pathname.includes("app.html")){
loadIssues()
}