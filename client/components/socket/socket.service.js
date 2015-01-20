/*global angular io*/
angular.module('app')
    .factory('Socket', ['socketFactory', function(socketFactory) {
        var socket = io();

        return socketFactory({
            ioSocket: socket
        });
    }]);