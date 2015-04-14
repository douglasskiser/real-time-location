/*global angular io*/
angular.module('app')
    .factory('Socket', ['socketFactory', function(socketFactory) {
        var socket = io('', {
        	path: '/socket.io-client'
        });

        return socketFactory({
            ioSocket: socket
        });
    }]);