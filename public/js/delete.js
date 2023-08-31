const deletePostHandler = async (event) => {
    event.preventDefault();

    const idEl = document.querySelector('#findId');
    const dataId = idEl.getAttribute('dataId');

    const response = await fetch(`/api/post/${dataId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Fail to delete post');
    };
    
};

document.querySelector('.deleteBtn').addEventListener('click', deletePostHandler);