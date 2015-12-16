angular.module('GBR_Bleaching_Watch', ["ngRoute","highcharts-ng","bleaching.site","bleaching.siteService","bleaching.overviewService","bleaching.overview"])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/bleaching', {
                templateUrl: 'pages/bleaching.html',
                controller: 'overviewController'
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

