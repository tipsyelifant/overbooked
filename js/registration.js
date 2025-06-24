// js/registration.js

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const playerNameInput = document.getElementById('playerName');
    const accessCodeInput = document.getElementById('accessCode');
    const errorMessageElement = document.getElementById('errorMessage');
    const submitRegistrationBtn = document.getElementById('submitRegistrationBtn');

    // Predefined valid access codes for MVP
    const validAccessCodes = ['LEAN101', 'GEMBA24', 'OVERCOOKED', 'DANGUGU'];

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            // Clear previous error messages
            if (errorMessageElement) errorMessageElement.textContent = '';
            if (submitRegistrationBtn) submitRegistrationBtn.disabled = true; // Prevent double submission


            const playerName = playerNameInput.value.trim();
            const accessCode = accessCodeInput.value.trim().toUpperCase(); // Standardize access code input

            // Basic Validation
            if (!playerName) {
                displayError('Please enter your name or nickname.');
                if (submitRegistrationBtn) submitRegistrationBtn.disabled = false;
                playerNameInput.focus();
                return;
            }
            if (!accessCode) {
                displayError('Please enter the access code.');
                if (submitRegistrationBtn) submitRegistrationBtn.disabled = false;
                accessCodeInput.focus();
                return;
            }

            // Simulate server validation / code check
            // For MVP, just check against the predefined list
            if (validAccessCodes.includes(accessCode)) {
                // Success!
                console.log('Registration successful:', playerName, accessCode);
                
                // Store registration details using progressManager from main.js
                if (window.progressManager) {
                    window.progressManager.setItem('userRegistered', true);
                    window.progressManager.setItem('userName', playerName);
                    window.progressManager.setItem('gameAccessCode', accessCode); // Store for reference if needed
                } else {
                    // Fallback if main.js progressManager isn't loaded (should not happen)
                    localStorage.setItem('userRegistered', JSON.stringify(true));
                    localStorage.setItem('userName', JSON.stringify(playerName));
                }
                
                // Navigate to the story page
                if (window.navigateTo) {
                    window.navigateTo('story.html');
                } else {
                    window.location.href = 'story.html'; // Fallback navigation
                }

            } else {
                // Invalid access code
                displayError('Invalid access code. Please check and try again.');
                if (submitRegistrationBtn) submitRegistrationBtn.disabled = false;
                accessCodeInput.focus();
            }
        });
    }

    function displayError(message) {
        if (errorMessageElement) {
            errorMessageElement.textContent = message;
            // Consider adding class for styling error messages if not already handled by .error-message
        } else {
            console.error(message); // Fallback if error element is missing
        }
    }

    // If user is already registered, perhaps offer a way to proceed or reset?
    // For MVP, just let them re-register or navigate away.
    if (window.progressManager && window.progressManager.getItem('userRegistered')) {
        console.log('User already registered. Current page is registration.html.');
        // Optionally, redirect to story.html or puzzle1.html if they have progressed further.
        // Or display a message: "You are already registered. Go to [Story] or [Puzzle]"
    }
});
