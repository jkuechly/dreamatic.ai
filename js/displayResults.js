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
    initializeFilters(results);
    addMarkersToMap(results);
}
