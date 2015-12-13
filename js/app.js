angular.module('GBR_Bleaching_Watch', ["ngRoute","highcharts-ng","site","bleaching.site","bleaching.siteService"])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/bleaching', {
                templateUrl: 'pages/bleaching.html',
                controller: 'siteCTRL'
            })

            .when('/details/:id', {
                templateUrl: 'pages/singleSiteDetails.html',
                controller: 'siteController'
            })

            .when('/bleaching/historic', {
                templateUrl: 'pages/historic-bleaching.html',
                controller: 'historicController'
            })
            .otherwise({
                redirectTo: '/bleaching'
            });
    }]);

