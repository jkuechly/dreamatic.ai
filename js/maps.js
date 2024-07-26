let map;
let markers = [];

export function initMap() {
    const mapElement = document.getElementById("map");
    if (mapElement) {
        map = new google.maps.Map(mapElement, {
            center: { lat: 37.0902, lng: -95.7129 },
            zoom: 4,
        });
    } else {
        console.error("Map container not found");
    }
}

export function addMarkersToMap(results) {
    if (!map) {
        console.error("Map not initialized");
        return;
    }
    clearMarkers();
    results.forEach((result) => {
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(result.latitude), lng: parseFloat(result.longitude) },
            map: map,
            title: result.name,
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div>
                    <h3>${result.name}</h3>
                    <p>${result.address}</p>
                    <p>Phone: ${result.phone}</p>
                    <p><a href="${result.website}" target="_blank">Website</a></p>
                </div>
            `,
        });
        
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
        
        markers.push(marker);
    });

    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach((marker) => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
}

export function clearMarkers() {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
}

export function updateMapWithFilteredResults(filteredResults, anchorLat, anchorLng, filterRadius) {
    clearMarkers();
    addMarkersToMap(filteredResults);

    const radiusCircle = new google.maps.Circle({
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
