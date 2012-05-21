/**
 * Map JS
 */
$(document).ready(function() {
  var map = new L.Map('map');
  var layer;
  var base_url = 'http://localhost:20008/tile';

  // Set default and load default layer
  $('input.update-map').val('geography-class');
  var base = $('input.update-map').val();
  var url = base_url + '/' + base + '/{z}/{x}/{y}.png';
  
	layer = new L.TileLayer(url, { maxZoom: 15, minZoom: 2, scheme: 'xyz' });
	map.setView(new L.LatLng(46.1494,-94.4495), 7).addLayer(layer);

  // Allow for input of other maps
  $('.map-form form').on('submit', function(e) {
    e.preventDefault();
    if (layer) {
      map.removeLayer(layer);
    }
    var base = $('input.update-map').val();
    var url = base_url + '/' + base + '/{z}/{x}/{y}.png';
    
		layer = new L.TileLayer(url, { maxZoom: 15, minZoom: 2, scheme: 'xyz' });
		map.setView(new L.LatLng(46.1494,-94.4495), 7).addLayer(layer);
    
  });
});