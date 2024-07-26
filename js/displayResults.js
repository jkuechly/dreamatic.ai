import { switchToResultsView } from './switchToResultsView.js';
import { displayResultsPage } from './displayResultsPage.js';
import { updateSearchSummary } from './updateSearchSummary.js';
import { initializeFilters } from './initializeFilters.js';
import { addMarkersToMap } from './addMarkersToMap.js';

export function displayResults(data) {
    searchResults = data.results;
    filteredResults = searchResults;
    switchToResultsView();
    displayResultsPage(1);
    updateSearchSummary();
    initializeFilters();
    addMarkersToMap(filteredResults);
}
