/**
 * Created by rparmar on 3/12/2015.
 */

angular.module('details', [])

//    .controller('detailsController', ['$scope', '$routeParams',
//        function($scope, $routeParams) {
//            $scope.siteId = $routeParams.id;
//
//            console.log($scope.siteId + " Stemplate loaded")
//            //$scope.phone = data;
//        }]);
//
//;

.controller('detailsController', ['$scope', '$routeParams','$http',
    function($scope, $routeParams,$http) {
        $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses').success(function(data) {

            $scope.siteId = $routeParams.id;
            $scope.results = data._embedded.vbleachStatuses;

            for (i = 0; i < $scope.results.length; i++) {
                if ($scope.results[i].siteId == $scope.siteId) {
                    $scope.siteDetails = $scope.results[i];
                    console.log($scope.siteDetails);
                }
            }

        });

            //console.log($scope.siteDetails._embedded.vbleachStatuses);
        //$scope.phone = data;
    }]);


//phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
//    function($scope, $routeParams, $http) {
//        $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
//            $scope.phone = data;
//        });
//    }]);
;