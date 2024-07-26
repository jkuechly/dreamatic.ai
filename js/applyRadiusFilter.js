import { haversineDistance } from './haversineDistance.js';
import { updateMapWithFilteredResults } from './maps.js';
import { displayResultsPage } from './displayResultsPage.js';
import { updateSearchSummary } from './updateSearchSummary.js';

export function applyRadiusFilter(allResults) {
    const anchorLat = parseFloat(document.getElementById('anchorLat').value);
    const anchorLng = parseFloat(document.getElementById('anchorLng').value);
    const filterRadius = parseFloat(document.getElementById('filterRadius').value);
    const initialRadius = parseFloat(document.getElementById('radius').value);

    if (isNaN(anchorLat) || isNaN(anchorLng) || isNaN(filterRadius)) {
        alert('Please enter valid numbers for latitude, longitude, and radius.');
        return;
    }

    if (filterRadius < 1 || filterRadius > initialRadius) {
        alert(`Radius must be between 1 and ${initialRadius} miles.`);
        return;
    }

    const filteredResults = allResults.filter(result => {
        const distance = haversineDistance(anchorLat, anchorLng, parseFloat(result.latitude), parseFloat(result.longitude));
        return distance <= filterRadius;
    });

    updateMapWithFilteredResults(filteredResults, anchorLat, anchorLng, filterRadius);
    displayResultsPage(filteredResults, 1);
    
    const keyword = document.getElementById('keyword').value;
    const location = `${anchorLat}, ${anchorLng}`;
    updateSearchSummary({ keyword, location, radius: filterRadius }, filteredResults.length);
}
