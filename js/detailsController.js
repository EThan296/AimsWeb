///**
// * Created by rparmar on 3/12/2015.
// */

angular.module('details', ["highcharts-ng"])

.controller('detailsController', ['$scope', '$routeParams','$http',
    function($scope, $routeParams,$http) {
        var channelId = 0;
        $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses').success(function (data) {

            $scope.siteId = $routeParams.id;
            $scope.results = data._embedded.vbleachStatuses;


            for (var i = 0; i < $scope.results.length; i++) {
                if ($scope.results[i].siteId == $scope.siteId) {
                    $scope.siteDetails = $scope.results[i];
                    channelId = $scope.results[i].channelId;
                    console.log('http://aimsweatherservice.appspot.com/service/vclimatologies/search/findByChannelId?channelId='+channelId);
                }

                if ($scope.results[i].status=="NORMAL"){
                    $scope.results[i].status = "No current Risk of Bleaching";
                }

            }
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

            $http.get('http://aimsweatherservice.appspot.com/service/vclimatologies/search/findByChannelId?channelId='+channelId).success(function(data) {
                $scope.climatology1Results = data._embedded.vclimatologies;
                //$scope.anomalyData = data._embedded.vclimatologies[0].anomoly;

                console.log($scope.climatology1Results);
                //console.log($scope.anomalyData);

                var anomaly = [];

                for (i = 0; i < $scope.climatology1Results.length; i++) {
                    //console.log($scope.climatology1Results[i].day);
                    //console.log($scope.climatology1Results[i].anomoly);
                   anomaly.push($scope.climatology1Results[i].anomoly);
                }
                    console.log(anomaly);

                $scope.climatologyConfig = {
                    options: {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Monthly Average Temperature',
                            x: -20 //center
                        },
                        xAxis: {
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature (°C)'

                            },
                            plotLines: [{
                                //value: 0,
                                width: 1,
                                color: '#000'
                            }]
                        },
                        tooltip:{
                            enabled: false
                        }
                    },
                    series: [{
                        name: 'test',
                        data: [1,2,3,4,5]
                    }],

                    loading: false
                };



                //    Second chart

                $scope.anomalyConfig2 = {
                    options: {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Temperature Anomaly',
                            x: -20 //center
                        },
                        xAxis: {
                            categories: " "
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature Anomaly (°C)'
                            },
                            plotLines: [{
                                //value: 0,
                                width: 1,
                                color: '#000'
                            }]
                        },
                        tooltip:{
                            enabled: true
                        }
                    },
                    series: [{
                        name:"Anomaly",
                        data: anomaly

                    }],

                    loading: false
                };

            })


        });



        $scope.hasLoaded = false;

        $http.get('http://aimsweatherservice.appspot.com/service/vanomolyStatuses').success(function(data) {
            $scope.results2 = data._embedded.vanomolyStatuses;


            for (i = 0; i < $scope.results2.length; i++) {
                if ($scope.results2[i].siteId == $scope.siteId) {
                    $scope.siteDetails2 = $scope.results2[i];
                    $scope.hasLoaded = true;
                    //console.log($scope.siteDetails2);
                }


                if ($scope.results2[i].status==0){

                    $scope.results2[i].status = "Normal for this time of year";
                    //console.log($scope.results2[i].status);

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
                        text: $scope.siteDetails.siteName + ' - Water Temperature Anomaly <br>' + $scope.siteDetails2.day
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
            };
        }
   });


        //console.log('http://aimsweatherservice.appspot.com/service/vclimatologies/search/findByChannelId?channelId='+channelId);


    }]

);