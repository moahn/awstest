$.support.cors = true;
var Handlebars = require('handlebars');
var URL_CSS = "globusMobileApp/css/";
//var URL_Common_Template = "common/template/";
/* Prepare Template */
function fnGetTemplate(strPath, strName) {
	if (Handlebars.templates === undefined || Handlebars.templates[strName] === undefined) {
    $.ajax({
       url : strPath + strName + ".hbs",
       success : function(data) {
           if (Handlebars.templates === undefined) {
               Handlebars.templates = {};
           }
           Handlebars.templates[strName] = Handlebars.compile(data);
       },
       async : false
     });
	}
	return Handlebars.templates[strName];
}

/* Load CSS */
function loadCSS(url) {
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
}