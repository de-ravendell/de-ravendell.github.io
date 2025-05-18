document.addEventListener('DOMContentLoaded', async function() {
    await check();
});

async check() {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        window.location.replace("https://de-ravendell.github.io");
    }
}
