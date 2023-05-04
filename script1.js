const APP_TOKEN = '4rfk3t5PP1WC08RzSwgxgGFTj' // <- Replace this with your app token
const DATASET_IDENTIFIER = '9jgj-bmct' // <- Replace this with the ID for the data resource that you want to look up
const LIMIT = 2500 // <- Replace this with the number of records you want to pull

// Construct the URL that we need to make requests
const url = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$limit=${LIMIT}&$$app_token=${APP_TOKEN}`

console.log(`Fetching url - ${url}`)

fetch(url)
  .then((response) => response.json())
  .then((json) => {
      console.log(json)
  });


		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		}

		function showPosition(position) {
			alert("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude);
			
		}

	


		// Check if Geolocation is supported by the browser
if ("geolocation" in navigator) {
	// Request the current position
	navigator.geolocation.getCurrentPosition((position) => {
	  // Log the latitude and longitude to the console
	  const latitude = position.coords.latitude;
	  const longitude = position.coords.longitude;
	  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
	  // Do something with the latitude and longitude data, such as displaying it on a map or saving it to a database
	}, (error) => {
	  // Handle any errors that occur while trying to retrieve the position
	  console.error(error);
	});
  } else {
	// Handle the case where Geolocation is not supported by the browser
	console.error("Geolocation is not supported by this browser");
  }
  

  function displayLocation(latitude, longitude) {
	const locationElement = document.getElementById("location");
	locationElement.innerText = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
}










let abestos = [];
let indoorAirQuality = [];
let indoorSewage = [];
let mold = [];
let other = [];

const apiData_2 = fetch(url)
  .then(response => response.json())
  .then(data => {
    // Calculate distance for each item in array
    const filteredData = data.filter(item => {
      
		let category = item.complaint_type_311;

		if(category == "Abestos"){
			abestos.push(item);
		}
		if(category == "Mold"){
			mold.push(item);
		}
		if(category == "Indoor Air Quality"){
			indoorAirQuality.push(item);
		}
		if(category == "Indoor Sewage"){
			indoorSewage.push(item);
		}
		if(category == "Other"){
			other.push(item);
		}
    });

	console.log(mold);
	console.log(abestos);
	console.log(indoorSewage);
	console.log(indoorAirQuality);
	console.log(other)

    // Use filteredData for your needs
    console.log(filteredData);
});









// Given location coordinates
const givenLatitude = 40.712776;
const givenLongitude = -74.005974;

// Retrieve array of data from API
const apiData = fetch(url)
  .then(response => response.json())
  .then(data => {
    // Calculate distance for each item in array
    const filteredData = data.filter(item => {
      // Item location coordinates
      const itemLatitude = item.latitude;
      const itemLongitude = item.longitude;

      // Calculate distance between given location and item location
      const distance = getDistanceFromLatLonInKm(givenLatitude, givenLongitude, itemLatitude, itemLongitude);

      // Filter by distance within 10km
      return distance <= 0.5;
    });

    // Use filteredData for your needs
    console.log(filteredData);
  });

// Haversine formula for calculating distance between two points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = earthRadius * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}








