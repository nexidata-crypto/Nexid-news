document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const tabLinks = document.querySelectorAll('.tab-link');

    // Function to load page content
    const loadPage = async (pageUrl) => {
        try {
            // Loader indicator
            mainContent.innerHTML = '<div class="loader" style="display:block; border-bottom-color: var(--accent-1);"></div>';
            
            const response = await fetch(pageUrl);
            if (!response.ok) {
                throw new Error(`Could not find the file '${pageUrl}'.`);
            }
            const content = await response.text();
            mainContent.innerHTML = content;
            
        } catch (error) {
            console.error(error);
            // If opened via file:// instead of server
            if (window.location.protocol === 'file:') {
                mainContent.innerHTML = `
                    <div class="error-message">
                        <strong>Loading Failed!</strong><br><br>
                        This dashboard must be run on a local web server.<br>
                        💡 Please use 'Open with Live Server' or host it locally.
                    </div>`;
            } else {
                mainContent.innerHTML = `<div class="error-message">Error loading page: ${error.message}</div>`;
            }
        }
    };

    // Function to handle tab change
    const handleTabChange = (link) => {
        const pageToLoad = link.getAttribute('data-page');
        
        // Update active class
        tabLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Load content
        loadPage(pageToLoad);
    };

    // Add event listeners for clicks
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleTabChange(link);
        });

        // Also allow Enter key navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
                handleTabChange(link);
            }
        });
    });

    // Load default tab content
    const defaultPage = document.querySelector('.tab-link.active').getAttribute('data-page');
    loadPage(defaultPage);
});
