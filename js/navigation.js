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
    return fetch('/includes/navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navigation').innerHTML = data;
        });
}

export function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

export function initializeStickyNavigation() {
    const header = document.getElementById('header');
    const navigation = document.getElementById('navigation');

    if (!header || !navigation) return;

    const navOffset = navigation.offsetTop;
    const navbar = navigation.querySelector('.navbar');

    function handleScroll() {
        if (window.scrollY >= navOffset) {
            navigation.classList.add('nav-fixed');
            document.body.classList.add('nav-is-fixed');
            navbar.classList.add('scrolled');
        } else {
            navigation.classList.remove('nav-fixed');
            document.body.classList.remove('nav-is-fixed');
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}