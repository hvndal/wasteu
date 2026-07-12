document.addEventListener('DOMContentLoaded', () => {
    // === APP WIZARD & MODAL LOGIC ===
    const appCards = document.querySelectorAll('.app-card');
    const modal = document.getElementById('rec-modal');
    const closeModal = document.getElementById('close-modal');
    
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalRecSize = document.getElementById('modal-rec-size');
    const modalBags = document.getElementById('modal-bags');
    const modalCta = document.getElementById('modal-cta');

    if (appCards.length > 0 && modal) {
        appCards.forEach(card => {
            card.addEventListener('click', () => {
                const task = card.dataset.task;
                const rec = card.dataset.rec;
                const bags = card.dataset.bags;

                modalProjectTitle.innerText = `For a ${task}`;
                modalRecSize.innerText = `${rec} Yard Dumpster`;
                modalBags.innerText = `~${bags}`;
                modalCta.href = `#listings`;

                modal.classList.add('active');
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        modalCta.addEventListener('click', () => {
            modal.classList.remove('active');
            // Smooth scroll will be handled by the browser because of the href hash.
        });
    }
});
