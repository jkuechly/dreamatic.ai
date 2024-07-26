let currentPage = 1;
const resultsPerPage = 10;

export function setupPagination(filteredResults, displayFunction) {
    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
    
    function updatePaginationControls() {
        let paginationDiv = document.getElementById('pagination');
        if (!paginationDiv) {
            paginationDiv = document.createElement('div');
            paginationDiv.id = 'pagination';
            document.getElementById('results').appendChild(paginationDiv);
        }
        paginationDiv.innerHTML = `
            <button onclick="window.changePage(-1)" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span id="currentPage">Page ${currentPage} of ${totalPages}</span>
            <button onclick="window.changePage(1)" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        `;
    }

    window.changePage = function(delta) {
        const newPage = currentPage + delta;
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            const startIndex = (currentPage - 1) * resultsPerPage;
            const endIndex = startIndex + resultsPerPage;
            const pageResults = filteredResults.slice(startIndex, endIndex);
            displayFunction(pageResults, currentPage, totalPages);
            updatePaginationControls();
        }
    };

    updatePaginationControls();
    window.changePage(0); // This will display the first page
}
