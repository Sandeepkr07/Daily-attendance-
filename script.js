// =========================
// Daily Attendance System
// Part 1
// =========================

// Today's Date
const todayDate = document.getElementById("todayDate");
todayDate.textContent = new Date().toLocaleDateString("en-IN");

// Elements
const branch = document.getElementById("branch");
const semester = document.getElementById("semester");
const subject = document.getElementById("subject");
const loadBtn = document.getElementById("loadBtn");
const attendanceSection = document.getElementById("attendanceSection");
const studentList = document.getElementById("studentList");
const subjectTitle = document.getElementById("subjectTitle");

// -------------------------
// CSE Subjects
// -------------------------

const cseSubjects = [
"Computer Network",
"Compiler Design",
"Machine Learning",
"Cryptography & Network Security",
"Java Programming",
"Python Lab",
"CN Lab",
"CD Lab"
];

// -------------------------
// ECE Subjects
// -------------------------

const eceSubjects = [
"Analog Electronics & IC",
"Digital Circuits",
"Electromagnetic Field Theory",
"Analog Communication",
"Electronics Materials",
"NPTEL-I",
"AEIC Lab",
"Digital Circuit Lab",
"Analog Communication Lab",
"EMI Lab"
];

// -------------------------
// Demo Students
// -------------------------

const students = [

{roll:"220101",name:"Rahul Kumar"},
{roll:"220102",name:"Aman Kumar"},
{roll:"220103",name:"Priya Kumari"},
{roll:"220104",name:"Rohit Kumar"},
{roll:"220105",name:"Anjali Kumari"},
{roll:"220106",name:"Neha Kumari"},
{roll:"220107",name:"Sandeep Kumar"},
{roll:"220108",name:"Sonu Kumar"},
{roll:"220109",name:"Riya Kumari"},
{roll:"220110",name:"Abhishek Kumar"}

];

// -------------------------
// Load Subjects
// -------------------------

branch.addEventListener("change", () => {

subject.innerHTML = "<option>Select Subject</option>";

let list = [];

if(branch.value==="CSE"){
list = cseSubjects;
}

if(branch.value==="ECE"){
list = eceSubjects;
}

list.forEach(sub=>{

let option = document.createElement("option");

option.value=sub;

option.textContent=sub;

subject.appendChild(option);

});

});
// =========================
// Part 2
// Load Attendance
// =========================

let attendanceData = {};

// Load Attendance Button

loadBtn.addEventListener("click", () => {

if(branch.value===""){

alert("Please Select Branch");

return;

}

if(subject.value===""){

alert("Please Select Subject");

return;

}

attendanceSection.style.display="block";

subjectTitle.innerHTML=
branch.value+" | "+semester.value+
"<br>"+subject.value;

studentList.innerHTML="";

students.forEach((student,index)=>{

let row=document.createElement("div");

row.className="student";

row.innerHTML=`

<div>

<b>${student.roll}</b><br>

${student.name}

</div>

<div class="actions">

<button class="present"

onclick="markPresent(${index})">

Present

</button>

<button class="absent"

onclick="markAbsent(${index})">

Absent

</button>

</div>

`;

studentList.appendChild(row);

attendanceData[index]="Absent";

});

updateSummary();

});

// =========================
// Mark Present
// =========================

function markPresent(index){

attendanceData[index]="Present";

let row=document.querySelectorAll(".student")[index];

row.style.background="#d4edda";

updateSummary();

}

// =========================
// Mark Absent
// =========================

function markAbsent(index){

attendanceData[index]="Absent";

let row=document.querySelectorAll(".student")[index];

row.style.background="#f8d7da";

updateSummary();

}
// =========================
// Part 3
// Save Attendance & Summary
// =========================

const saveBtn = document.getElementById("saveBtn");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");
const percentage = document.getElementById("percentage");

function updateSummary(){

let present = 0;
let absent = 0;

Object.values(attendanceData).forEach(status=>{

if(status==="Present"){
present++;
}else{
absent++;
}

});

presentCount.textContent = present;
absentCount.textContent = absent;

let percent = students.length===0
? 0
: ((present/students.length)*100).toFixed(1);

percentage.textContent = percent + "%";

}

saveBtn.addEventListener("click",()=>{

const key =
branch.value + "_" +
semester.value + "_" +
subject.value;

const data = {

date:new Date().toLocaleDateString(),

branch:branch.value,

semester:semester.value,

subject:subject.value,

attendance:attendanceData

};

localStorage.setItem(key,JSON.stringify(data));

const toast=document.getElementById("toast");

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},2000);

alert("Attendance Saved Successfully ✅");

});
