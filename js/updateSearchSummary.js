export function updateSearchSummary(searchParams, totalResults) {
    const searchSummary = document.getElementById('searchSummary');
    const { keyword, location, radius } = searchParams;

    searchSummary.innerHTML = `
        <p>Showing ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${keyword}" 
        within ${radius} miles of ${location}</p>
    `;
}
