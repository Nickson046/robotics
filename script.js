const checkboxes = document.querySelectorAll(".progress");
const progressText = document.getElementById("progressText");

checkboxes.forEach(box => {

box.addEventListener("change", updateProgress);

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

/* run once when page loads */
updateProgress();
