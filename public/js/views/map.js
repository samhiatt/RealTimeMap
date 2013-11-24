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
    getTileLayer: function () {
      return new Leaflet.TileLayer(
        'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
          subdomains: [ 'otile1', 'otile2', 'otile3', 'otile4' ]
        }
      );
    },
    defaultMapOptions: {
      center: [ 37.77288579232436, -122.44194030761717  ],
      zoom: 11,
      doubleClickZoom: false,
      updateWhenIdle: false,
      unloadInvisibleTiles: false
    },
    initialize: function () {
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

