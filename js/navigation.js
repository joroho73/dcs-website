
export function initializeNavigation() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburgerMenu || !navMenu) return;

    const submenuItems = navMenu.querySelectorAll('.has-submenu');

    const desktopHover = window.matchMedia(
        '(min-width: 769px) and (hover: hover)'
    );

    // Open or close an individual submenu
    function setSubmenuState(item, isOpen) {
        const toggle = item.querySelector('.submenu-toggle');

        item.classList.toggle('open', isOpen);

        if (toggle) {
            toggle.setAttribute('aria-expanded', String(isOpen));
        }
    }

    // Close all submenus, optionally excluding one
    function closeSubmenus(except = null) {
        submenuItems.forEach(item => {
            if (item !== except) {
                setSubmenuState(item, false);
            }
        });
    }

    // Close the mobile navigation
    function closeMobileMenu() {
        hamburgerMenu.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');

        closeSubmenus();
    }

    // Initialise hamburger menu
    hamburgerMenu.setAttribute('aria-expanded', 'false');

    hamburgerMenu.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('active');

        hamburgerMenu.classList.toggle('active', isOpen);
        hamburgerMenu.setAttribute('aria-expanded', String(isOpen));

        if (!isOpen) {
            closeSubmenus();
        }
    });

    // Initialise all submenus
    submenuItems.forEach(item => {
        const toggle = item.querySelector('.submenu-toggle');

        if (!toggle) return;

        // Open or close on click
        toggle.addEventListener('click', function () {
            const isOpen = item.classList.contains('open');

            closeSubmenus(item);
            setSubmenuState(item, !isOpen);
        });

        // Desktop hover behaviour
        item.addEventListener('mouseenter', function () {
            if (desktopHover.matches) {
                closeSubmenus(item);
                setSubmenuState(item, true);
            }
        });

        item.addEventListener('mouseleave', function () {
            if (
                desktopHover.matches &&
                !item.contains(document.activeElement)
            ) {
                setSubmenuState(item, false);
            }
        });

        // Close when keyboard focus leaves the submenu
        item.addEventListener('focusout', function (event) {
            if (!item.contains(event.relatedTarget)) {
                setSubmenuState(item, false);
            }
        });
    });

    // Close navigation when a link is selected
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close submenus when clicking outside navigation
    document.addEventListener('click', function (event) {
        if (
            !event.target.closest('#navigation') &&
            !event.target.closest('.hamburger-menu')
        ) {
            closeSubmenus();
        }
    });

    // Close menus using Escape
    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;

        const openSubmenu = navMenu.querySelector('.has-submenu.open');

        if (openSubmenu) {
            setSubmenuState(openSubmenu, false);
            openSubmenu.querySelector('.submenu-toggle')?.focus();
        } else if (navMenu.classList.contains('active')) {
            closeMobileMenu();
            hamburgerMenu.focus();
        }
    });

    // Reset menus when switching between layouts
    window.matchMedia('(max-width: 768px)')
        .addEventListener('change', closeMobileMenu);
}


export function loadNavigation() {
    return fetch('/includes/navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navigation').innerHTML = data;
        });
}


export function setActiveNavigation() {
    const currentPage = window.location.pathname === '/'
        ? '/index.html'
        : window.location.pathname;

    document.querySelectorAll('.nav-link').forEach(link => {
        const isActive = link.pathname === currentPage;

        link.classList.toggle('active', isActive);
        link.removeAttribute('aria-current');

        if (isActive) {
            link.setAttribute('aria-current', 'page');

            // Highlight the parent when a submenu page is active
            const parentItem = link.closest('.has-submenu');

            if (parentItem) {
                const parentLink = parentItem.querySelector(
                    ':scope > .nav-link'
                );

                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }
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
