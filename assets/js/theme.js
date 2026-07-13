document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    // Force dark mode
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
});
