document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    
    if (!loadingScreen || !loadingText) return;

    const messages = [
        "On our way to pick up garbage...",
        "Routing the fleet...",
        "Emptying the bins...",
        "Fueling the trucks...",
        "Sorting recyclables..."
    ];
    
    let messageIndex = 0;
    loadingText.textContent = messages[messageIndex];

    const textInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        loadingText.textContent = messages[messageIndex];
    }, 800); // Change text rapidly for effect

    // Wait for the window to fully load, plus artificial 2-second delay to show off the loader
    window.addEventListener('load', () => {
        setTimeout(() => {
            clearInterval(textInterval);
            loadingScreen.classList.add('fade-out');
            
            // Remove from DOM after fade out completes
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }, 2000);
    });
});
