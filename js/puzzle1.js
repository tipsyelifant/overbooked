// js/puzzle1.js

document.addEventListener('DOMContentLoaded', () => {
    // Check if user has viewed the story, if not, redirect
    if (!window.progressManager || !window.progressManager.getItem('storyViewed')) {
        console.warn('User has not viewed story. Redirecting to story.html.');
        // alert("Please view the story introduction before starting the puzzle."); // Optional user alert
        window.navigateTo('story.html');
        return; 
    }

    const puzzleScoreElement = document.getElementById('puzzleScore');
    const puzzleAttemptsElement = document.getElementById('puzzleAttempts');
    const kitchenPhotosGrid = document.getElementById('kitchen-photos-grid');
    const checkAnswersBtn = document.getElementById('checkAnswersBtn');
    const puzzleFeedbackElement = document.getElementById('puzzle-feedback');
    const puzzlePlayerNameElement = document.getElementById('puzzlePlayerName');
    const learningExplanationElement = document.getElementById('learning-explanation');
    const continueToNextPhaseBtn = document.getElementById('continueToNextPhaseBtn');

    const processes = [
        "Ingredient Receiving & Storage",
        "Ingredient Washing & Cleaning",
        "Ingredient Preparation & Cutting",
        "Broth Preparation & Cooking",
        "Ingredient Plating & Portioning",
        "Sauce Mixing & Preparation",
        "Cooked Items Preparation",
        "Order Assembly & Expediting"
    ];

    // Simplified mapping for MVP: photo index corresponds to process index for "correct" answer
    // In a real scenario, this mapping would be deliberate and potentially randomized or fixed
    // photos[0] correct answer is processes[0], photos[1] correct answer is processes[1], etc.
    const photoData = [
        { id: 1, imgSrc: 'images/kitchen-scenes/placeholder1.png', alt: 'Chaotic kitchen scene 1', correctProcess: processes[0] },
        { id: 2, imgSrc: 'images/kitchen-scenes/placeholder2.png', alt: 'Chaotic kitchen scene 2', correctProcess: processes[1] },
        { id: 3, imgSrc: 'images/kitchen-scenes/placeholder3.png', alt: 'Chaotic kitchen scene 3', correctProcess: processes[2] },
        { id: 4, imgSrc: 'images/kitchen-scenes/placeholder4.png', alt: 'Chaotic kitchen scene 4', correctProcess: processes[3] },
        { id: 5, imgSrc: 'images/kitchen-scenes/placeholder5.png', alt: 'Chaotic kitchen scene 5', correctProcess: processes[4] },
        { id: 6, imgSrc: 'images/kitchen-scenes/placeholder6.png', alt: 'Chaotic kitchen scene 6', correctProcess: processes[5] },
        { id: 7, imgSrc: 'images/kitchen-scenes/placeholder7.png', alt: 'Chaotic kitchen scene 7', correctProcess: processes[6] },
        { id: 8, imgSrc: 'images/kitchen-scenes/placeholder8.png', alt: 'Chaotic kitchen scene 8', correctProcess: processes[7] }
    ];

    let score = 0;
    let attempts = 0;

    function initializePuzzle() {
        if(puzzlePlayerNameElement && window.progressManager) {
            puzzlePlayerNameElement.textContent = window.progressManager.getItem('userName') || 'Chef';
        }

        if (!kitchenPhotosGrid) return;
        kitchenPhotosGrid.innerHTML = ''; // Clear existing example

        photoData.forEach(photo => {
            const slot = document.createElement('div');
            slot.className = 'photo-slot';
            slot.dataset.photoId = photo.id;

            const img = document.createElement('img');
            img.src = photo.imgSrc;
            img.alt = photo.alt;
            img.className = 'kitchen-photo';
            slot.appendChild(img);

            const select = document.createElement('select');
            select.className = 'process-select';
            select.dataset.photoId = photo.id;
            select.setAttribute('aria-label', `Select process for ${photo.alt}`);
            
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Select Process...";
            select.appendChild(defaultOption);

            // Shuffle processes for variety in dropdown, or keep ordered
            processes.forEach(process => {
                const option = document.createElement('option');
                option.value = process;
                option.textContent = process;
                select.appendChild(option);
            });
            slot.appendChild(select);

            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'feedback-area';
            feedbackDiv.setAttribute('aria-live', 'polite');
            slot.appendChild(feedbackDiv);
            
            kitchenPhotosGrid.appendChild(slot);
        });
        updateScoreDisplay();
    }

    function updateScoreDisplay() {
        if (puzzleScoreElement) puzzleScoreElement.textContent = score;
        if (puzzleAttemptsElement) puzzleAttemptsElement.textContent = attempts;
    }

    function checkAnswers() {
        attempts++;
        score = 0;
        let allAnswered = true;

        const selects = kitchenPhotosGrid.querySelectorAll('.process-select');
        selects.forEach((select, index) => {
            const photoId = parseInt(select.dataset.photoId);
            const selectedProcess = select.value;
            const photoInfo = photoData.find(p => p.id === photoId);
            const feedbackArea = select.closest('.photo-slot').querySelector('.feedback-area');
            
            if (!selectedProcess) {
                allAnswered = false;
            }

            if (photoInfo && selectedProcess === photoInfo.correctProcess) {
                score++;
                if(feedbackArea) feedbackArea.textContent = 'Correct!';
                if(feedbackArea) feedbackArea.className = 'feedback-area success'; // Add styling class
            } else if (selectedProcess) { // Only give 'Incorrect' if an answer was selected
                if(feedbackArea) feedbackArea.textContent = 'Incorrect.';
                if(feedbackArea) feedbackArea.className = 'feedback-area error'; // Add styling class
            } else {
                 if(feedbackArea) feedbackArea.textContent = ''; // Clear if not answered
                 if(feedbackArea) feedbackArea.className = 'feedback-area';
            }
        });

        updateScoreDisplay();

        if (!allAnswered && attempts === 1) { // Only show "answer all" on first incomplete attempt
             if (puzzleFeedbackElement) {
                puzzleFeedbackElement.textContent = "Please select a process for all photos.";
                puzzleFeedbackElement.className = 'feedback-message error pop-in';
            }
            return; // Don't proceed to success check if not all answered
        }


        if (score >= 6) { // Success criteria: 6 out of 8
            if (puzzleFeedbackElement) {
                puzzleFeedbackElement.textContent = `Great job! You identified ${score}/8 processes correctly. You're a natural Lean thinker!`;
                puzzleFeedbackElement.className = 'feedback-message success pop-in';
            }
            if (window.progressManager) {
                window.progressManager.setItem('puzzle1Completed', true);
                window.progressManager.setItem('puzzle1Score', score);
            }
            if (learningExplanationElement) window.showElement(learningExplanationElement);
            if (continueToNextPhaseBtn) window.showElement(continueToNextPhaseBtn);
            if (checkAnswersBtn) window.hideElement(checkAnswersBtn); // Hide check button after success
        } else {
            if (puzzleFeedbackElement) {
                puzzleFeedbackElement.textContent = `You identified ${score}/8. Keep trying! Observation is key. (Min. 6 needed to pass)`;
                puzzleFeedbackElement.className = 'feedback-message error pop-in';
            }
        }
    }

    if (checkAnswersBtn) {
        checkAnswersBtn.addEventListener('click', checkAnswers);
    }

    if (continueToNextPhaseBtn) {
        continueToNextPhaseBtn.addEventListener('click', () => {
            // For MVP, maybe navigate to a simple "Thank you for playing Phase 1" page or back to index.
            alert('Phase 1 Complete! Thank you for playing. More puzzles coming soon!');
            window.navigateTo('index.html'); 
        });
    }
    
    // If puzzle already completed, show a summary or allow replay?
    if (window.progressManager && window.progressManager.getItem('puzzle1Completed')) {
        // For MVP, perhaps just disable the puzzle and show the explanation and continue button
        const savedScore = window.progressManager.getItem('puzzle1Score') || 0;
        if (puzzleFeedbackElement) {
             puzzleFeedbackElement.textContent = `You previously completed this puzzle with a score of ${savedScore}/8.`;
             puzzleFeedbackElement.className = 'feedback-message success';
        }
        if (learningExplanationElement) window.showElement(learningExplanationElement);
        if (continueToNextPhaseBtn) window.showElement(continueToNextPhaseBtn);
        if (checkAnswersBtn) window.hideElement(checkAnswersBtn);
        // Disable selects to prevent re-answering
        kitchenPhotosGrid.querySelectorAll('.process-select').forEach(sel => sel.disabled = true);
    }


    initializePuzzle(); // Set up the puzzle on page load
});
