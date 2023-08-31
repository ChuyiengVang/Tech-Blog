const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#newComment').value;
    const idEl = document.querySelector('#commId');
    const postId = idEl.getAttribute('dataId');

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ user_comment: comment, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to comment');
    };

};

document.querySelector('.commentForm').addEventListener('submit', commentFormHandler);