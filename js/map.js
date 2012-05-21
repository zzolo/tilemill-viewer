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
  
  // Add basic layers and control
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