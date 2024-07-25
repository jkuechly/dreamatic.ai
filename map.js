let map;
let markers = []

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.0902, lng: -95.7129 },
        zoom: 4,
    });
}

function addMarkersToMap(results) {
  // Clear existing markers
  clearMarkers();

  // Add new markers for each result
  results.forEach((result) => {
    const marker = new google.maps.Marker({
      position: { lat: parseFloat(result.latitude), lng: parseFloat(result.longitude) },
      map: map,
      title: result.name,
    });

    // Add info window to marker
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

  // Fit map to markers
  if (markers.length > 0) {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => bounds.extend(marker.getPosition()));
    map.fitBounds(bounds);
  }
}

function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

// Initialize the map when the page loads
google.maps.event.addDomListener(window, "load", initMap);
