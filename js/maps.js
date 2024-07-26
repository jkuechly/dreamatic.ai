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
        const markerView = new google.maps.marker.AdvancedMarkerView({
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
        
        markerView.addListener("click", () => {
            infoWindow.open(map, markerView);
        });
        
        markers.push(markerView);
    });

    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach((marker) => bounds.extend(marker.position));
        map.fitBounds(bounds);
    }
}

export function clearMarkers() {
    markers.forEach((marker) => marker.map = null);
    markers = [];
}
