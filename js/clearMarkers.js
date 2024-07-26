export function clearMarkers() {
    if (markers) {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
    }
}
