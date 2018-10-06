
try
{
// Creating map object
var myMap = L.map("map", {
  center: [38.9072, -77.0369],
  zoom: 12
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://opendata.arcgis.com/datasets/abfc50875c3a4131bc6f7a39371b882f_13.geojson";


// Assemble API query URL
var url = baseURL;

// Grab the data with d3
d3.json(url, function(response) {
  console.log(response);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup({
    animateAddingMarkers: true
  });

  // Loop through data
  for (var i = 0; i < response.features.length; i++) {
    let location = response.features[i].geometry.coordinates;
    
    
    
    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      
        markers.addLayer(L.marker([location[1],location[0]])
          .bindPopup(response[i]/*.descriptor*/));
    }
  
  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

}
catch(e)
{
  console.log(e);
}