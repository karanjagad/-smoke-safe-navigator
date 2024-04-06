import L from 'leaflet';

// Create a Leaflet map instance
const createMap = () => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    return map;
};

// Function to check if a point is within the school radius
const isWithinSchoolRadius = (latlng) => {
    // Implement your logic to check if the point is within the school radius
    // You can use a library like Turf.js for geospatial calculations
    // Return true if the point is within the radius, false otherwise
};

// Function to check if a point is within the pedestrian walk
const isWithinPedestrianWalk = (latlng) => {
    // Implement your logic to check if the point is within the pedestrian walk
    // Return true if the point is within the pedestrian walk, false otherwise
};

// Function to apply the rules and mark the map
const applyRules = (map) => {
    // Clear previous markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Get the current map bounds
    const bounds = map.getBounds();

    // Iterate over the bounds and check each point against the rules
    for (let lat = bounds.getSouth(); lat <= bounds.getNorth(); lat += 0.001) {
        for (let lng = bounds.getWest(); lng <= bounds.getEast(); lng += 0.001) {
            const latlng = L.latLng(lat, lng);

            // Check if the point is within the school radius
            if (isWithinSchoolRadius(latlng)) {
                L.marker(latlng, { icon: L.icon({ iconUrl: 'red-marker.png' }) }).addTo(map);
            }

            // Check if the point is within the pedestrian walk
            if (isWithinPedestrianWalk(latlng)) {
                L.marker(latlng, { icon: L.icon({ iconUrl: 'red-marker.png' }) }).addTo(map);
            }
        }
    }
};

export { createMap, applyRules };
