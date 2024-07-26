// In /js/initializeFilters.js

import { applyRadiusFilter } from './applyRadiusFilter.js';
import { getAllResults } from './scripts.js';

export function initializeFilters() {
    console.log("Initializing filters...");
    const filterMenu = document.getElementById('filterMenu');
    console.log("Filter menu found:", !!filterMenu);
    
    const applyFilterButton = document.getElementById('applyFilter');
    console.log("Apply filter button found:", !!applyFilterButton);
    
    if (applyFilterButton) {
        applyFilterButton.addEventListener('click', () => {
            console.log("Filter button clicked");
            applyRadiusFilter(getAllResults());
        });
        console.log("Event listener added to apply filter button");
    } else {
        console.error("Apply filter button not found");
        // Log the entire resultsContainer HTML for debugging
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            console.log("Results container HTML:", resultsContainer.innerHTML);
        } else {
            console.error("Results container not found");
        }
    }
}
