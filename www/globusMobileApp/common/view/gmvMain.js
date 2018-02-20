define([
        'jquery', 'underscore', 'backbone', 'handlebars', 'global', 'gmvCRMMap'
], 

function ($, _, Backbone, Handlebars, Global,GMVCRMMap) {

  'use strict';

  GM.View.Main = Backbone.View.extend({

    el: "body",
        
        container: "#div-crm-overlay-content-container",

    events: {
            "click #submit":"login",
            "click #signup":"signup",
    },

    /* Templates */
    template: fnGetTemplate( "globusMobileApp/common/template/", "gmtMain"),
        template_Map: fnGetTemplate("globusMobileApp/common/template/", "gmtCRMMap"),
     template_Saved: fnGetTemplate("globusMobileApp/common/template/", "gmtSaved"),

    initialize: function() { 
            
      this.render();
          
            },

    render: function (e) {
      this.$el.html(this.template());
//            this.showMap()
            return this;
    },
        
    signup: function () {
           var that = this;
            var fn,ln;
            fn = $("#fn").val();
            ln = $("#ln").val();
            var input ={};
            input.fn = fn;
            input.ln = ln;
            input.lat=geoplugin_latitude();
            input.lon=geoplugin_longitude();
            console.log(fn+"   "+ln);
            $.ajax({
                url: "http://192.168.1.14:8080/",
                contentType:"application/json",
                method:"post",
                data:JSON.stringify(input),
                success: function(result){
            console.log(result);
            $("#result").html(that.template_Saved(result));
           

        }
                   
                   });
             setInterval(function() {
    var input ={};
            input.fn = fn;
            input.ln = ln;
            input.lat=geoplugin_latitude();
            input.lon=geoplugin_longitude();
            console.log(fn+"   "+ln);
            $.ajax({
                url: "http://192.168.1.14:8080/data",
                contentType:"application/json",
                method:"post",
                data:JSON.stringify(input),
                success: function(result){
                    console.log("saved");
        } 
                   });
  },20000);
        },
        
        login: function(e) {

           var fn,ln;
            var that  =this;
            fn = $("#fn").val();
            ln = $("#ln").val();
            var input ={};
            input.fn = fn;
            input.ln = ln;
            console.log(geoplugin_latitude());
            console.log(geoplugin_longitude());

            // input.lat=geoplugin_latitude();
            // input.lon=geoplugin_longitude();
            $.ajax({
                url: "http://192.168.1.14:8080/auth",
                contentType:"application/json",
                method:"post",
                data:JSON.stringify(input),
                success: function(result){
            console.log(result);
            if(result.length > 0){
                
               alert("arun2");
                that.authosied(result)
            }
            else if(result.length == 0)
                alert("Please signup to login");

            
        }
                   
                   });

            
        },
      authosied: function(result) {
          console.log(result);
           alert("arun1");
          $("#login-home").addClass("hide");
          $("#user-dash").removeClass("hide");
          this.showMap()
        },
        showMap: function() {
//            var repID = 
            var gmvCRMMap = new GMVCRMMap({"el":$("#dash-body")});
//            gmvApp.showView(gmvCRMMap);
        }
    

  });
  return GM.View.Main;
});
