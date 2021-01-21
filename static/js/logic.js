// Creating map object
var myMap = L.map("mapid", {
    center: [37.7749, -122.4194],
    zoom: 5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: MAP_API
  }).addTo(myMap);

// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
function chooseColor(Quake) {
  switch (true) {
  case Quake > 90:
    return "#BD0026";
  case Quake > 70:
    return "#FC4E2A";
  case Quake > 50:
    return "#FD8D3C";
  case Quake > 30:
    return "#FEB24C";
  case Quake > 10:
    return "#FED976";
  default:
    return "#FFEDA0";
  }
}
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h1>" + feature.properties.mag + "</h1> <hr> <h2>" + feature.properties.place + "</h2>");
    
    },
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng,{
        radius: feature.properties.mag * 3,
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    } );
  }
  }).addTo(myMap);
}); 