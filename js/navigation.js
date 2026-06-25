export function initializeNavigation() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburgerMenu || !navMenu) return;

    hamburgerMenu.addEventListener('click', function () {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

export function loadNavigation() {
    fetch('includes/navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navigation').innerHTML = data;
            initializeNavigation();
            setActiveNavigation();
        });
}