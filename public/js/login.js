const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login-input').value.trim();
    const password = document.querySelector('#password-login-input').value.trim();

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers:{ 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unable to login');
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);