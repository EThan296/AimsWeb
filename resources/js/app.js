angular.module('GBR_Bleaching_Watch', ["ngRoute","highcharts-ng","bleaching.site","bleaching.siteService","bleaching.overviewService","bleaching.overview"])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/bleaching', {
                templateUrl: 'templates/overview.html',
                controller: 'overviewController'
            })

            .when('/details/:id', {
                templateUrl: 'templates/site.html',
                controller: 'siteController'
            })

            .otherwise({
                redirectTo: '/bleaching'
            });
    }]);

