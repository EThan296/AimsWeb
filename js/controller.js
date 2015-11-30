angular.module('GBR_Bleaching_Watch', [])

.controller('anomalyCTRL', function($scope, $http)
{
    $http({method: 'POST', url: 'js/vanomalyStatuses.json'}).success(function(data)
    {
        $scope.anomalyArray = data._embedded.vanomolyStatuses; // response data
    });
})

.controller('temperatureCTRL', function($scope, $http)
{
    //$http({method: 'POST', url: 'js/vbleachStatuses.json'}).success(function(data)
    //{
    //    $scope.tempArray = data._embedded.vbleachStatuses; // response data\\
    //    generateChart();
    //
    //})
    $http.get('js/vbleachStatuses.json')
        .then(function(response) {
            $scope.tempArray = response.data._embedded.vbleachStatuses;
            //loadChart = generateChart();

        })

    $scope.generateChart = function(id, currentTemp, watchTemp, warningTemp, bleachingTemp) {
        console.log("chart generated");
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
                    max: 34,
                    min: 24,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    column: {
                        grouping: false
                    },
                    series: {
                        //stacking: 'normal'
                    }
                },
                series: [{
                    name: '1',
                    color: 'rgba(0,255,0,1)',
                    data: [watchTemp],
                    pointPlacement: .2

                }, {
                    name: '2',
                    color: 'rgba(0,0,255,.5)',
                    data: [warningTemp]
                }, {
                    name: '3',
                    color: 'rgba(255, 0, 0,.5)',
                    data: [bleachingTemp],
                    pointPlacement: -.2
                }, {
                    name: '4',
                    color: 'rgba(1, 1, 1,1)',
                    data: [currentTemp],
                    pointPlacement: 0
                }]
            });
    };
});

