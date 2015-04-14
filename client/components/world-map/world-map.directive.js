/*global angular topojson*/

function Topojson() {
    return topojson;
}

function WorldMap($window, D3, Topojson) {
    'use strict';

    return {
        restrict: 'A',
        scope: {
            userCoords: '='
        },
        link: function(scope, elem, attrs) {

            var projection = D3.geo.mercator()
                .center([0, 0])
                .scale(200)
                .rotate([0, 0]);

            var path = D3.geo.path()
                .projection(projection);

            var svg = D3.select(elem[0]).append('svg')
                .attr('width', elem[0].clientWidth)
                .attr('height', elem[0].clientHeight);
                

            var g = svg.append('g');

            D3.json('json/world-110m.json', function(err, topology) {
                if (!err) {
                    g.selectAll('path')
                        .data(Topojson.object(topology, topology.objects.countries)
                            .geometries)
                        .enter()
                        .append('path')
                        .attr('d', path);

                    g.selectAll('circle')
                        .data([{
                            longitude: '0',
                            latitude: '0'
                        }])
                        .enter()
                        .append('circle')
                        .attr('cx', function(d) {
                            return projection([d.longitude, d.latitude])[0];
                        })
                        .attr('cy', function(d) {
                            return projection([d.longitude, d.latitude])[1];
                        })
                        .attr('r', 2.5)
                        .style('fill', 'red');
                }

                return;
            });

            var zoom = D3.behavior.zoom()
                .on('zoom', function() {
                    g.attr('transform', 'translate(' +
                        D3.event.translate.join(',') + ')scale(' + D3.event.scale + ')');
                    g.selectAll('circle')
                        .attr('d', path.projection(projection));
                    g.selectAll('path')
                        .attr('d', path.projection(projection));
                });

            svg.call(zoom);

            scope.$watch('userCoords', function(data) {
                g.selectAll('circle').remove();
                g.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('cx', function(d) {
                        return projection([d.longitude, d.latitude])[0];
                    })
                    .attr('cy', function(d) {
                        return projection([d.longitude, d.latitude])[1];
                    })
                    .attr('r', 2.5)
                    .style('fill', 'red');
            });

            function resizeMap() {
                svg.transition()
                    .duration(100)
                    .attr('width', function() { return elem[0].clientWidth; })
                    .attr('height', function() { return elem[0].clientHeight; });
            }

            $window.addEventListener('resize', function() {
                return resizeMap();
            });

        }
    };
}


WorldMap.$inject = ['$window', 'D3', 'Topojson'];


angular
    .module('app')
    .factory('Topojson', Topojson)
    .directive('worldMap', WorldMap);
