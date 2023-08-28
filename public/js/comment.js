const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#newComment').value.trim();
    const idEl = document.querySelector('#commId');
    const dataId = idEl.getAttribute('dataId');

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, dataId }),
        header: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/singlepost');
    } else {
        alert('Failed to comment');
    };

};

document.querySelector('.commentForm').addEventListener('submit', commentFormHandler);