import { downloadResults } from './downloadResults.js';
import { setupPagination } from './pagination.js';

export function displayResultsPage(filteredResults, page) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    function displayPageResults(pageResults, currentPage, totalPages) {
        // Sort the pageResults array by distance
        pageResults.sort((a, b) => a.distance - b.distance);
    
        resultsDiv.innerHTML = '';
        pageResults.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div class="result-info">
                    <h3>${result.name}</h3>
                    <p>${result.address}</p>
                    <p>Phone: ${result.phone}</p>
                    <p>Distance: ${result.distance} miles</p>
                    <p>Website: <a href="${result.website}" target="_blank">${result.website}</a></p>
                </div>
            `;
            resultsDiv.appendChild(resultItem);
        });
        const paginationDiv = document.createElement('div');
        paginationDiv.id = 'pagination';
        resultsDiv.appendChild(paginationDiv);
        const downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.textContent = 'Download Results';
        downloadButton.onclick = () => downloadResults(filteredResults);
        resultsDiv.appendChild(downloadButton);
    }
    setupPagination(filteredResults, displayPageResults);
    window.changePage(0); // This will display the first page
}
