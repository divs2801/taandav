// Get the modal and close button
const modal = document.getElementById('videoModal');
const closeBtn = document.querySelector('.close-btn');
const modalVideo = document.getElementById('modalVideo');
const videoPlaceholders = document.querySelectorAll('.video-placeholder');

// When a video placeholder is clicked
videoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video');
        modalVideo.src = videoSrc;  // Set the video source
        modal.style.display = 'block';  // Show the modal
        modalVideo.play();  // Automatically play the video
    });
});

// When the user clicks on the close button
closeBtn.onclick = function() {
    modal.style.display = 'none';  // Hide the modal
    modalVideo.pause();  // Pause the video
    modalVideo.src = '';  // Remove the video source
}

// Close the modal when clicking outside of the video
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
    }
}