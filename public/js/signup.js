const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup-input').value.trim();
    const password = document.querySelector('#password-signup-input').value.trim();

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers:{ 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unable to register');
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);