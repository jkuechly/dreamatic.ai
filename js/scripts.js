import { fetchSheetData } from './fetchSheetData.js';
import { displayResults } from './displayResults.js';
import { downloadResults } from './downloadResults.js';
import { updateSearchSummary } from './updateSearchSummary.js';
import { initializeFilters } from './initializeFilters.js';
import { applyRadiusFilter } from './applyRadiusFilter.js';
import { haversineDistance } from './haversineDistance.js';
import { updateMapWithFilteredResults } from './updateMapWithFilteredResults.js';
import { showDownloadNotification } from './showDownloadNotification.js';

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
});
