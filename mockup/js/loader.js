/**
 * Simple Component Loader for Mockup
 * Fetches HTML from /components/ and injects into placeholders
 */

document.addEventListener("DOMContentLoaded", () => {
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');
});

function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(componentPath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => console.error(error));
}

// UI Functions
function toggleLanguageModal() {
    const modal = document.getElementById('language-modal');
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

function toggleSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    if (overlay) {
        overlay.classList.toggle('hidden');
        if (!overlay.classList.contains('hidden')) {
            const input = overlay.querySelector('input');
            if (input) input.focus();
        }
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu-drawer');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Back to Top Logic
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'translate-y-20', 'pointer-events-none');
            backToTop.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTop.classList.add('opacity-0', 'translate-y-20', 'pointer-events-none');
            backToTop.classList.remove('opacity-100', 'translate-y-0');
        }
    }
});

document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
