// In /js/displayResults.js

import { switchToResultsView } from './switchToResultsView.js';
import { displayResultsPage } from './displayResultsPage.js';
import { updateSearchSummary } from './updateSearchSummary.js';
import { initializeFilters } from './initializeFilters.js';
import { addMarkersToMap } from './maps.js';

export function displayResults(data) {
    const { results, searchParams } = data;
    switchToResultsView();
    displayResultsPage(results, 1);
    updateSearchSummary(searchParams, results.length);
    addMarkersToMap(results);

    // Ensure the results container is visible
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.style.display = 'flex';
    }

    // Use setTimeout to ensure the DOM has been updated before initializing filters
    setTimeout(() => {
        initializeFilters();
    }, 100);  // Increased timeout to 100ms to give more time for DOM update
}
