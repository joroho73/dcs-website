import { loadNavigation } from './navigation.js';
import { loadFooter } from './footer.js';
import { initializeCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    loadFooter();
    initializeCarousel();
});