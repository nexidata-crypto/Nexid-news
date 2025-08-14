// This single script manages the entire dashboard.

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const tabLinks = document.querySelectorAll('.tab-link');

    // This function fetches the HTML for a page and then runs its specific init function.
    const loadPage = async (pageName) => {
        try {
            mainContent.innerHTML = '<div class="loader" style="display:block;"></div>';
            
            const response = await fetch(`${pageName}.html`);
            if (!response.ok) {
                throw new Error(`Page not found: ${pageName}.html`);
            }
            const html = await response.text();
            mainContent.innerHTML = html;

            // After loading the HTML, run the corresponding JavaScript initializer
            switch (pageName) {
                case 'sitemap':
                    initSitemapAnalysis();
                    break;
                case 'youtube':
                    initYoutubeAnalysis();
                    break;
                case 'semrush':
                    initSemrushAnalysis();
                    break;
            }
        } catch (error) {
            mainContent.innerHTML = `<div class="error-message">Error loading page: ${error.message}</div>`;
            console.error(error);
        }
    };

    // Set up sidebar navigation
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-page');
            
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            loadPage(pageName);
        });
    });

    // Load the default page on startup
    loadPage('sitemap');
});


// ===================================================================================
// SITEMAP ANALYSIS LOGIC
// ===================================================================================
function initSitemapAnalysis() {
    const newsForm = document.getElementById('newsForm');
    if (!newsForm) return; // Exit if the correct HTML isn't loaded

    const newsUrlInput = document.getElementById('newsUrlInput');
    const addUrlBtn = document.getElementById('addUrlBtn');
    const urlTagsContainer = document.getElementById('url-tags-container');
    const resultsContainer = document.getElementById('results-container');
    const loader = document.getElementById('loader');
    const scorecardSection = document.getElementById('scorecard-section');
    const dashboard = document.getElementById('dashboard');
    let timelineChartInstance, distributionPieChartInstance;
    let allArticlesData = [];
    const sourceColors = ['#22d3ee', '#f472b6', '#a3e635', '#fde047', '#f97316', '#8b5cf6'];
    const API_URL = 'https://script.google.com/macros/s/AKfycbxSXBPKvT4HxXNig1DiE2D3147l9Syq6BIIcXn9YP1b2Ee8tofTJrZtYZ7FAstG5fB8MA/exec';

    const addUrlTag = (url) => {
        if (!url) return;
        const tag = document.createElement('div');
        tag.className = 'url-tag';
        const textSpan = document.createElement('span');
        textSpan.textContent = url;
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-tag';
        removeBtn.innerHTML = '&times;';
        removeBtn.onclick = () => tag.remove();
        tag.appendChild(textSpan);
        tag.appendChild(removeBtn);
        urlTagsContainer.appendChild(tag);
        newsUrlInput.value = '';
        newsUrlInput.focus();
    };

    addUrlBtn.addEventListener('click', () => addUrlTag(newsUrlInput.value.trim()));
    newsUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addUrlTag(newsUrlInput.value.trim());
        }
    });

    newsForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // ... (rest of the sitemap submit logic remains the same)
    });

    // ... (all other helper functions from sitemap.html go here)
}


// ===================================================================================
// YOUTUBE ANALYSIS LOGIC
// ===================================================================================
function initYoutubeAnalysis() {
    const youtubeForm = document.getElementById('youtubeForm');
    if (!youtubeForm) return; // Exit if the correct HTML isn't loaded
    
    // ... (all variables and functions from youtube.html's script go here)
}


// ===================================================================================
// SEMRUSH ANALYSIS LOGIC
// ===================================================================================
function initSemrushAnalysis() {
    const semrushForm = document.getElementById('semrushForm');
    if (!semrushForm) return; // Exit if the correct HTML isn't loaded

    const domainInput = document.getElementById('domainInput');
    const loader = document.getElementById('loader');
    const resultsContainer = document.getElementById('results-container');
    const scorecardSection = document.getElementById('scorecard-section');
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxoJiLDg6IRq5Whm05syo_km-y4u_NSvn4v7nKzK5J3-e5uHvLMRvexGF_iw5Da130nzQ/exec';

    semrushForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // ... (rest of the semrush submit logic remains the same)
    });

    function displayScorecards(data) {
        // ... (the displayScorecards function from semrush.html goes here)
    }
}
