import { displayResultsPage } from './displayResultsPage.js';

export function changePage(delta) {
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= Math.ceil(filteredResults.length / resultsPerPage)) {
        displayResultsPage(newPage);
    }
}
