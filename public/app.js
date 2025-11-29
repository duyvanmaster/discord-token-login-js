const loginForm = document.getElementById('loginForm');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('statusMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = document.getElementById('token').value;

    if (!token) return;

    // Set loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    statusMessage.textContent = '';
    statusMessage.className = 'status';

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();

        if (data.success) {
            statusMessage.textContent = 'Success! Browser launched.';
            statusMessage.classList.add('success');
        } else {
            statusMessage.textContent = data.message || 'Login failed.';
            statusMessage.classList.add('error');
        }

    } catch (error) {
        statusMessage.textContent = 'Network error. Please try again.';
        statusMessage.classList.add('error');
    } finally {
        // Reset loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});
