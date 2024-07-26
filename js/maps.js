let map;
let markers = [];

export function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.0902, lng: -95.7129 },
        zoom: 4,
    });
}

export function addMarkersToMap(results) {
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

window.initMap = initMap;
