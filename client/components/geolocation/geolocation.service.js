/*global angular*/
function Geolocation($window, $q, $rootScope) {
    'use strict';
    
    return function() {
        var deffered = $q.defer();
        
        var errorMessages = [
            'Geolocation is not supported',
            'Geolocation permission denied',
            'Geolocation position unavailable',
            'Geolocation service timeout has been reached'
        ];

        if (!$window.navigator.geolocation) {
            $rootScope.$broadcast('error', errorMessages[0]);
            $rootScope.$apply(function() {
                deffered.reject(errorMessages[0]);
            });
        }
        else {
            $window.navigator.geolocation.getCurrentPosition(
                function(position) {
                    $rootScope.$apply(function() {
                        deffered.resolve(position);
                    });
                },
                function(err) {
                    $rootScope.$broadcast('error', errorMessages[err.code]);
                    $rootScope.$apply(function() {
                        deffered.reject(errorMessages[err.code]);
                    });
                });
        }

        return deffered.promise;
    };
}

Geolocation.$inject = ['$window', '$q', '$rootScope'];

angular.module('app')
    .factory('Geolocation', Geolocation);