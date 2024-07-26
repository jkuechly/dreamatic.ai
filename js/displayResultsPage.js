export function displayResultsPage(page) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = Math.min(startIndex + resultsPerPage, filteredResults.length);
    const pageResults = filteredResults.slice(startIndex, endIndex);

    pageResults.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div class="result-info">
                <h3>${result.name}</h3>
                <p>${result.address}</p>
                <p>Phone: ${result.phone}</p>
                <p>Website: <a href="${result.website}" target="_blank">${result.website}</a></p>
                <p>Latitude: ${result.latitude}</p>
                <p>Longitude: ${result.longitude}</p>
            </div>
        `;
        resultsDiv.appendChild(resultItem);
    });

    const paginationDiv = document.createElement('div');
    paginationDiv.id = 'pagination';
    paginationDiv.innerHTML = `
        <button onclick="changePage(-1)" ${page === 1 ? 'disabled' : ''}>Previous</button>
        <span id="currentPage">Page ${page} of ${Math.ceil(filteredResults.length / resultsPerPage)}</span>
        <button onclick="changePage(1)" ${endIndex >= filteredResults.length ? 'disabled' : ''}>Next</button>
    `;
    resultsDiv.appendChild(paginationDiv);

    const downloadButton = document.createElement('button');
    downloadButton.id = 'downloadButton';
    downloadButton.textContent = 'Download Results';
    downloadButton.onclick = downloadResults;
    resultsDiv.appendChild(downloadButton);

    currentPage = page;
    updateSearchSummary();
}
