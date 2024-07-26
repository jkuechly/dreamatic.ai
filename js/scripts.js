// In /js/scripts.js

import { initMap, addMarkersToMap, updateMapWithFilteredResults, setOriginalSearchArea, toggleOriginalSearchArea } from './maps.js';
import { fetchSheetData } from './fetchSheetData.js';
import { displayResults } from './displayResults.js';

let geocoder;
let originalSearchParams;
let allResults = [];

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const loadingDiv = document.getElementById('loading');

    // Set default values
    document.getElementById('keyword').value = 'dentist';
    document.getElementById('location').value = 'Atlanta, GA';
    document.getElementById('radius').value = '10';

    // Initialize geocoder
    geocoder = new google.maps.Geocoder();

    if (searchForm) {
        searchForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const keyword = document.getElementById('keyword').value || 'dentist';
            const location = document.getElementById('location').value || 'Atlanta, GA';
            const radius = document.getElementById('radius').value || '10';

            loadingDiv.style.display = 'block';

            try {
                // Geocode the location
                const geocodeResult = await geocodeLocation(location);
                const { lat, lng } = geocodeResult;

                // Save original search parameters
                originalSearchParams = { keyword, location: `${lat},${lng}`, radius };

                const data = await fetchSheetData(keyword, `${lat},${lng}`, radius);
                console.log('Received data:', data);
                if (data.results && Array.isArray(data.results)) {
                    allResults = data.results;  // Store all results
                    
                    // Switch to results view
                    const searchContainer = document.getElementById('searchContainer');
                    const resultsContainer = document.getElementById('resultsContainer');
                    if (searchContainer && resultsContainer) {
                        searchContainer.style.display = 'none';
                        resultsContainer.style.display = 'flex';
                    } else {
                        console.error("Search or results container not found");
                    }
                    
                    displayResults({
                        results: data.results,
                        searchParams: { keyword, location, radius }
                    });
                    setOriginalSearchArea(lat, lng, parseFloat(radius));
                    updateMapWithFilteredResults(data.results, lat, lng, parseFloat(radius));
                    
                    // Autofill the filter menu with the original search coordinates
                    setTimeout(() => {
                        const anchorLatInput = document.getElementById('anchorLat');
                        const anchorLngInput = document.getElementById('anchorLng');
                        const filterRadiusInput = document.getElementById('filterRadius');
                        
                        if (anchorLatInput && anchorLngInput && filterRadiusInput) {
                            anchorLatInput.value = lat;
                            anchorLngInput.value = lng;
                            filterRadiusInput.value = radius;
                        } else {
                            console.error('Filter inputs not found');
                        }
                    }, 100);
                } else {
                    throw new Error('Invalid data structure received');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while searching. Please try again.');
            } finally {
                loadingDiv.style.display = 'none';
            }
        });
    } else {
        console.error('Search form not found');
    }

    // Initialize map when the page loads
    window.addEventListener('load', initMap);
});

function geocodeLocation(address) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK') {
                const { lat, lng } = results[0].geometry.location;
                resolve({ lat: lat(), lng: lng() });
            } else {
                reject(new Error('Geocode was not successful for the following reason: ' + status));
            }
        });
    });
}

export function getAllResults() {
    return allResults;
}
