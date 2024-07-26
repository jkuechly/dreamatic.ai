import { downloadResults } from './downloadResults.js';
import { setupPagination } from './pagination.js';

export function displayResultsPage(filteredResults, page) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear existing results

    function displayPageResults(pageResults, currentPage, totalPages) {
        resultsDiv.innerHTML = ''; // Clear existing results before displaying new ones
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

        // Add download button
        const downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.textContent = 'Download Results';
        downloadButton.onclick = () => downloadResults(filteredResults);
        resultsDiv.appendChild(downloadButton);
    }

    setupPagination(filteredResults, displayPageResults);
}
