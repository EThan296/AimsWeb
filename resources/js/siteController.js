///**
// * Created by rparmar on 3/12/2015.
// */

angular.module('bleaching.site', ["highcharts-ng"])

.controller('siteController', ['$scope', '$routeParams','siteService', function($scope, $routeParams, siteService) {

        var siteId = $routeParams.id;
        $scope.siteDetails = '';
        $scope.anomalyStatuses = '';
        $scope.siteClimatology = '';
        $scope.channelId = '';
        $scope.bleachingLoaded = false;
        $scope.anomalyLoaded = false;
        $scope.loadData = function(){
            var detailsPromise = siteService.getSiteDetailsById(siteId)
                .then(function (results) {
                    $scope.siteDetails = results;
                    $scope.channelId = $scope.siteDetails.channelId;
                    $scope.generateBleachingRisk();
                    var climatologyPromise = siteService.getClimatologyByChannel(results.channelId)
                        .then (function (results) {
                            $scope.siteClimatology = results;
                            $scope.today = $scope.siteClimatology[$scope.siteClimatology.length -1].day;
                            $scope.startdate = $scope.siteClimatology[0].day;
                            $scope.temps = [];
                            $scope.modelledTemps = [];
                            $scope.modTempPlusTwoSd = [];
                            $scope.modTempPlusThreeSd = [];
                            $scope.modTempMinusTwoSd = [];
                            $scope.modTempMinusThreeSd = [];

                            $scope.date = [];

                            $scope.anomaly = [];
                            $scope.plusTwoSd = [];
                            $scope.plusThreeSd = [];
                            $scope.minusTwoSd = [];
                            $scope.minusThreeSd = [];

                            for (var i = 0; i < $scope.siteClimatology.length; i++) {

                                $scope.temps.push($scope.siteClimatology[i].actualWaterTemp);
                                $scope.modelledTemps.push($scope.siteClimatology[i].modelledWaterTemp);

                                $scope.modTempPlusTwoSd.push($scope.siteClimatology[i].modTempPlusTwoSd);
                                $scope.modTempPlusThreeSd.push($scope.siteClimatology[i].modTempPlusThreeSd);
                                $scope.modTempMinusTwoSd.push($scope.siteClimatology[i].modTempMinusTwoSd);
                                $scope.modTempMinusThreeSd.push($scope.siteClimatology[i].modTempMinusThreeSd);

                                $scope.date.push($scope.siteClimatology[i].day);
                                $scope.anomaly.push($scope.siteClimatology[i].anomoly);
                                $scope.plusTwoSd.push($scope.siteClimatology[i].plusTwoSd);
                                $scope.plusThreeSd.push($scope.siteClimatology[i].plusThreeSd);
                                $scope.minusTwoSd.push($scope.siteClimatology[i].minusTwoSd);
                                $scope.minusThreeSd.push($scope.siteClimatology[i].minusThreeSd);

                            }
                            $scope.generateClimatology();
                        });
                    var vChannelPromise = siteService.getvChannel($scope.channelId)
                        .then(function (results) {
                            $scope.channelDetails = results;
                        });
                    $scope.bleachingLoaded = true;
                });

            var anomolyPromise = siteService.getAnomolyStatusesById(siteId)
                .then(function (results) {
                    $scope.anomalyStatuses = results;
                    $scope.tempDifferential = $scope.anomalyStatuses.anomoly;
                    $scope.anomalyStatus = $scope.anomalyStatuses.status;
                    $scope.modelledAnomaly = $scope.anomalyStatuses.modelledWaterTemp;

                    $scope.generateStatuses();

                    $scope.anomalyLoaded = true;
                });

        };


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
                        text: '© Australian Institute of Marine Science',
                        href: 'http://www.aims.gov.au/docs/cc-citation.html#webdata'
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
                    },
                    exporting: {
                        enabled: false
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

        };

        $scope.generateStatuses = function() {

            var ref = [];
            ref.plusOneSd = 0.5;
            ref.plusTwoSd = 1;
            ref.plusThreeSd = 1.5;
            ref.anomoly = 0;
                ref = $scope.anomalyStatuses;
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
                        text: $scope.siteDetails.siteName + ' - Water Temperature Anomaly <br>' + $scope.anomalyStatuses.day
                    },
                    credits: {
                        text: '© Australian Institute of Marine Science',
                        href: 'http://www.aims.gov.au/docs/cc-citation.html#webdata'
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
                            color: '#55BF3B' // green rgba(85,191,59,1)
                        },
                            {
                            from: lightBlue[0],
                            to: lightBlue[1],
                            color: '#33CCFF' // lightBlue rgba(51,204,255,1)
                        },  {
                            from: blue[0],
                            to: blue[1],
                            color: '#5D5DFF' // blue rgba(50,93,255,1)
                        },  {
                            from: orange[0],
                            to: orange[1],
                            color: '#ffa500' // orange rgba(,1)
                        },  {
                            from: red[0],
                            to: red[1],
                            color: '#DF5353' // red rgba(223,83,83,1)
                        }] // yellow rgba(255,165,0,1)
                    },
                    exporting: {
                        enabled: false
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
        };

    $scope.generateClimatology = function () {

        $scope.climatologyConfig = {
            options: {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Daily Average Temperature - Starting: ' + $scope.startdate + ', ending: ' + $scope.today,
                    x: -20 //center
                },
                legend: {
                    enabled: true
                },

                xAxis: {
                    categories: $scope.date,
                    tickInterval: 15,
                    minorTickInterval: 15
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    },
                    plotLines: [{
                        color: '#000'
                    }]
                },
                tooltip:{
                    enabled: true
                },
                credits: {
                    text: '© Australian Institute of Marine Science',
                    href: 'http://www.aims.gov.au/docs/cc-citation.html#webdata'
                },
                plotOptions: {
                    line: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                name: 'Actual Temp.',
                data: $scope.temps,
                color: 'grey'

            },{
                name: 'Modelled Temp.',
                data: $scope.modelledTemps,
                color: 'rgba(85,191,59,0.6)'

            },{
                name: 'Second SD.',
                data: $scope.modTempPlusTwoSd,
                color: 'rgba(255,165,0,0.6)'
            },{
                name: 'Third SD.',
                data: $scope.modTempPlusThreeSd,
                color: 'rgba(255,0,0,0.6)'
            },{
                name: 'Second SD.',
                data: $scope.modTempMinusTwoSd,
                color: 'rgba(51,204,255,0.6)'
            },{
                name: 'Third SD.',
                data: $scope.modTempMinusThreeSd,
                color: 'rgba(50,93,255,0.6)'
            }],

            loading: false
        };
        $scope.anomalyConfig2 = {
            options: {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Temperature Anomaly - Starting: ' + $scope.startdate + ', ending: ' + $scope.today,
                    x: -20 //center
                },
                xAxis: {
                    categories: $scope.date,
                    tickInterval: 15
                },
                yAxis: {
                    title: {
                        text: 'Temperature Anomaly (°C)'
                    },
                    plotLines: [{
                        width: 1,
                        color: '#000'
                    }]
                },
                tooltip:{
                    enabled: true
                },
                credits: {
                    text: '© Australian Institute of Marine Science',
                    href: 'http://www.aims.gov.au/docs/cc-citation.html#webdata'
                },
                plotOptions: {
                    line: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                name:"Anomaly",
                data: $scope.anomaly,
                color: 'grey'
            },{
                name:"Second SD.",
                data: $scope.plusTwoSd,
                color: 'rgba(255,165,0,0.7)'
            },{
                name:"Third SD.",
                data: $scope.plusThreeSd,
                color: 'rgba(255,0,0,0.7)'
            },{
                name:"Second SD.",
                data: $scope.minusTwoSd,
                color: 'rgba(51,204,255,0.7)'
            },{
                name:"Third SD.",
                data: $scope.minusThreeSd,
                color: 'rgba(50,93,255,0.7)'
            }
            ],

            loading: false
        };
    };
        $scope.loadData();
    }]
);

