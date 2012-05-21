# Tilemill Viewer

A really simple browser based app for viewing Tilemill tiles in a browser with base maps.

## Install

1. ```git clone --recursive git://github.com/zzolo/tilemill-viewer.git```
    * Or use the following to get submodules manually: ```git submodule update --init```
1. Run Tilemill
1. Open ```index.html``` in a browser.

## Notes

  * Rendering tiles through this interface will take just as long as through Tilemill.
  * As Tilemill does not output tilejson, there's no good way to get the interactive parts, like tooltips, legends, etc.

## Technologies Used

Note that this viewer attempts to use the master/development version of
some libraries, so it is not stable necesarily.

  * Leaflet
  * Wax