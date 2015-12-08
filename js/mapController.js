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


//angular.module('docsTemplateUrlDirective', [])
//        .controller('Controller', ['$scope', '$compile', function($scope, $compile) {
//
//            $scope.showdiv = function(){
//                $scope.templateURL = 'my-customer.html';
//            };
//        }]);
//})(window.angular);
