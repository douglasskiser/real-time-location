/*global angular*/
angular.module('app')
    .factory('D3', ['$window', function($window) {
        return $window.d3;
    }]);