import { clearMarkers } from './clearMarkers.js';
import { addMarkersToMap } from './addMarkersToMap.js';

let radiusCircle;

export function updateMapWithFilteredResults(filteredResults, anchorLat, anchorLng, filterRadius) {
    clearMarkers();
    addMarkersToMap(filteredResults);

    if (radiusCircle) {
        radiusCircle.setMap(null);
    }

    radiusCircle = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        center: { lat: anchorLat, lng: anchorLng },
        radius: filterRadius * 1609.34 // Convert miles to meters
    });

    map.fitBounds(radiusCircle.getBounds());
}
