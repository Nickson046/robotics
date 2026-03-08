const checkboxes = document.querySelectorAll(".progress");
const progressText = document.getElementById("progressText");

// Load saved progress on page load
window.addEventListener("DOMContentLoaded", () => {
  checkboxes.forEach(box => {
    // Restore checked state from localStorage
    const saved = localStorage.getItem(box.id);
    if (saved === "true") {
      box.checked = true;
    }

    // Add event listener for changes
    box.addEventListener("change", () => {
      localStorage.setItem(box.id, box.checked); // Save state
      updateProgress();
    });
  });

  // Update progress once on page load
  updateProgress();
});

function updateProgress() {
  let total = checkboxes.length;
  let checked = 0;

  checkboxes.forEach(box => {
    if (box.checked) {
      checked++;
    }
  });

  let percent = Math.round((checked / total) * 100);
  progressText.textContent = "Progress: " + percent + "%";
}
