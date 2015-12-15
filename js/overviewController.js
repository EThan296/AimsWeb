angular.module('bleaching.overview', ["highcharts-ng"])

.controller('overviewController', ['$scope', '$http', '$routeParams', 'overviewService', function($scope, $http, $routeParams, overviewService)
{
    $scope.anomalyArray.chartConfig = [];

    $scope.loadData = function(){
        var anomalyPromise = overviewService.getAnomalyData()
            .then(function (results) {
                $scope.anomalyArray = results;
                $scope.anomalyChartConfig = [];


                $scope.anomalyChartConfig[i].blue = -3 + $scope.anomalyArray[i].plusThreeSd;
                $scope.anomalyChartConfig[i].lightBlue = $scope.anomalyArray[i].minusThreeSd + $scope.anomalyArray[i].plusTwoSd;
                $scope.anomalyChartConfig[i].greenNegative = $scope.anomalyArray[i].minusTwoSd;
                $scope.anomalyChartConfig[i].greenPositive = $scope.anomalyArray[i].plusTwoSd;
                $scope.anomalyChartConfig[i].orange = $scope.anomalyArray[i].plusThreeSd - $scope.anomalyArray[i].plusTwoSd;
                $scope.anomalyChartConfig[i].red = 3 - $scope.anomalyArray[i].plusThreeSd;
                $scope.anomalyChartConfig[i].anomaly = $scope.anomalyArray[i].anomoly;

                $scope.anomalyChartConfig[i].darkGreen = $scope.anomalyArray[i].minusTwoSd + $scope.anomalyArray[i].plusOneSd;
                $scope.anomalyChartConfig[i].green = $scope.anomalyArray[i].plusOneSd;
                $scope.anomalyChartConfig[i].green2 = $scope.anomalyArray[i].minusOneSd;
                $scope.anomalyChartConfig[i].yellow = $scope.anomalyArray[i].plusTwoSd - $scope.anomalyArray[i].plusOneSd;

                $scope.generateAnomalyCharts($scope.anomalyChartConfig[i]);

            })


    };

    $scope.generateAnomalyCharts = function (values) {



        $scope.anomalyArray.chartConfig.push(values);
    };
    $scope.loadData()
}]);