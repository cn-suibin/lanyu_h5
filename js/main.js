
require.config({
    baseUrl: 'js',

    paths: {

        jquery: 'libs/jquery/dist/jquery.min',
        jqueryui: 'libs/jquery-ui/ui/minified/jquery-ui.min',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        async: 'libs/requirejs-plugins/src/async',
        goog: 'libs/requirejs-plugins/src/goog',
        angular : 'libs/angular-1.2.14/angular',
		angularuiroute:'libs/angular-1.2.14/angular-ui-router',
		angularanimate : 'libs/angular-1.2.14/angular-animate',
        moment : 'libs/moment/moment',
        momentfr : 'libs/moment/locale/fr',
        uibootstrap: 'libs/angular-bootstrap/ui-bootstrap.min'
    },
  shim: {
    'jquery': {'exports' : 'jquery'},
    'angular' : {'exports' : 'angular'},
    'angularuiroute': ['angular'],
    'angularanimate': ['angular'],
    'uibootstrap': ['angular'],
    'jqueryui': { deps:['jquery']},
    'bootstrap': { deps:['jquery']},
    'momentfr': { deps:['moment']}
  },
	priority: [
		"angular"
	]
});
/*
require(['angular', 'project'], function (angular,app) {
  app.init();
});*/

require([
	'angular',
	'angularuiroute',
	'angularanimate',
	'app',
	//'routes',
	//'controllers',
	//'filters',
	'services',
	'utils',
	'bootstrap',
	'moment',

], function(angular, app,moment) {
	'use strict';

	angular.element().ready(function(app) {

		angular.bootstrap(document, ['app']);

		window.onscroll = function() {
			animNavbar();
			lazyLoadImage();
			/*detailPageTitleEffect();*/
		};

		window.onresize = function(event) {
			if(document.getElementById("bigTitle") != undefined){
				document.getElementById("bigTitle").style.height = window.innerHeight + "px";
			}

			resizeBgAnimation();
		};

      	/*document.getElementById("top").onclick = scrollTop();

      	window.addEventListener("deviceorientation", handleOrientation, true);*/
      	/*document.body.onmousemove=function(event){
      		console.log(event);
			var centerX = document.body.offsetWidth/2;
			var centerY = document.body.offsetHeight/2;
			var bgX =  (centerX - event.x)/3;
			var bgY =  (centerY - event.y)/3;

			var bgX =  (centerX - event.x)/3;
			var bgY =  0;

			console.log(bgX+"px "+bgY+"px");
			document.querySelector("#bigPicture").style.backgroundPosition = bgX+"px "+bgY+"px";
      	};*/
	});
});


