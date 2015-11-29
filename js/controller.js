var bleaching_watch = angular.module('GBR_Bleaching_Watch', []);

bleaching_watch.controller('anomalyCTRL', function($scope, $http)
{
    $http({method: 'POST', url: 'js/vanomalyStatuses.json'}).success(function(data)
    {
        $scope.anomalyArray = data; // response data
    });
});