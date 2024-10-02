document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const newPostForm = document.getElementById('newPostForm');
    const submitPostBtn = document.getElementById('submitPostBtn');
    const cancelPostBtn = document.getElementById('cancelPostBtn');
    const communityPosts = document.getElementById('communityPosts');
    
    // Show the new post form when New Post button is clicked
    newPostBtn.addEventListener('click', () => {
        newPostForm.classList.remove('community-hidden');
    });

    // Cancel the new post form
    cancelPostBtn.addEventListener('click', () => {
        newPostForm.classList.add('community-hidden');
    });

    // Submit the new post
    submitPostBtn.addEventListener('click', () => {
        const postTitle = document.getElementById('postTitle').value;
        const postContent = document.getElementById('postContent').value;

        if (postTitle && postContent) {
            // Create new post element
            const newPost = document.createElement('div');
            newPost.classList.add('post');
            newPost.innerHTML = `
                <h4>${postTitle}</h4>
                <p><strong>Posted by You</strong></p>
                <p>${postContent}</p>
                <button class="reply-btn">Reply</button>
            `;

            // Add the new post to the communityPosts container
            communityPosts.appendChild(newPost);

            // Clear the form fields
            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';

            // Hide the new post form
            newPostForm.classList.add('community-hidden');
        } else {
            alert('Please fill in both the title and content of your post.');
        }
    });
});