// In /js/initializeFilters.js

import { applyRadiusFilter } from './applyRadiusFilter.js';
import { getAllResults } from './scripts.js';

export function initializeFilters() {
    const applyFilterButton = document.getElementById('applyFilter');
    if (applyFilterButton) {
        applyFilterButton.addEventListener('click', () => applyRadiusFilter(getAllResults()));
    } else {
        console.error("Apply filter button not found");
    }
}
