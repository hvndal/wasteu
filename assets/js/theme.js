document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    // Force light mode
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
});
