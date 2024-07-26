// In /js/initializeFilters.js

import { applyRadiusFilter } from './applyRadiusFilter.js';
import { getAllResults } from './scripts.js';

export function initializeFilters() {
    document.getElementById('applyFilter').addEventListener('click', () => applyRadiusFilter(getAllResults()));
}
