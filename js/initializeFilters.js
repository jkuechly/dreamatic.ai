import { applyRadiusFilter } from './applyRadiusFilter.js';

export function initializeFilters() {
    document.getElementById('applyRadiusFilter').addEventListener('click', applyRadiusFilter);
}
