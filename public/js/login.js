const loginFormHandler = async (event) => {
  // TODO: Add a comment describing the functionality of this statement
  // Stopping the browser from submitting the form so we can handle it ourselves
  event.preventDefault();

  // TODO: Add a comment describing the functionality of these expressions
  // Get the data from the user login info and put it in as a js object
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // TODO: Add a comment describing the functionality of this expression
    // Sending the info to the backend to process
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
