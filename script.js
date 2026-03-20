const checkboxes = document.querySelectorAll(".progress");
const progressText = document.getElementById("progressText");

// Load saved progress
window.addEventListener("DOMContentLoaded", () => {

checkboxes.forEach(box => {

const saved = localStorage.getItem(box.id);

if(saved === "true"){
box.checked = true;
}

box.addEventListener("change", () => {

localStorage.setItem(box.id, box.checked);

updateProgress();

});

});

updateProgress();

});

function updateProgress(){

let total = checkboxes.length;
let checked = 0;

checkboxes.forEach(box => {

if(box.checked){
checked++;
}

});

let percent = Math.round((checked/total)*100);

progressText.textContent = "Progress: " + percent + "%";

}

/* Optional: mark tasks completed when page visited */

const page = window.location.pathname;

if(page.includes("task1")){
localStorage.setItem("week1",true);
}

if(page.includes("task2")){
localStorage.setItem("week2",true);
}

if(page.includes("task3")){
localStorage.setItem("week3",true);
}

if(page.includes("task4")){
localStorage.setItem("week4",true);
}

if(page.includes("task5")){
localStorage.setItem("week5",true);
}

if(page.includes("task6")){
localStorage.setItem("week6",true);
}

if(page.includes("task7")){
localStorage.setItem("week7",true);
}

if(page.includes("task8")){
localStorage.setItem("week8",true);
}


// Scroll animation

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});

const hiddenElements = document.querySelectorAll("section, .assignment-card, .project");

hiddenElements.forEach(el => {

el.classList.add("hidden");

observer.observe(el);

});

/* Background slideshow */

const backgrounds = [

"images/roboticsimage1.jpg",
"images/roboticsimage2.jpg",
/*"images/roboticsgif1.gif"*/

];

let index = 0;

function changeBackground(){

document.body.style.backgroundImage = `url(${backgrounds[index]})`;

index++;

if(index >= backgrounds.length){
index = 0;
}

}

changeBackground(); // first image

setInterval(changeBackground, 6000); // change every 6 seconds


const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});