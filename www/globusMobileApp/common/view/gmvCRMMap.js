
define([
        'jquery', 'underscore', 'backbone',  'handlebars', 'mapui', 'mapclusterer',
        'global'

    	// Pre-Compiled Template
    	
        ], 

function ($, _, Backbone, Handlebars, MapUI, MapClusterer, Global) {

	'use strict';
	GM.View.CRMMap = Backbone.View.extend({

		el: ".dash-body",

		events : {
			
		},

		// Load the templates
		template_Map: fnGetTemplate("globusMobileApp/common/template/", "gmtCRMMap"),
		template_MapAccountInfo: fnGetTemplate("globusMobileApp/common/template/", "gmtCRMMapAccountInfo"),
		
		initialize: function(options) {
			this.$el = options.el;
//			this.repID = options.repID;
//			// this.data = {"markers" : options.data};
//			if(this.repID=="0")
//				this.repID = localStorage.getItem('partyID');
			this.render();
		},

		render: function () {

			$("#dash-body").html(this.template_Map());
            
			var marker = {};
			this.showMap( "globusMobileApp/image/crm/firstaid.png");
            this.showDirections();
			return this;
		},

		showMap: function(pinicon) {
			
			var that = this;
			   $.get("globusMobileApp/datafiles/values.json", function (data){
                           console.log(data) 
                           GM.Global.Data = data; 
                   });
                $("#div-map").gmap({'zoom':5, 'disableDefaultUI':true, 'center':'12.9613377,80.2376969'}).bind('init', function(ev, map) {
                    console.log(ev);
                    console.log(map)
	             	var mapdata = {"markers" : GM.Global.Data};
                     console.log(mapdata)
	              	$.each( mapdata.markers, function(i, marker) {
                        console.log("inside each");
	                
		                $("#div-map").gmap('addMarker', { 
		                  'position': new google.maps.LatLng(marker.LATITUDE, marker.LONGITUDE),
		                  'animation': google.maps.Animation.DROP,
		                  'icon': pinicon
//		                   , 'bounds':true
		                }).click(function(){
		                	console.log(marker);
		                	$("#div-map").gmap('openInfoWindow', {'content': that.template_MapAccountInfo(marker)}, this);
		                })

	              	});
	              
	              	$("#div-map").gmap('set', 'MarkerClusterer', new MarkerClusterer($("#div-map").gmap('get', 'map'), $("#div-map").gmap('get', 'markers')));
//            	});
          });
                           
                        
                                             
			
			// });

        },
        
    showDirections: function(){
//        function displayRoute() {
$("#div-map").gmap({'zoom':5, 'disableDefaultUI':true, 'center':'12.9613377,80.2376969'}).bind('init', function(ev, map) {
     var start = new google.maps.LatLng(28.694004, 77.110291);
    var end = new google.maps.LatLng(28.72082, 77.107241);

    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
        origin : start,
        destination : end,
        travelMode : google.maps.TravelMode.DRIVING
    };
    var directionsService = new google.maps.DirectionsService(); 
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
    
    
  });
   
//}
//        var that =this;
//        console.log("arun")
//        that.initMap();
//        that.initMap();




//initMap();  
    },
        calculateAndDisplayRoute: function (directionsService, directionsDisplay, pointA, pointB) {
            console.log(directionsService)
            console.log(directionsDisplay)
            console.log(pointA)
            console.log(pointB)
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
},
        
         initMap: function () {
             console.log("arun")
             var that=this;
          //definition 
    var pointA = new google.maps.LatLng(GM.Global.Data[0].LATITUDE,GM.Global.Data[0].LONGITUDE),
    pointB = new google.maps.LatLng(GM.Global.Data[1].LATITUDE,GM.Global.Data[1].LONGITUDE),
    myOptions = {
      zoom: 7,
      center: pointA
    },
    map = new google.maps.Map($('#div-map'), myOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),
    markerA = new google.maps.Marker({
      position: pointA, // marker.LATITUDE, marker.LONGITUDE,
      title: "point A",
      label: "A",
      map: map
    }),
    markerB = new google.maps.Marker({
      position: pointB,
      title: "point B",
      label: "B",
      map: map
    });
console.log(markerA)
console.log(markerB)
console.log(directionsService)
console.log(directionsDisplay)

  // get route from A to B
  that.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

}   ,
        
        
        
        
        
        
        
        
        
        
        
		// Close the view and unbind all the events
		close: function() {
			this.unbind();
			this.undelegateEvents();
		}

	});	

	return GM.View.CRMMap;
});
