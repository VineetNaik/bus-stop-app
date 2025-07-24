// Find geolocation
navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
});
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    showNearestStops(lat, lon);
}

function error() {
    alert("Unable to retrieve your location");
}


// Find nearest bus stop
function showNearestStops(lat, lon) {
    const radius = 500;
    const url = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=${radius}&modes=bus`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.stopPoints.length === 0) {
                console.log("No bus stops found nearby.");
                return;
            }

            // Sort by distance to find the closest
            const stops = data.stopPoints
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 5);

            const container = document.getElementById("drop1");
            container.innerHTML = '';

            //create default option
            const defaultOption = document.createElement('option');
            defaultOption.textContent = "Select a stop";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            container.appendChild(defaultOption);

            //create option elements
            stops.forEach(stop => {
                let stopIndicator = stop.indicator.replace(/[^a-zA-Z ]+/g, '');
                if (!stopIndicator.includes("Stop")) {
                    stopIndicator = "Stop " + stopIndicator;
                }

                const option = document.createElement('option');
                option.textContent = `${stop.commonName} (${stopIndicator})`;
                option.value = stop.naptanId;
                option.setAttribute('data-indicator', stop.indicator);
                container.appendChild(option);
            });

            //add event listener to <select> dropdown
            container.onchange = function () {
                const selectedOption = container.options[container.selectedIndex];
                const stopName = selectedOption.textContent;
                const stopId = selectedOption.value;
                
                document.getElementById('stop-name').textContent = `Bus times from: ${stopName}`;

                // Call arrivals function
                fetchArrivals(stopId, 'arrivals3');
                
            };
        })

        .catch(err => console.error("Error fetching stop points:", err));

}