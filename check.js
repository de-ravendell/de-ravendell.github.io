document.addEventListener('DOMContentLoaded', async function() {
    await check();
});

async function check() {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        window.location.replace("https://de-ravendell.github.io");
    } else {
        const overlay = document.getItemById('overlay');
        overlay.style.display = 'none';
    }
}
