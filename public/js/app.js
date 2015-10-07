angular.module('myApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ui.router',
])
	.config(function ($stateProvider, $routeProvider, $locationProvider, $httpProvider, $interpolateProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'views/home',
				controller: 'MainController'
			})
			.when('/news', {
				templateUrl: 'build/news.html'
			})
			.when('/news/:name', {
				templateUrl: function (urlattr) {
					return '/build/news/' + urlattr.name + '.html';
				}
			});



		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

	});
/* link */
/*
	 @Author: Nathan Thomas
	 @Desc: To Detect browser versions and mobile devices adds styles to HTML tag and
	 		provides global variable
*/
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "Other";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
		this.mobileDevice = this.checkMobileBrowser();
		$('html').addClass(this.browser + ' ' + this.version);
		if (this.isMobileBrowser) {
			$('html').addClass('mobile-device ' + this.mobileDevice);
		} else {
			$('html').addClass('not-mobile-device');
		}
	},
	searchString: function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;

			if (dataString.indexOf(data[i].subString) !== -1) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) {
			return;
		}
		var rv = dataString.indexOf("rv:");
		if (this.versionSearchString === "Trident" && rv !== -1) {
			return parseFloat(dataString.substring(rv + 3));
		} else {
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		}
	},
	checkMobileBrowser: function () {
		this.isMobileBrowser = true;
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
			return 'iOS';
		} else if (userAgent.match(/Android/i)) {
			return 'Android';
		} else if (userAgent.match(/Windows Phone/i)) {
			return 'Windows Phone'
		} else {
			this.isMobileBrowser = false;
			return 'Unknown';
		}
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
        },
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer"
        },
		{
			string: navigator.userAgent,
			subString: "Trident",
			identity: "Explorer"
        },
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
        },
		{
			string: navigator.userAgent,
			subString: "Safari",
			identity: "Safari"
        },
		{
			string: navigator.userAgent,
			subString: "Opera",
			identity: "Opera"
        }
    ]

};
BrowserDetect.init();/* link */
angular.module('myApp')
  .factory('Auth', function Auth($http, User, $cookies, $q) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function(cb) {
      return (angular.isFunction(cb)) ? cb : angular.noop;
    },

    currentUser = {};

    if ($cookies.get('token')) {
      currentUser = User.get();
    }

    return {
      /**
       * Delete access token and user info
       */
      logout: function() {
        $cookies.remove('token');
        currentUser = {};
      },
      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
        return $q.when(value)
          .then(function(user) {
            safeCb(callback)(user);
            return user;
          }, function() {
            safeCb(callback)({});
            return {};
          });
      },

      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },

       /**
        * Check if a user is an admin
        *   (synchronous|asynchronous)
        *
        * @param  {Function|*} callback - optional, function(is)
        * @return {Bool|Promise}
        */
      isAdmin: function(callback) {
        if (arguments.length === 0) {
          return currentUser.role === 'admin';
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.role === 'admin';
            safeCb(callback)(is);
            return is;
          });
      },

      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function() {
        return $cookies.get('token');
      }
    };
  });
/* link */
angular.module('myApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
    });
  });/* link */
angular.module('myApp')
    .controller('LoginController', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {

        $scope.oauth = function () {
            window.location.href = '/auth/provider';
        };

    }]);/* link */
angular.module('myApp')
	.controller('MainController', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {


	}]);
//# sourceMappingURL=app.js.map