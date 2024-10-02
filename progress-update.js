document.addEventListener('DOMContentLoaded', () => {
    // Example of dynamically updating the progress
    const progressBar = document.getElementById('progress-bar');
    const progressPercentageText = document.getElementById('progress-percentage');

    // Simulate the user's progress (you can calculate this dynamically)
    let userProgress = 50; // Initial progress (50%)

    // Update the progress to a higher value after completing this lesson
    const newProgress = 75; // New progress after completing the memory game
    progressBar.style.width = newProgress + '%';
    progressPercentageText.innerText = newProgress + '% Completed';
});