const createPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#newPTitle').value;
  const content = document.querySelector('#newPContent').value;

  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to post');
  };

};

document.querySelector('.createForm').addEventListener('submit', createPostHandler);