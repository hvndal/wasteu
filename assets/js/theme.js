document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    // Force light mode (dark mode removed as requested)
    root.setAttribute('data-theme', 'light');
    localStorage.removeItem('theme');
});
