/**
 * Created by rparmar on 3/12/2015.
 */

angular.module('details', [])

    .controller('detailsController', ['$scope', '$routeParams',
        function($scope, $routeParams) {
            $scope.siteId = $routeParams.id;
            console.log($scope.siteId + " Stemplate loaded")
            //$scope.phone = data;
        }]);
;