// Authentication logic
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});

async function checkPassword() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    
    try {
        // Fetch password file
        const response = await fetch('auth_data.txt');
        if (!response.ok) throw new Error('Failed to load authentication data');
        
        const authData = await response.text();
        const validLogins = authData.split('\n').filter(line => line.trim() !== '');
        
        // Check credentials
        for (const login of validLogins) {
            const [validUser, validPass] = login.trim().split(':');
            if (username === validUser && password === validPass) {
                // Store authentication status
                sessionStorage.setItem('authenticated', 'true');
                document.getElementById('auth-overlay').style.display = 'none';
                errorMsg.style.display = 'none';
                return;
            }
        }
        
        // Invalid credentials
        errorMsg.style.display = 'block';
    } catch (error) {
        console.error('Authentication error:', error);
        errorMsg.textContent = 'Authentication system error';
        errorMsg.style.display = 'block';
    }
}

function checkAuthStatus() {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        document.getElementById('auth-overlay').style.display = 'flex';
    }
}

function logout() {
    sessionStorage.removeItem('authenticated');
    location.reload();
}
