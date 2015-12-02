angular.module('site', [])


.controller('siteCTRL', function($scope, $http)
{
    $http({method: 'GET', url: 'http://aimsweatherservice.appspot.com/service/vanomolyStatuses'}).success(function(data)
    {
        $scope.anomalyArray = data._embedded.vanomolyStatuses; // response data
    });
    $scope.generateAnomalyChart = function(id, SDone, SDtwo, SDthree, anomaly) {

        console.log("chart generated");


        var blue = -3 + SDthree;
        var lightBlue = (-SDthree) + (SDtwo);
        var darkGreen = (-SDtwo) + (SDone);
        var green = SDone;
        var green2 = -SDone;
        var yellow = SDtwo - SDone;
        var orange = SDthree - SDtwo;
        var red = 3 - SDthree;
        console.log(blue,lightBlue,darkGreen,green,yellow,orange,red,anomaly)

        $('#anomaly-' + id).highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['']
            },
            yAxis: [{
                max:3,
                min:-3,
                minorTickInterval: 0.5,
                title: {
                    text: ''
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                //categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            legend: {
                reversed: true,
                enabled:false
            },
            plotOptions: {
                column: {
                    grouping: false
                },
                series: {
                    stacking: 'normal'
                }
            },
            series: [
                {
                    name: '1',
                    color: 'rgba(0, 0, 255, 1)',
                    data: [blue]
                }, {
                    name: '2',
                    color: 'rgba(0, 100, 255, 1)',
                    data: [lightBlue]
                }, {
                    name: '3',
                    color: 'rgba(0, 100, 50, 1)',
                    data: [darkGreen]
                }, {
                    name: '4',
                    color: 'rgba(0, 238, 0, 1)',
                    data: [green2]

                },{
                    name: '7',
                    color: 'rgba(255, 0, 0, 1)',
                    data: [red]

                }, {
                    name: '6',
                    color: 'rgba(283, 118, 0, 1)',
                    data: [orange]
                },{
                    name: '5',
                    color: 'rgba(255, 215, 0, 1)',
                    data: [yellow]
                },{
                    name: '4',
                    color: 'rgba(0, 238, 0, 1)',
                    data: [green]

                },    {
                    type: 'scatter',
                    color: 'black',
                    data: [anomaly],
                    marker: {
                        symbol: 'url(http://s22.postimg.org/eavyqgzgt/rsz_2rsz_1line.png)',
                    }
            }],
            credits: { enabled: false }

        });
    };
    
    $http.get('js/json/vbleachStatuses.json')
        .then(function(response) {
            $scope.tempArray = response.data._embedded.vbleachStatuses;
        });

    $scope.generateChart = function(id, currentTemp, watchTemp, warningTemp, bleachingTemp) {
        console.log("chart generated");
        var green = watchTemp;
        var yellow = warningTemp - watchTemp;
        var orange = bleachingTemp - warningTemp;
        var red = 34 - bleachingTemp;

            $('#container-' + id).highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['']
                },
                yAxis: {
                    max:34,
                    min:20,
                    minorTickInterval: 0.5,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    reversed: true,
                    enabled:false
                },
                plotOptions: {
                    column: {
                        grouping: false
                    },
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    color: 'rgba(255, 0, 0, 1)',
                    data: [red]

                }, {
                    color: 'rgba(283, 118, 0, 1)',
                    data: [orange]
                }, {
                    //name: '',
                    color: 'rgba(255, 215, 0, 1)',
                    data: [yellow]
                },  {
                    name: '',
                    color: 'rgba(0, 238, 0, 1)',
                    data: [green]

                } , {
                    type: 'scatter',
                    color: 'black',
                    data: [currentTemp],
                    marker: {
                        symbol: 'url(http://s22.postimg.org/eavyqgzgt/rsz_2rsz_1line.png)',
                    }
                }],
                credits: { enabled: false }

            });
    };
})


    .controller('detailsController', ['$scope', '$routeParams',
        function($scope, $routeParams) {
           $scope.siteId = $routeParams.id;
            console.log("template loaded")
                //$scope.phone = data;
        }]);

;
