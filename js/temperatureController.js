angular.module('site', [])


.controller('siteCTRL', function($scope, $http, $routeParams)
{
    $http({method: 'GET', url: 'http://aimsweatherservice.appspot.com/service/vanomolyStatuses'}).success(function(data)
    {
        $scope.anomalyArray = data._embedded.vanomolyStatuses; // response data

        for (var i = 0; i<$scope.anomalyArray.length; i++) {
            $scope.anomalyArray[i].chartConfig = '';

            var blue = -3 + $scope.anomalyArray[i].plusThreeSd;
            var lightBlue = $scope.anomalyArray[i].minusThreeSd + $scope.anomalyArray[i].plusTwoSd;
            var darkGreen = $scope.anomalyArray[i].minusTwoSd + $scope.anomalyArray[i].plusOneSd;
            var green = $scope.anomalyArray[i].plusOneSd;
            var green2 = $scope.anomalyArray[i].minusOneSd;
            var yellow = $scope.anomalyArray[i].plusTwoSd - $scope.anomalyArray[i].plusOneSd;
            var orange = $scope.anomalyArray[i].plusThreeSd - $scope.anomalyArray[i].plusTwoSd;
            var red = 3 - $scope.anomalyArray[i].plusThreeSd;
            var anomaly = $scope.anomalyArray[i].anomoly;
            $scope.configString = {
                options: {
                    chart: {
                        type: 'bar',
                        height: 125
                    },
                    tooltip: {
                        enabled: false
                    },
                    title: {
                        //enabled: false
                        text: ""
                        //text: $scope.anomalyArray[i].siteName + ' - Temperature Anomaly -  ' + $scope.anomalyArray[i].day//$scope.anomalyArray[i].siteName
                    },
                    credits: {
                        enabled: false
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
                        max:3,
                        min:-3,
                        minorTickInterval: 0.25,
                        title: {
                            text: '',
                            enabled: false
                        },
                        labels: {
                            enabled: true
                        }

                    }, { // mirror axis on right side
                        opposite: true,
                        reversed: false,
                        //categories: categories,
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
                    }
                },
                series: [
                    {
                        name: '6',
                        color: 'rgba(255, 93, 93, 1)',
                        data: [red]
                    }, {
                        name: '1',
                        color: 'rgba(93, 93, 255, 1)',
                        data: [blue]
                    }, {
                        name: '2',
                        color: 'rgba(77, 137, 202, 1)',
                        data: [lightBlue]
                    }, {
                        name: '3',
                        color: 'rgba(33, 196, 145, 1)',
                        data: [darkGreen]
                    }, {
                        name: '4',
                        color: 'rgba(140, 254, 140, 1)',
                        data: [green2]

                    },{
                        name: '7',
                        color: 'rgba(255, 255, 0, 1)',
                        data: [yellow]
                    },{
                        name: '5',
                        color: 'rgba(254, 170, 85, 1)',
                        data: [orange]
                    }, {
                        name: '4',
                        color: 'rgba(140, 254, 140, 1)',
                        data: [green]

                    },    {
                        type: 'scatter',
                        name: 'ha',
                        dataLabels:{
                            enabled: true,
                            format: '{y} °C',
                            y: -35,
                            color: 'rgba(0,0,0,1)'
                        },
                        //text: "",
                        color: 'black',
                        data: [anomaly],
                        marker: {
                            symbol: 'url(assets/images/rsz_2rsz_1line.png)'
}
                    }],
                loading: false
            };
            $scope.anomalyArray[i].chartConfig = $scope.configString;
        }
    });

    //Temperature Graphs
    $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses')
        .then(function(response) {
            $scope.tempArray = response.data._embedded.vbleachStatuses;

            for (var i = 0; i < $scope.tempArray.length; i++) {
                $scope.tempArray[i].chartConfig = '';
                //console.log($scope.tempArray);
                var green = $scope.tempArray[i].watchTemp;
                var yellow = $scope.tempArray[i].warningTemp - $scope.tempArray[i].watchTemp;
                var orange = $scope.tempArray[i].bleachingTemp - $scope.tempArray[i].warningTemp;
                var red = 34 - $scope.tempArray[i].bleachingTemp;
                var currentTemp = $scope.tempArray[i].actualWaterTemp;
                //console.log(green, yellow, orange, red, currentTemp)
                $scope.configString2 = {
                    options: {
                        chart: {
                            type: 'bar',
                            height: 125
                        },
                        tooltip: {
                            enabled: false
                        },
                        title: {
                            text: $scope.tempArray[i].siteName + ' - Bleaching Risk -  ' + $scope.tempArray[i].day //+ " @ " + $scope.tempArray[i].actualWaterTemp + '°C'
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
                        }
                    },
                    series: [{
                        color: 'rgba(255, 93, 93, 1)',
                        data: [red]

                    }, {
                        color: 'rgba(254, 170, 85, 1)',
                        data: [orange]
                    }, {
                        //name: '',
                        color: 'rgba(255, 255, 0, 1)',
                        data: [yellow]
                    }, {
                        name: '',
                        color: 'rgba(140, 254, 140, 1)',
                        data: [green]

                    }, {
                        type: 'scatter',
                        dataLabels:{
                            enabled: true,
                            format: '{y} °C',
                            y: -35,
                            color: 'rgba(0,0,0,1)'
                        },
                        color: 'black',
                        data: [currentTemp],
                        marker: {
                            symbol: 'url(assets/images/rsz_2rsz_1line.png)'
                        }
                    }],
                    credits: {enabled: false}

                };
                $scope.tempArray[i].chartConfig = $scope.configString2;
            }
        });

});