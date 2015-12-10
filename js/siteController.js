///**
// * Created by rparmar on 3/12/2015.
// */

angular.module('bleaching.site', ["highcharts-ng"])

.controller('siteController', ['$scope', '$routeParams','siteService', function($scope, $routeParams, siteService) {
        var siteId = $routeParams.id;
        $scope.siteDetails = '';
        $scope.anomomlyStatuses = '';
        $scope.siteClimatology = '';

        $scope.loadData = function(){
            var detailsPromise = siteService.getSiteDetailsById(siteId)
                .then(function (results) {
                    $scope.siteDetails = results;
                    $scope.generateBleachingRisk();
                    var climatologyPromise = siteService.getClimatologyByChannel(results.channelId)
                        .then (function (results) {
                            $scope.siteClimatology = results;                            
                        })
                })

            var anomolyPromise = siteService.getAnomolyStatusesById(siteId)
                .then(function (results) {
                    $scope.anomomlyStatuses = results;
                    $scope.generateStatuses();
                })
        }

        $scope.generateBleachingRisk = function() {
            //Temperature speedo
            // variable = [lowlow, lowhigh, highlow, highhigh]  = all colors except green [low, high]
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
                        text: $scope.siteDetails.siteName + ' - Bleaching Risk <br>' + $scope.siteDetails.day
                    },
                    subtitle: {

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
                        minorTickColor: '#000',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#000',
                        labels: {
                            step: 2,
                            rotation: 'auto',
                            style: {
                                "font-size": "15"
                            }
                        },
                        title: {
                            text: '°C',
                            style: {
                                "font-size": "20"
                            }
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
                    dataLabels: {
                        style:{
                            "font-size": "20"
                        },
                        format: "{y} °C"
                    },
                    tooltip: {
                        valueSuffix: ' °C'
                    }
                }],
                loading: false
            };

        }

        $scope.generateStatuses = function() {
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
                ref = $scope.anomomlyStatuses;
                console.log(ref.plusOneSd, ref.plusTwoSd, ref.plusThreeSd, ref.anomoly);
                //Anomaly
                var red = [ref.plusThreeSd, 3];
                var orange = [ref.plusTwoSd, ref.plusThreeSd];
                var blue = [-3, -ref.plusThreeSd];
                var lightBlue = [-ref.plusThreeSd, -ref.plusTwoSd];
                var green = [-ref.plusTwoSd, ref.plusTwoSd];
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
                        text: $scope.siteDetails.siteName + ' - Water Temperature Anomaly <br>' + $scope.anomomlyStatuses.day
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
                        minorTickColor: '#000',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#000',
                        labels: {
                            step: 2,
                            rotation: 'auto',
                            style: {
                                "font-size": "15"
                            }
                        },
                        title: {
                            text: '°C',
                            style: {
                                "font-size": "20"
                            }
                        },
                        plotBands: [{
                            from: green[0],
                            to: green[1],
                            color: '#55BF3B' // green
                        },
                            {
                            from: lightBlue[0],
                            to: lightBlue[1],
                            color: '#33CCFF' // lightBlue
                        },  {
                            from: blue[0],
                            to: blue[1],
                            color: '#5D5DFF' // blue
                        },  {
                            from: orange[0],
                            to: orange[1],
                            color: '#ffa500' // orange
                        },  {
                            from: red[0],
                            to: red[1],
                            color: '#DF5353' // red
                        }]
                    }
                },
                series: [{
                    name: 'Anomaly',
                    data: [anomaly],
                    dataLabels: {
                        style:{
                            "font-size": "20"
                        },
                        format: "{y} °C"
                    },
                    tooltip: {
                        valueSuffix: '°C'
                    }
                }],

                loading: false
            }
        }
        $scope.loadData();
    }]
);