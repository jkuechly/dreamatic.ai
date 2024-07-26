export function updateSearchSummary() {
    const searchSummary = document.getElementById('searchSummary');
    const keyword = document.getElementById('keyword').value;
    const location = document.getElementById('location').value;
    const radius = document.getElementById('radius').value;
    const displayedResults = Math.min(currentPage * resultsPerPage, filteredResults.length);

    searchSummary.innerHTML = `
        <p>Showing ${displayedResults} of ${searchResults.length} results for "${keyword}" 
        within ${radius} miles of ${location}</p>
    `;
}
