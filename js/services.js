define(['angular', 'app', 'moment', 'momentfr'], function (angular, app, moment, momentfr) {



	
	app.service('Page', function($rootScope){
	    return {
	        setTitle: function(title){
	            $rootScope.title = title;
	        }
	    };
	});
	
	app.service('package', function($http){
	    this.get = function () {
	        var url = 'package.json';
			return $http.get(url).then(function(result) {
				return result.data;
			}, function(data, status, headers, config) {
			    alert("error when reading package.json!");
			  });
		};
	});
	
	app.service('lang', function($http){
	    this.getWords = function () {
	        var url = 'package.json';
	        	        
			return $http.get(url).then(function(result) {
				
				moment.locale('en', {
				    relativeTime : {
				        future: "in %s",
				        past:   "%s ago",
				        s:  "seconds",
				        m:  "one minute",
				        mm: "%d minutes",
				        h:  "one hour",
				        hh: "%d hours",
				        d:  "one day",
				        dd: "%d days",
				        M:  "one month",
				        MM: "%d months",
				        y:  "one year",
				        yy: "%d years"
				    }
				});
				if(result.data.lang == "fr-fr"){
					 moment.locale('fr');
				}
				
				return $http.get("js/lang/"+result.data.lang+".json").then(function(result) {
				
				
				return result.data;
					}, function(data, status, headers, config) {
			    alert("error when reading "+"/js/lang/"+result.data.lang+".json"+"!");
			  });
			}, function(data, status, headers, config) {
			    alert("error when reading package.json!");
			  });
		};
	});

	app.service('viewSlideIndex', function () {
	    var viewIndex;
	    return {
	        getViewIndex: function () {
	            return viewIndex;
	        },
	        setViewIndex: function (val) {
	            viewIndex = val;
	        }
	    };
	});
});


