/**
 * Created by rparmar on 8/12/2015.
 */

angular.module('map', [])

    .controller('mapController', ['$scope',
        function($scope) {

        $scope.showdiv = function(){
            $scope.templateURL = 'pages/map.html';

        };
    }]);



//angular.module('map', [])
//
//    .controller('mapController', ['$scope', '$routeParams','$http',
//        function($scope, $routeParams,$http) {
//            $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses').success(function (data) {
//
//
//                $scope.siteId = $routeParams.id;
//                $scope.results = data._embedded.vbleachStatuses;
//
//                for (i = 0; i < $scope.results.length; i++) {
//                    if ($scope.results[i].siteId == $scope.siteId) {
//                        $scope.reefNames = $scope.results[i];
//                        console.log($scope.reefNames);
//                    }
//
//            }
//
//            }
//
//            $scope.showdiv = function(){
//                $scope.templateURL = 'pages/map.html';
//
//            };
//        }])





//.controller('detailsController', ['$scope', '$routeParams','$http',
//    function($scope, $routeParams,$http) {
//        $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses').success(function (data) {
//
//            $scope.siteId = $routeParams.id;
//            $scope.results = data._embedded.vbleachStatuses;
//
//            for (i = 0; i < $scope.results.length; i++) {
//                if ($scope.results[i].siteId == $scope.siteId) {
//                    $scope.siteDetails = $scope.results[i];
//                    console.log($scope.siteDetails);
//                }
//
//                if ($scope.results[i].status == "NORMAL") {
//
//                    $scope.results[i].status = "No current Risk of Bleaching";
//                    console.log($scope.results[i].status);
//
//                }
//
//
//
//
//            );



//angular.module('docsTemplateUrlDirective', [])
//        .controller('Controller', ['$scope', '$compile', function($scope, $compile) {
//
//            $scope.showdiv = function(){
//                $scope.templateURL = 'my-customer.html';
//            };
//        }]);
//})(window.angular);
