/*global angular*/
function AppCtrl($http, Geolocation, Socket) {
    'use strict';
    
    var vm = this;
    
    vm.config = {
        isLoaded: false,
        loadingTxt: 'Locating your position',
        coordinates: [{
            latitude: '0',
            longitude: '0'
        }]
    };
    
    Geolocation()
        .then(function(position) {
            Socket.emit('new-user', position.coords);
            vm.config.loadingTxt = 'Retrieving user data';
        });
    
    Socket.on('user-data', function(data) {
        vm.config.coordinates = data;
        vm.config.isLoaded = true;
    });
}

AppCtrl.$inject = ['$http', 'Geolocation', 'Socket'];

angular.module('app')
    .controller('AppCtrl', AppCtrl);