// Authentication logic with password hashing
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuthStatus();
});

async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
  
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
}

async function checkPassword() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    
    try {
        // Fetch hashed password file
        const response = await fetch('https://de-ravendell.github.io/auth_data.txt');
        if (!response.ok) throw new Error('Failed to load authentication data');
        
        const authData = await response.text();
        const validLogins = authData.split('\n').filter(line => line.trim() !== '');
        const pass = await sha256(password);
        
        // Check credentials
        for (const login of validLogins) {
            const [validUser, validPass] = login.trim().split(':');
            if (username === validUser && pass === validPass) {
                // Store username and password in localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
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

async function checkAuthStatus() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
        try {
            // Fetch hashed password file
            const response = await fetch('https://de-ravendell.github.io/auth_data.txt');
            if (!response.ok) throw new Error('Failed to load authentication data');
            
            const authData = await response.text();
            const validLogins = authData.split('\n').filter(line => line.trim() !== '');
            const storedPassHash = await sha256(storedPassword);
            
            // Check credentials
            for (const login of validLogins) {
                const [validUser, validPass] = login.trim().split(':');
                if (storedUsername === validUser && storedPassHash === validPass) {
                    document.getElementById('auth-overlay').style.display = 'none';
                    return;
                }
            }
        } catch (error) {
            console.error('Authentication check error:', error);
        }
    }
    // If no valid credentials in localStorage, show auth overlay
    document.getElementById('auth-overlay').style.display = 'flex';
}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    location.reload();
}
