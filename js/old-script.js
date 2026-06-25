// js/script.js

function initializeNavigation() {
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

function initializeCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (!carousel || slides.length === 0) return;

    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[n].classList.add('active');

        if (dots[n]) {
            dots[n].classList.add('active');
        }

        currentSlide = n;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 6000);
    }

    function resetAutoplay() {
        startAutoplay();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextSlide();
            resetAutoplay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
            resetAutoplay();
        });
    });

    carousel.addEventListener('mouseenter', function () {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', startAutoplay);

    showSlide(0);
    startAutoplay();
}

function loadNavigation() {
    fetch('includes/navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navigation').innerHTML = data;
            initializeNavigation();
            setActiveNavigation();
        });
}

function loadFooter() {
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', function () {
    loadNavigation();
    loadFooter();
    initializeCarousel();
});

document.addEventListener('DOMContentLoaded', function () {
    initializeCarousel();
});