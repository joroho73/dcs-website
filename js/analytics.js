function trackEvent(selector, eventName) {
    document.querySelectorAll(selector).forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', eventName, {
                    link_location: link.dataset.location
                });
            }
        });
    });
}

export function initializeAnalytics() {
    trackEvent('.track-phone', 'phone_click');
    trackEvent('.track-email', 'email_click');
    trackEvent('.track-cta', 'cta_click');
    trackEvent('.track-review', 'review_click');
}