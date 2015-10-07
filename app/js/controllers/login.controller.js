angular.module('myApp')
    .controller('LoginController', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {

        $scope.oauth = function () {
            window.location.href = '/auth/provider';
        };

    }]);