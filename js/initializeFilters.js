import { applyRadiusFilter } from './applyRadiusFilter.js';

export function initializeFilters(allResults) {
    document.getElementById('applyRadiusFilter').addEventListener('click', () => applyRadiusFilter(allResults));
}
