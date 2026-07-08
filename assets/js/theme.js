document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', currentTheme);
    
    // Set initial icon
    if (themeToggleBtn) {
        themeToggleBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }
});
