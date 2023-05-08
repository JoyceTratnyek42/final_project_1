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


	//loop through each data point and calculate the distance between it and the user location
	//log the distances and see those numbers
	function calculateDistance(lat1, lon1, lat2, lon2) {
		const R = 6371; // Earth radius in kilometers
		const dLat = (lat2 - lat1) * Math.PI / 180;
		const dLon = (lon2 - lon1) * Math.PI / 180;
		const a =
		  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		  Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c; // Distance in kilometers
		return distance;
	  }
	  
	  fetch(url)
		.then(response => response.json())
		.then(data => {
		  const userLat = 40.712776; // User input latitude
		  const userLon = -74.005974; // User input longitude
	  

	  
		  // Loop through the filtered data and calculate the distance to the user
		  filteredData.forEach((item, index) => {
			const distance = calculateDistance(userLat, userLon, item.latitude, item.longitude);
			console.log(`Distance to ${index+1}: ${distance} km`);

			// Distance is a number between 0 and 1 (roughly)


			//create element 
			const element = document.createElement('div')
			element.classList.add('incident')

			//position element based on distance
			const screenDistance = 700 * distance
			const randomAngle = Math.random() * Math.PI * 2

			console.log('random angle', randomAngle)

			// Calculate x value based on angle
			const x = Math.cos(randomAngle) * screenDistance
			const y = Math.sin(randomAngle) * screenDistance

			element.style.transform = `translate(${x}px, ${y}px) scale(${Math.random() + 1})`

			//add element to page
			document.body.appendChild(element)

			
		  });
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

  
  
  });

  





  








