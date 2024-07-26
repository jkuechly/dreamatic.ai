import { initMap } from './maps.js';
import { fetchSheetData } from './fetchSheetData.js';
import { displayResults } from './displayResults.js';

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const loadingDiv = document.getElementById('loading');

    if (searchForm) {
        searchForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const keyword = document.getElementById('keyword').value;
            const location = document.getElementById('location').value;
            const radius = document.getElementById('radius').value;

            loadingDiv.style.display = 'block';

            try {
                const data = await fetchSheetData(keyword, location, radius);
                console.log('Received data:', data);
                if (data.results && Array.isArray(data.results)) {
                    displayResults({
                        results: data.results,
                        searchParams: { keyword, location, radius }
                    });
                } else {
                    throw new Error('Invalid data structure received');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while searching. Please try again.');
            } finally {
                loadingDiv.style.display = 'none';
            }
        });
    } else {
        console.error('Search form not found');
    }

    // Initialize map when the page loads
    window.addEventListener('load', initMap);
});
