angular.module('GBR_Bleaching_Watch', ["ngRoute","site"])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/bleaching', {
                templateUrl: 'pages/bleaching.html',
                controller: 'siteCTRL'
            })
            .otherwise({
                redirectTo: '/bleaching'
            });
    }])

