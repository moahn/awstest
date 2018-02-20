/**********************************************************************************
 * File:        GmMain.js
 * Description: Startup Logic. This file loads first when the app loads.
 *              1. This file has the code to load the necessary support-files for
 *                 the app to run.
 *              2. All CSS are loaded in here
 *              3. Device readiness is checked in this code
 *              4. Dependencies are set before the support-files are loaded
 * Version:     1.0
 * Author:      ejayabalan
 **********************************************************************************/

(function() {

	window.GM = {
		Model: {},
		Collection: {},
		View: {},
		Router: {},
		Template: {},
		Global: {}
	};

'use strict';

//Require.js allows us to configure shortcut alias
require.config({

	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		fastclick: {
			deps: ['jquery'],
			exports: 'Fastclick'
		},
        
        jqueryui: {
			deps: ['jquery'],
			exports: 'jqueryui'
		},
		global: {
			deps: ['handlebars','handlebars.runtime'],
			exports: 'global'
		},
        
		mapui: {
			deps: ['jquery'],
			exports: 'mapui'
		},

		mapclusterer: {
			deps: ['jquery', 'mapui'],
			exports: 'mapclusterer'
		},
	},

	/* Once these paths are defined, the pathnames are the ones referred in the rest of the application code */
	paths: {
		
		/* External Libraries */
		backbone: '../lib/backbone/backbone-min',
		fastclick: '../lib/fastclick/fastclick',
		handlebars: '../lib/handlebars/handlebars-v4.0.5',
		'handlebars.runtime': '../lib/handlebars/handlebars.runtime-v4.0.5',
		canvas: '../lib/threesixty/heartcode-canvasloader-min',
		jquery: '../lib/jquery/jquery-1.11.0.min',
        jqueryui: '../lib/jquery/jquery-ui.min',
		underscore: '../lib/underscore/underscore-min',
        mapclusterer: '../lib/map/markerclusterer',
		mapui: '../lib/map/mapui',
		
		/* Common */
		global: '../common/gmGlobal',
        //crm local db calls
       
//		 crmdb:'../db/GmCRMDB',
		/* Routers */
		gmrMain: '../router/gmrMain',
				
		/* ----------- Application Specific ---------- */

		/* View */
		gmvMain: '../common/view/gmvMain',
        gmvCRMMap: '../common/view/gmvCRMMap',
		   
	}
});

require( 
		[ 
	        'jquery',
	        'backbone',
            'fastclick',
	        'global',
	        'gmrMain'
         ], function ($, 
                       Backbone,
                       Fastclick,
                       Global, 
                       GMRMain) {
        
	$(document).ready(function() {

		/* Loading Lib CSS */
		loadCSS(URL_CSS + "lib/font-awesome.css");
		loadCSS(URL_CSS + "lib/jquery-ui.min.css");
		
        /* Loading CSS */
        
        loadCSS(URL_CSS + "app/GmCRMCommon.css");
                
		document.addEventListener("deviceready", onDeviceReady, false);

		/* PhoneGap is loaded. It is now safe to make calls to PhoneGap functions */
		function onDeviceReady() {
			Fastclick.attach(document.body);
		}
        
        
        // Routers
		new GMRMain();
		// executes when application goes out of scope like on refresh
        $(window).unload(function(){

        });
        
        $(window).on('hashchange', function(){  // Used to set last and previous URL
        });

		Backbone.history.start();
	});	
});
})();