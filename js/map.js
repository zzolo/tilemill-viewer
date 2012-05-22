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
  var projectAddLabel = 'Enter Project ID';
  
  // OSM base layer
  var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 0, maxZoom: 22, attribution: 'Map data &copy; OpenStreetMap contributors'
  });
  baselayers['Default OSM'] = osm;
	// Mapbox streets
	mapboxStreets = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png', {
    attribution: 'Map imagery from <a href="http://mapbox.com">Mapbox</a>'
  });
  baselayers['Mapbox Streets'] = mapboxStreets;
	// Mapquest
  var mapquest = new L.TileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    maxZoom: 18, subdomains: ['otile1','otile2','otile3','otile4'],
    attribution: 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.'
  });
  baselayers['Mapquest'] = mapquest;

	// Add control
  layerControl = new L.Control.Layers(baselayers, overlays);
  map.addControl(layerControl);
	
	// Function load map
	function loadMap(project) {
    var base = (typeof project != 'undefined') ? project : $('input.update-map').val();
    var url = baseUrl + '/' + base + '/{z}/{x}/{y}.png';
    var urlGrid = baseUrl + '/' + base + '/{z}/{x}/{y}.grid.json';
    
    // Add new layer
    layer = new L.TileLayer(url, { maxZoom: 15, minZoom: 2, scheme: 'xyz' });
    map.setView(new L.LatLng(0, 0), 3).addLayer(layer);
    
    // Add layer to overlays if not already
    if (typeof overlays[base] == 'undefined') {
      overlays[base] = layer;
      layerControl.addOverlay(layer, base);
    }
    
    // TileMill does not produce a tilejson feed or jsonp version. :(
	};
	
  // Load the default map
  loadMap('geography-class');

  // Allow for input of other maps
  $('.map-form form').on('submit', function(e) {
    e.preventDefault();
    
    // Handle label and load project if needed.
    $('input.update-map').trigger('focusout');
    var current = $('input.update-map').val();
    if (current != projectAddLabel || current != '') {
      loadMap();
    }
  });
  
  // Create a helpful label for adding projects
  $('input.update-map').focusout(function(e) {
    if ($(this).val() == '') {
      $(this).val(projectAddLabel);
    }
    if ($(this).val() == projectAddLabel) {
      $(this).addClass('labelling');
    }
    else {
      $(this).removeClass('labelling');
    }
  });
  $('input.update-map').focusin(function(e) {
    if ($(this).val() == projectAddLabel) {
      $(this).val('');
    }
    $(this).removeClass('labelling');
  });
  
  // Start off label
  $('input.update-map').trigger('focusout');
});