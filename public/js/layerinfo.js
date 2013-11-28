$(document).ready(function(){
    var Layer = Backbone.Model.extend({
    //    urlRoot: '/user',
        defaults: {
            name: "Untitled Layer",
            
        },
        initialize: function(l){
            console.log("Initializing "+l.name);
        }
    });

    var layer = new Layer({ name: "Precip Start"});
    
    console.log(layer);
    
    
    var PrecipEvent = Backbone.Model.extend({
        
    });
    var PrecipEventCollection = Backbone.Collection.extend({
        model: PrecipEvent
    });
    
    var TecciPoint = Backbone.Model.extend({
        defaults: {
            url : "//wxdata.weather.com/wxdata/hirad_precip/get.js"
                    +"?key=97ce49e2-cf1b-11e0-94e9-001d092f59fc"
                    //+"&lat=34.72938895539459&lng=-98.11173529268649"
                    +"&cb=callback",
            tecci_id: "",
            lat: 34.72938895539459,
            lng: -98.11173529268649
        },
        initialize: function(){
            console.log("Initializing tecci point", this);
            this.url = function(){return this.attributes.url+"&lat="+this.get('lat')+"&lng="+this.get('lng');};
            /*$.ajax({
                url: this.attributes.url,
                dataType: "jsonp",
                jsonp: "cb",
                context: this,
                success: function(data) {
                    console.log("Got", data, this);
                }
            });*/
        }
    });
    var TecciPointCollection = Backbone.Collection.extend({
        defaults: {
            layer: layer
        },
        model: TecciPoint,
        initialize: function(tpl){
            console.log("Initializing tecci points:", tpl);
        }
    });
    
    var tp = new TecciPoint();
    var tp2 = new TecciPoint();
    var tpc = window.tpc = new TecciPointCollection([tp, tp2]);
    
    var LayerInfo = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            // Compile the template using underscore
            console.log(this.options.layer);
            var template = _.template( $("#layerinfo_template").html(), {layer:this.options.layer} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( template );
        },
        events: {
            "click div": "doSearch"
        },
        doSearch: function( event ){
            // Button clicked, you can access the element that was clicked with event.currentTarget
            alert( "ouch!" );
        }
    });
    var layerInfo = new LayerInfo({ el: $("#content"), layer: layer });
    
});