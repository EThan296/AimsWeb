angular.module('bleaching.overview', ["highcharts-ng"])

.controller('overviewController', ['$scope', '$http', '$routeParams', 'overviewService', function($scope, $http, $routeParams, overviewService)
{

    $scope.anomalyArray = '';
    $scope.mapMarkers = [];

    var mapProp = {
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        center: new google.maps.LatLng(-17, 150),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.SATELLITE

    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    $scope.loadData = function(){
        var anomalyPromise = overviewService.getAnomalyData()
            .then(function (results) {
                $scope.anomalyArray = results;
                $scope.anomalyArray.chartConfig = [];
                $scope.anomalyChartConfig = [];
                for (var i = 0; i < $scope.anomalyArray.length; i++) {
                    $scope.anomalyChartConfig.push({
                        siteName: $scope.anomalyArray[i].siteName,
                        day: $scope.anomalyArray[i].day,
                        blue: -3 + $scope.anomalyArray[i].plusThreeSd,
                        lightBlue: $scope.anomalyArray[i].minusThreeSd + $scope.anomalyArray[i].plusTwoSd,
                        greenNegative: $scope.anomalyArray[i].minusTwoSd,
                        greenPositive: $scope.anomalyArray[i].plusTwoSd,
                        orange: $scope.anomalyArray[i].plusThreeSd - $scope.anomalyArray[i].plusTwoSd,
                        red: 3 - $scope.anomalyArray[i].plusThreeSd,
                        anomaly: $scope.anomalyArray[i].anomoly
                    });

                    $scope.anomalyArray[i].chartConfig = $scope.generateAnomalyCharts($scope.anomalyChartConfig[i]);
                }
                $scope.anomalyLoaded = true;
            });

        var bleachingPromise = overviewService.getBleachingData()
            .then(function (results) {
                //var mapMarkers = '';
                $scope.bleachingArray = results;
                $scope.bleachingChartConfig = [];
                $scope.channelIds = [];
                for (var i = 0; i < $scope.bleachingArray.length; i++) {
                    $scope.bleachingChartConfig.push({
                        siteName: $scope.bleachingArray[i].siteName,
                        day: $scope.bleachingArray[i].day,
                        green: $scope.bleachingArray[i].watchTemp,
                        yellow: $scope.bleachingArray[i].warningTemp - $scope.bleachingArray[i].watchTemp,
                        orange: $scope.bleachingArray[i].bleachingTemp - $scope.bleachingArray[i].warningTemp,
                        red: 34 - $scope.bleachingArray[i].bleachingTemp,
                        currentTemp: $scope.bleachingArray[i].actualWaterTemp
                    });
                    $scope.bleachingArray[i].chartConfig = $scope.generateBleachingCharts($scope.bleachingChartConfig[i]);
                    $scope.channelIds[i] = $scope.bleachingArray[i].channelId;
                }
                $scope.bleachingLoaded = true;


                for (var j = 0; j < $scope.channelIds.length; j++) {
                    var mapPromise = overviewService.getMapData($scope.channelIds[j],$scope.bleachingArray[j].status)
                        .then(function (results) {

                            $scope.createMarker(generateMapMarkersArray(results[0],results[1]));
                        });
                }
                $scope.showdiv = function () {
                    $scope.templateURL = 'pages/overview.html';
                };
            });
    };

    $scope.generateAnomalyCharts = function (values) {
        $scope.anomalyArray.chartConfig = values;
        var configString = {
            options: {
                chart: {
                    type: 'bar',
                    height: 125

                },
                tooltip: {
                    enabled: false
                },
                title: {
                    text: $scope.anomalyArray.chartConfig.siteName + ' (A) - ' + $scope.anomalyArray.chartConfig.day
                },
                credits: {
                    text: '© Australian Institute or Marine Science',
                    href: 'http://www.aims.gov.au/docs/cc-citation.html#webdata'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [''],
                    title: {
                        enabled: false
                    }
                },
                yAxis: [{
                    max: 3,
                    min: -3,
                    minorTickInterval: 0.25,
                    title: {
                        //text: 'Anomaly',
                        enabled: false
                    },
                    labels: {
                        enabled: true
                    }

                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    title: {
                        text: '',
                        enabled: false
                    },
                    linkedTo: 0,
                    labels: {
                        enabled: false,
                        step: 1
                    }
                }],
                legend: {
                    reversed: true,
                    enabled: false
                },
                plotOptions: {
                    column: {
                        grouping: false
                    },
                    series: {
                        stacking: 'normal',
                        borderWidth: 0
                    }

                },
                exporting: {
                    enabled: false
                }
            },
            series: [
                {
                    name: 'Red',
                    color: 'rgba(255, 93, 93, 1)',
                    data: [$scope.anomalyArray.chartConfig.red]
                }, {
                    name: 'Blue',
                    color: 'rgba(93, 93, 255, 1)',
                    data: [$scope.anomalyArray.chartConfig.blue]
                }, {
                    name: 'lightBlue',
                    color: 'rgba(51, 204, 255, 1)',
                    data: [$scope.anomalyArray.chartConfig.lightBlue]
                }, {
                    name: 'greenNegative',
                    color: 'rgba(140, 254, 140, 1)',
                    data: [$scope.anomalyArray.chartConfig.greenNegative]

                }, {
                    name: 'orange',
                    color: 'rgba(254, 170, 85, 1)',
                    data: [$scope.anomalyArray.chartConfig.orange]
                }, {
                    name: 'greenPositive',
                    color: 'rgba(140, 254, 140, 1)',
                    data: [$scope.anomalyArray.chartConfig.greenPositive]

                }, {
                    type: 'scatter',
                    name: 'anomalyPoint',
                    dataLabels: {
                        enabled: true,
                        format: '{y} °C',
                        y: -35,
                        color: 'rgba(0,0,0,1)'
                    },
                    //text: "",
                    color: 'black',
                    data: [$scope.anomalyArray.chartConfig.anomaly],
                    marker: {
                        symbol: 'url(assets/images/rsz_2rsz_1line.png)'
                    }
                }],
            loading: false
        };
        return configString;
    };
    $scope.generateBleachingCharts = function (values) {
        $scope.values = values;
        var configString = {
            options: {
                chart: {
                    type: 'bar',
                    height: 125
                },
                tooltip: {
                    enabled: false
                },
                title: {
                    text: $scope.values.siteName + ' (BR) -  ' + $scope.values.day
                },
                xAxis: {
                    categories: ['']
                },
                yAxis: {
                    max: 34,
                    min: 24,
                    minorTickInterval: 0.5,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    reversed: true,
                    enabled: false
                },
                plotOptions: {
                    column: {
                        grouping: false
                    },
                    series: {
                        stacking: 'normal'
                    }
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                color: 'rgba(255, 93, 93, 1)',
                data: [$scope.values.red]

            }, {
                color: 'rgba(254, 170, 85, 1)',
                data: [$scope.values.orange]
            }, {
                color: 'rgba(255, 255, 0, 1)',
                data: [$scope.values.yellow]
            }, {
                color: 'rgba(140, 254, 140, 1)',
                data: [$scope.values.green]
            }, {
                type: 'scatter',
                dataLabels: {
                    enabled: true,
                    format: '{y} °C',
                    y: -35,
                    color: 'rgba(0,0,0,1)'
                },
                color: 'black',
                data: [$scope.values.currentTemp],
                marker: {
                    symbol: 'url(assets/images/rsz_2rsz_1line.png)'
                }
            }],
            credits: {
                text: '© Australian Institute or Marine Science',
                href: 'http://www.aims.gov.au/docs/cc-citation.html#webdata'
            },
            loading: false
        };
        return configString;
    };


    var generateMapMarkersArray = function (values,bleachStatus) {
        return [values.siteName,values.siteId, '#/details/' + values.siteId,values.latitude, values.longitude,bleachStatus];
    };

    $scope.createMarker = function (values) {
            if (values[5] == "No current Risk of Bleaching"){
                siteIcon = "/resources/green_circle.png";
            } else if (values[5] == "Low risk of Bleaching") {
                siteIcon = "/resources/yellow_circle.png";
            } else if (values[5] == "Medium Risk of Bleaching"){
                siteIcon = "/resources/orange_circle.png";
            }else {
                siteIcon = "/resources/red_circle.png"; //High Risk of Bleaching
            }
            //adds circle marker to map
            var marker = new google.maps.Marker({

                position: new google.maps.LatLng(values[3], values[4]),
                icon: siteIcon,
                map: map,
                url: values[2]
            });


    //creates info window
    var infowindow = new google.maps.InfoWindow({
        content:values[0],

    })

        google.maps.event.addListener(marker, 'click', function () {
            window.location.href = this.url;
        });

        google.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.open(map,marker);
            $(".gm-style-iw").next("div").hide();
        });

        google.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
        });

    };
    $scope.loadData()
}]);