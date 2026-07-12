document.addEventListener('DOMContentLoaded', () => {
    // === WIZARD LOGIC ===
    let selectedTask = '';
    let selectedSize = '';
    
    const taskBtns = document.querySelectorAll('.task-btn');
    const sizeBtns = document.querySelectorAll('.size-btn');
    const nextBtn = document.getElementById('wiz-next');
    const prevBtn = document.getElementById('wiz-prev');
    const step1 = document.getElementById('wiz-step-1');
    const step2 = document.getElementById('wiz-step-2');
    const step3 = document.getElementById('wiz-step-3');
    
    if (taskBtns.length > 0) {
        // Step 1: Task Selection
        taskBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                taskBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedTask = btn.dataset.task;
                nextBtn.style.display = 'inline-block';
            });
        });

        nextBtn.addEventListener('click', () => {
            if (selectedTask) {
                step1.classList.remove('active');
                step2.classList.add('active');
            }
        });

        prevBtn.addEventListener('click', () => {
            step2.classList.remove('active');
            step1.classList.add('active');
        });

        // Step 2: Size Selection -> Calculate Result
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = btn.dataset.size;
                
                // Calculate recommendation
                calculateRecommendation();
                
                step2.classList.remove('active');
                step3.classList.add('active');
            });
        });

        function calculateRecommendation() {
            let recommendation = "10 Yard";
            let reason = "Perfect for small cleanouts and minor projects.";

            if (selectedSize === 'large' || selectedTask === 'commercial' || selectedTask === 'whole_house') {
                recommendation = "30 Yard";
                reason = "The largest capacity for major debris and whole-home projects.";
            } else if (selectedSize === 'medium' && (selectedTask === 'kitchen' || selectedTask === 'roofing')) {
                recommendation = "20 Yard";
                reason = "Our most popular size, ideal for mid-sized renovations and roofing.";
            } else if (selectedSize === 'medium') {
                recommendation = "15 Yard";
                reason = "Great for medium cleanouts and flooring removal.";
            } else if (selectedTask === 'roofing' || selectedTask === 'deck') {
                recommendation = "15 Yard";
                reason = "Provides enough length for materials like wood and shingles.";
            }

            document.getElementById('rec-size').innerText = recommendation;
            document.getElementById('rec-reason').innerText = reason;
        }

        document.getElementById('wiz-reset').addEventListener('click', () => {
            selectedTask = '';
            selectedSize = '';
            taskBtns.forEach(b => b.classList.remove('selected'));
            sizeBtns.forEach(b => b.classList.remove('selected'));
            nextBtn.style.display = 'none';
            step3.classList.remove('active');
            step1.classList.add('active');
        });
    }

    // === VISUALIZER LOGIC ===
    // (Hover logic is now entirely handled via CSS)
});
