/* Main Router */
define([
  'jquery', 'underscore', 'backbone', 'global', 'gmvMain', 'gmvCRMMap'
], 
    
function ($, _, Backbone, Global, GMVMain,GMVCRMMap) {

    'use strict';
    
    GM.Router.Main = Backbone.Router.extend({
    
        routes: {
            ""                      : "arun",
        },
        
        initialize: function() {
	       
            
            
        },

        arun: function() {
            
            var gmvMain = new GMVMain();
            console.log("Haha")

        }
    });

    return GM.Router.Main;
});