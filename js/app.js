angular.module('GBR_Bleaching_Watch', ["ngRoute"])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/bleaching', {
                templateUrl: '',
                controller: 'temperatureCTRL'
            }).
            when('/bleaching/site/:id', {
                templateUrl: '.html',
                controller: 'PhoneDetailCtrl'
            }).
            otherwise({
                redirectTo: '/bleaching2'
            });
        }])
