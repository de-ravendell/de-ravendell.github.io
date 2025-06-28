document.addEventListener('DOMContentLoaded', async function() {
    await check();
});

async function check() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (!storedUsername || !storedPassword) {
        window.location.replace("https://de-ravendell.github.io");
    } else {
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
                    const overlay = document.getElementById('overlay');
                    overlay.style.display = 'none';
                    return;
                }
            }
        } catch (error) {
            console.error('Authentication check error:', error);
        }
        // If credentials are invalid, redirect to login page
        window.location.replace("https://ravndl.infy.uk/");
    }
}
