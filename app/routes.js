var home = require('../controllers/index'),
    api = require('../controllers/api'),
    li = require('../controllers/ctrl_layerinfo');

exports.initialize = function (app) {
    app.get('/', home.index);
    app.get('/api/themes', api.themes.list);
    app.delete('/api/points/:id', api.points.delete);
    app.get('/layerinfo/:id', li.byId);
    app.get('/twcproxy',li.twcproxy);
};
