export function addMarkersToMap(filteredResults) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Add new markers
    filteredResults.forEach(result => {
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(result.latitude), lng: parseFloat(result.longitude) },
            map: map,
            title: result.name
        });
        markers.push(marker);
    });

    // Fit map to markers
    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
}
