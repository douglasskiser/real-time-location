var users = {};

module.exports = function(app, io) {
    
    // sends online user data to all connected users
    function sendUserData() {
        var data = [];

            // build data array with online users' geoposition
            for (var key in users) {
                if (users[key]['latitude']) {
                    data.push({
                        latitude: users[key]['latitude'].toString(),
                        longitude: users[key]['longitude'].toString()
                    });
                }
            }
            
            // emit user data
            return io.emit('user-data', data);
    }

    io.on('connection', function(socket) {

        socket.on('new-user', function(coords) {
            
            // add socket to users with corresponding position coordinates
            users[socket.id] = {
                latitude: coords.latitude,
                longitude: coords.longitude
            };

            return sendUserData();
        });

        socket.on('disconnect', function() {
            
            // remove socket information from users
            delete users[socket.id];

            return sendUserData();
        });

    });
};