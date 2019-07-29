document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', () => {
        // toggle menu
        if(hamburger.classList[0]){
            hamburger.classList = "";
            nav.classList = "";
        } else {
            hamburger.classList = "open"
            nav.classList = "open"
        }
    });
});