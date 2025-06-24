// js/main.js

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log('Overbooked Game Initialized - main.js');

    // --- Navigation Helper ---
    // Simplifies page navigation
    window.navigateTo = function(pageUrl) {
        // Basic transition effect trigger (optional)
        document.body.classList.add('page-exit-active');
        setTimeout(() => {
            window.location.href = pageUrl;
        }, 300); // Match CSS transition time
    };
    
    // Apply enter animation if a page has just loaded (optional)
    // Needs to be coordinated with how pages are structured or if using a single page app model
    // For multi-page, this will apply on every load.
    // setTimeout(() => { // Timeout to allow page content to render before animation
    //     document.body.classList.add('page-enter-active');
    // }, 50);


    // --- LocalStorage Progress Helpers ---
    window.progressManager = {
        setItem: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('Error saving to localStorage', e);
            }
        },
        getItem: function(key) {
            try {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : null;
            } catch (e) {
                console.error('Error reading from localStorage', e);
                return null;
            }
        },
        removeItem: function(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.error('Error removing from localStorage', e);
            }
        },
        clearProgress: function() { // Clears all game-related progress
            // Example keys, expand as needed
            const gameKeys = ['userRegistered', 'userName', 'gameAccessCode', 'storyViewed', 'puzzle1Completed', 'puzzle1Score'];
            gameKeys.forEach(key => this.removeItem(key));
            console.log('Game progress cleared.');
        }
    };

    // --- Global UI Element Event Listeners (Example for a potential shared nav or modal) ---
    // e.g., const mobileMenuButton = document.getElementById('mobileMenuBtn');
    // if (mobileMenuButton) {
    //     mobileMenuButton.addEventListener('click', () => { /* toggle menu */ });
    // }

    // --- Page specific initializers can be called from here or within their own scripts ---
    // Example: If on landing page, initialize landing page specific scripts
    if (document.getElementById('landing-page')) {
        initLandingPage();
    }
    // Registration page logic is in registration.js
    // Story page logic
    if (document.getElementById('story-page')) {
        initStoryPage();
    }
    // Puzzle 1 page logic is in puzzle1.js
});


// --- Landing Page Specific Logic (called from DOMContentLoaded) ---
function initLandingPage() {
    const startGameBtn = document.getElementById('startGameBtn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            console.log('Start Game button clicked');
            window.navigateTo('registration.html');
        });
    }

    // Activate kitchen chaos background animation
    const kitchenBg = document.getElementById('kitchen-chaos-bg');
    if (kitchenBg) {
        kitchenBg.classList.add('animated');
    }
}

// --- Story Page Specific Logic ---
function initStoryPage() {
    // Check if user is registered, if not, redirect
    if (!window.progressManager.getItem('userRegistered')) {
        console.warn('User not registered. Redirecting to registration.');
        window.navigateTo('registration.html');
        return; // Stop further execution
    }

    const playerName = window.progressManager.getItem('userName') || 'Chef';
    const storyPlayerNameElement = document.getElementById('storyPlayerName');
    const storyPlayerNameAgainElement = document.getElementById('storyPlayerNameAgain'); // Second span
    
    if (storyPlayerNameElement) {
        storyPlayerNameElement.textContent = playerName;
    }
    if (storyPlayerNameAgainElement) { // Update the second span too
        storyPlayerNameAgainElement.textContent = playerName;
    }
    
    const beginPuzzleBtn = document.getElementById('beginPuzzleBtn');
    if (beginPuzzleBtn) {
        beginPuzzleBtn.addEventListener('click', () => {
            console.log('Begin Puzzle button clicked');
            window.progressManager.setItem('storyViewed', true);
            window.navigateTo('puzzle1.html');
        });
    }
}

// --- Utility Functions ---
// Show/Hide elements
window.showElement = function(element) {
    if (element) element.classList.remove('hidden');
}
window.hideElement = function(element) {
    if (element) element.classList.add('hidden');
}

// Display loading state (simple example)
window.setLoadingState = function(buttonElement, isLoading) {
    if (!buttonElement) return;
    if (isLoading) {
        buttonElement.disabled = true;
        buttonElement.innerHTML = '<div class="loader"></div>'; // Assumes .loader CSS is defined
    } else {
        buttonElement.disabled = false;
        // Restore original button text - this needs to be stored or passed
        // For now, a generic approach or specific text reset in calling function
    }
}
