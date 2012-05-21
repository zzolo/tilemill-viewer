# Tilemill Viewer

A really simple browser based app for viewing Tilemill tiles in a browser with base maps.

## Install and Use

1. ```git clone --recursive git://github.com/zzolo/tilemill-viewer.git```
    * Or use the following to get submodules manually: ```git submodule update --init```
1. Run Tilemill
1. Open ```index.html``` in a browser.
1. Using the projedct ID, you can add projects in the UI and turn off and on layers to see how they may look with different base layers.

## Notes

  * Rendering tiles through this interface will take just as long as through Tilemill.
  * As Tilemill does not output tilejson, there's no good way to get the interactive parts, like tooltips, legends, etc.
  * Pulling in base maps from Mapbox Street, OSM, and MapQuest.
  
## Todo

Since the JSONP is not available, there should be a server side component (or a manual script)
that will scrape the data from Tilemill.  This would also allow for a easy way to import
all the maps into the viewer and not have a need to manually add the IDs.

## Technologies Used

Note that this viewer attempts to use the master/development version of
some libraries, so it is not stable necesarily.

  * Leaflet
  * Wax