document.addEventListener('DOMContentLoaded', async function() {

        if (sessionStorage.getItem('authenticated') !== true) {

                 window.open('/');

        }

});
