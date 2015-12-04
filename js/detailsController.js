///**
// * Created by rparmar on 3/12/2015.
// */

angular.module('details', ["highcharts-ng"])

.controller('detailsController', ['$scope', '$routeParams','$http',
    function($scope, $routeParams,$http) {
        $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses').success(function (data) {

            $scope.siteId = $routeParams.id;
            $scope.results = data._embedded.vbleachStatuses;

            for (i = 0; i < $scope.results.length; i++) {
                if ($scope.results[i].siteId == $scope.siteId) {
                    $scope.siteDetails = $scope.results[i];
                    console.log($scope.siteDetails);
                }
            }
            //Temperature speedo
            // variable = [lowlow, lowhigh, highlow, highhigh]  = all colors except green [low, high]
            console.log($scope.siteDetails.bleachingTemp + " " + $scope.siteDetails.warningTemp + " " + $scope.siteDetails.watchTemp + "" + $scope.siteDetails.actualWaterTemp);
            var red = [$scope.siteDetails.bleachingTemp, 34];
            var orange = [$scope.siteDetails.warningTemp, $scope.siteDetails.bleachingTemp];
            var yellow = [$scope.siteDetails.watchTemp, $scope.siteDetails.warningTemp];
            var green = [24, $scope.siteDetails.watchTemp];
            var currentTemp = $scope.siteDetails.actualWaterTemp;
            $scope.temperatureConfig = {
                options: {
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    title: {
                        text: 'Current Temperature'
                    },
                    credits: {
                        enabled: false
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },

                    // the value axis
                    yAxis: {
                        min: 24,
                        max: 34,

                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: '°C'
                        },
                        plotBands: [{
                            from: green[0],
                            to: green[1],
                            color: '#00ff00' // green
                        }, {
                            from: yellow[0], // - lowlow
                            to: yellow[1], // - lowhigh
                            color: '#DDDF0D' // yellow - low
                        }, {
                            from: orange[0], // - lowlow
                            to: orange[1], // - lowhigh
                            color: '#ffa500' // orange
                        }, {
                            from: red[0], // - lowlow
                            to: red[1], // - lowhigh
                            color: '#DF5353' // red
                        }]
                    }
                },
                series: [{
                    name: 'Temperature',
                    data: [currentTemp],
                    tooltip: {
                        valueSuffix: ' °C'
                    }
                }],
                loading: false
            };
        });



        $scope.hasLoaded = false;

        $http.get('http://aimsweatherservice.appspot.com/service/vanomolyStatuses').success(function(data) {
            $scope.results2 = data._embedded.vanomolyStatuses;


            for (i = 0; i < $scope.results2.length; i++) {
                if ($scope.results2[i].siteId == $scope.siteId) {
                    $scope.siteDetails2 = $scope.results2[i];
                    $scope.hasLoaded = true;
                    console.log($scope.siteDetails2);
                }

            }
            //var red = [-3, -1.5, 1.5, 3];
            //var orange = [-1.5, -1, 1, 1.5];
            //var yellow = [-1, -0.5, 0.5, 1];
            //var green = [-0.5, 0.5];
            //var anomaly = 0;
            var ref = [];
            ref.plusOneSd = 0.5;
            ref.plusTwoSd = 1;
            ref.plusThreeSd = 1.5;
            ref.anomoly = 0;

            if ($scope.hasLoaded) {
                ref = $scope.siteDetails2;
                console.log(ref.plusOneSd, ref.plusTwoSd, ref.plusThreeSd, ref.anomoly);
                //Anomaly
                var red = [-3, -ref.plusThreeSd, ref.plusThreeSd, 34];
                var orange = [-ref.plusThreeSd, -ref.plusTwoSd, ref.plusTwoSd, ref.plusThreeSd];
                var yellow = [-ref.plusTwoSd, -ref.plusOneSd, ref.plusOneSd, ref.plusTwoSd];
                var green = [-ref.plusOneSd, ref.plusOneSd];
                var anomaly = ref.anomoly;


            $scope.anomalyConfig = {
                options: {
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    title: {
                        text: 'Water Temperature Anomaly'
                    },
                    credits: {
                        enabled: false
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                        },
                    // the value axis
                    yAxis: {
                        min: -3,
                        max: 3,

                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: '°C'
                        },
                        plotBands: [{
                            from: green[0],
                            to: green[1],
                            color: '#55BF3B' // green
                        }, {
                            from: yellow[0], // - lowlow
                            to: yellow[1], // - lowhigh
                            color: '#DDDF0D' // yellow - low
                        }, {
                            from: yellow[2], // - highlow
                            to: yellow[3], // - highhigh
                            color: '#DDDF0D' // yellow
                        }, {
                            from: orange[0], // - lowlow
                            to: orange[1], // - lowhigh
                            color: '#ffa500' // orange
                        }, {
                            from: orange[2], // - highlow
                            to: orange[3], // - highhigh
                            color: '#ffa500' // orange
                        }, {
                            from: red[0], // - lowlow
                            to: red[1], // - lowhigh
                            color: '#DF5353' // red
                        }, {
                            from: red[2], // - highlow
                            to: red[3], // - highhigh
                            color: '#DF5353' // red
                        }]
                    }
                },
                series: [{
                    name: 'Anomaly',
                    data: [anomaly],
                    tooltip: {
                        valueSuffix: '°C'
                    }
                }],

                loading: false
            };
        }

        });
    }]

);