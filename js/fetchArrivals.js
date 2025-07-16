
// JavaScript to pull the data and sort it in the appropriate manner, and add to the table 


    //include my API key. This would be hidden away if the API was paid for/commercially sensitive
    const apiKey = "2d033d1af7b148bda1fbd9860f6f7ba6";

    //function to do the work. takes the relevant stop ID, and the list ID of the table we want to insert into
    function fetchArrivals(stopID, listID) {

      //finds the HTML table element by list ID, where we will insert rows
      const list = document.getElementById(listID);

      // making the API call - GET request to TfL API
      fetch(`https://api.tfl.gov.uk/StopPoint/${stopID}/Arrivals`, {
        headers: {
          "api_key": apiKey
        }
      })

        // response handling: puts it into JSON format
        .then(response => response.json())

        // grab the body of the table to insert rows and clear content
        .then(data => {
          const tbody = list.querySelector("tbody");
          tbody.innerHTML = ""; // Clear "Loading..."

          //message if there are no upcoming buses
          if (data.length === 0) {
            tbody.innerHTML = "<tr><td colspan='3'>No upcoming buses.</td></tr>";
            return;
          }

          // sort the data in order of how soon the buses are coming
          const sorted = data.sort((a, b) => a.timeToStation - b.timeToStation);

          //create and add a row for each arrival
          for (let arrival of sorted) {
            const newRow = document.createElement('tr')

            const lineNameTableElement = document.createElement('td');
            lineNameTableElement.textContent = `${arrival.lineName}`;

            const destinationNameTableElement = document.createElement('td');
            destinationNameTableElement.textContent = `${arrival.destinationName}`;

            const timeToStationTableElement = document.createElement('td');
            timeToStationTableElement.textContent = `${Math.round(arrival.timeToStation / 60)} min`;

            newRow.appendChild(lineNameTableElement);
            newRow.appendChild(destinationNameTableElement);
            newRow.appendChild(timeToStationTableElement);

            tbody.appendChild(newRow);
          }
        })
        // handle errors
        .catch(err => {
          document.getElementById(listID).innerHTML = "Error fetching bus data.";
          console.error(err);
        });
    }

    //use function on three relevant bus stops
    fetchArrivals("490004404N", "arrivals1");
    fetchArrivals("490004404S", "arrivals2");
