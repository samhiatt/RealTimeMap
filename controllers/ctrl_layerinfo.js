var http = require("http");

exports.byId = function (req, res) {
    console.log("Layer Info...");
    res.render('layerinfo', { title: 'Layer Info', id:req.params.id });
};

exports.twcproxy = function(req, res){
    var opts = { host: 'wxdata.weather.com',
                 port: 80,
                 path: '/wxdata/hirad_precip/get.js',
                 method: 'GET'};
    var proxyRequest = http.get(opts, function(response){
            console.dir(response);
            response.on('data', function(chunk){
                    res.write(chunk);
            });
            response.on('end', function(){
                    res.end()
            });
    });
};