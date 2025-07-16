// Find geolocation
navigator.geolocation.getCurrentPosition(success, error);
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchNearestStop(lat, lon);
}

function error() {
    alert("Unable to retrieve your location");
}


// Find nearest bus stop
function fetchNearestStop(lat, lon) {
    const radius = 100; // in metres
    const url = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=${radius}&modes=bus`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.stopPoints.length === 0) {
                console.log("No bus stops found nearby.");
                return;
            }

            // Sort by distance to find the closest
            const nearest = data.stopPoints.sort((a, b) => a.distance - b.distance)[0];

            console.log("Nearest Stop ID:", nearest.id);
            console.log("Stop Name:", nearest.commonName);
            console.log("Indicator:", nearest.indicator);

            // Update heading

            document.getElementById("nearestName").textContent = `Bus times from: ${nearest.commonName} (Stop ${nearest.indicator.replace(/[^a-zA-Z]+/g, '')})`;

            // Call arrivals function
            fetchArrivals(nearest.id, "arrivals3");
        })
        .catch(err => console.error("Error fetching stop points:", err));
}