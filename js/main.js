import { loadHeader } from './header.js';
import {
    loadNavigation,
    initializeNavigation,
    setActiveNavigation,
    initializeStickyNavigation
} from './navigation.js';
import { loadFooter } from './footer.js';
import { initializeCarousel } from './carousel.js';

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

});

