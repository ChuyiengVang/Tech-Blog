const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#editPTitle').value;
    const content = document.querySelector('#editPContent').value;
    const idEl = document.querySelector('#findId');
    const dataId = idEl.getAttribute('dataId');

    const response = await fetch(`/api/post/${dataId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: title, content: content}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Fail to edit post');
    };
    
};

document.querySelector('.updateBtn').addEventListener('click', editPostHandler);