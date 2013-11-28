define(function (require) {
  'use strict';

  var Leaflet = require('leaflet'),
      Backbone = require('backbone'),
      BackboneLeaflet = require('backbone.leaflet');

  var utils = require('utils');

  var MapView = BackboneLeaflet.MapView.extend({
    className: 'fullscreen',
    events: {
      'click map': 'onClick'
    },
    initialize: function () {
        this.defaultMapOptions = { 
            updateWhenIdle: false,
            unloadInvisibleTiles: false,
            doubleClickZoom: false,
            center: [ -23.5, -46.6167 ],
            zoom: 14,
            // Add draw control if `Leaflet.draw` plugin was loaded.
            drawControl: (L.Draw != null)
        },
        // Loads the required style sheets
        utils.loadCss('/css/leaflet.css');
    },
    onClick: function (e) {
      var lat = e.latlng.lat,
          lng = e.latlng.lng,
          n = this._n || 1,
          geoJSON = {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [lng, lat] },
            "properties": { "name": "Unnamed Point " + n, "active": true }
          };
          this.collection.create(geoJSON);
          this._n = ++n;
    }
  });

  return MapView;
});

