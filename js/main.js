import { initializeAnalytics } from '/js/analytics.js';
import { loadHeader } from '/js/header.js';
import {
    loadNavigation,
    initializeNavigation,
    setActiveNavigation,
    initializeStickyNavigation
} from '/js/navigation.js';
import { loadFooter } from '/js/footer.js';
import { initializeCarousel } from '/js/carousel.js';

document.addEventListener('DOMContentLoaded', async () => {

    await Promise.all([
        loadHeader(),
        loadNavigation(),
        loadFooter()
    ]);

    initializeNavigation();
    setActiveNavigation();
    initializeStickyNavigation();
    initializeCarousel();
    initializeAnalytics();
});

