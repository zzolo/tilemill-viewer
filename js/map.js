/**
 * Map JS
 */
$(document).ready(function() {
  var map = new L.Map('map');
  var layer;
  var baseUrl = 'http://localhost:20008/tile';
  var baselayers = {};
  var overlays = {};
  var layerControl = {};

  // Set default and load default layer
  $('input.update-map').val('geography-class');
  
  // OSM base layer
  var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 0, maxZoom: 22, attribution: 'Map data © OpenStreetMap contributors'
  });
  baselayers['Default OSM'] = osm;
	map.addLayer(osm);
	// Mapbox streets
	mapboxStreets = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png', {
    attribution: 'Map imagery from <a href="http://mapbox.com">Mapbox</a>'
  });
  baselayers['Mapbox Streets'] = mapboxStreets;
	map.addLayer(osm);
	// Mapquest
  var mapquest = new L.TileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    maxZoom: 18, subdomains: ['otile1','otile2','otile3','otile4'],
    attribution: 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.'
  });
  baselayers['Mapquest'] = mapquest;
	map.addLayer(osm);

	
	// Add control
  layerControl = new L.Control.Layers(baselayers, overlays);
  map.addControl(layerControl);
	
	// Function load map
	function loadMap(project) {
    var base = $('input.update-map').val();
    var url = baseUrl + '/' + base + '/{z}/{x}/{y}.png';
    
    // Add new layer
    layer = new L.TileLayer(url, { maxZoom: 15, minZoom: 2, scheme: 'xyz' });
    map.setView(new L.LatLng(0, 0), 3).addLayer(layer);
    
    // Add layer to overlays and re-add control
    layerControl.addOverlay(layer, base);
    
    // TileMill does not produce a tilejson feed or jsonp version. :(
    // Use tilejson to load it up
    /*
    wax.tilejson(base_url + '/' + base + '.jsonp',
      function(tilejson) {
      console.log(tilejson);
      }
    );
    */
	};
	
  // Load the default map
  loadMap();

  // Allow for input of other maps
  $('.map-form form').on('submit', function(e) {
    e.preventDefault();
    loadMap();
  });
});