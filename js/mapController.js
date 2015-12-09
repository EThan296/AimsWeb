angular.module('map', [])

    .controller('mapController', function($scope, $http) {
        //$scope.channelArray = [];
        //for (var i= 0; i < $scope.channelArray.length; i++) {
        //
        //}
        $http({method: 'GET', url: 'http://aimsweatherservice.appspot.com/service/vbleachStatuses'}).success(function(data){
            $scope.siteMarkers = [];
            $scope.tempArray = data._embedded.vbleachStatuses;

            console.log($scope.tempArray);

                //second  get method
            $http({method: 'GET', url: 'js/json/latLngData'}).success(function(data){
                $scope.siteMarkers2 = [];
                $scope.tempArray2 = data._embedded.vchannels;
                $scope.latData = [];
                $scope.lngData = [];

                console.log($scope.tempArray2);


            for (var i = 0; i < $scope.tempArray.length; i++) {

                //compares the ID from both service files
                if ( $scope.tempArray.siteId == $scope.tempArray2.siteId){

                    $scope.latData[i] = $scope.tempArray2[i].latitude;
                    $scope.lngData[i] = $scope.tempArray2[i].longitude;

                    $scope.siteMarkers[i] = [$scope.tempArray[i].siteName,
                                            $scope.tempArray[i].siteId,
                                            '#/details/' + $scope.tempArray[i].siteId,
                                            $scope.latData[i],
                                            $scope.lngData[i]]
                                                //-23.44347, 151.94926 ]

                    console.log("latdata= " + $scope.latData[i]);
                    console.log("lngdata= " + $scope.lngData[i]);
                    console.log('#/details/'+ $scope.tempArray[i].siteId);
                    console.log('link= ' + $scope.siteMarkers[i][2]);

                }

            }

            $scope.showdiv = function(){
                $scope.templateURL = 'pages/bleaching.html';
            }

            //$scope.siteMarker = $scope.getSiteMarkers();
            console.log($scope.siteMarkers);
            //console.log($scope.siteMarkers[0][4], $scope.siteMarkers[0][3]);

            $scope.initialize = function() {
                var siteIcon = '/resources/rsz_11images1.png';
                var mapProp = {
                    center: new google.maps.LatLng(-22.855457, 143.337692),
                    zoom:5,
                    mapTypeId:google.maps.MapTypeId.SATELLITE
                };

                var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

                <!--Adds a marker to the map.-->
                var marker, i;
                for (i = 0; i < $scope.siteMarkers.length; i++) {
                    //console.log(siteMarkers[i][4]);
                    marker=new google.maps.Marker({
                        position: new google.maps.LatLng($scope.latData[i], $scope.lngData[i]),
                        //position: new google.maps.LatLng($scope.siteMarkers[i][3], $scope.siteMarkers[i][4]),
                        map: map,
                        label: $scope.siteMarkers[i][0],
                        title: $scope.siteMarkers[i][0],
                        icon: siteIcon,
                        url: $scope.siteMarkers[i][2]
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        console.log(this.url);
                        window.location.href = this.url;
                    });
                }
            }
            google.maps.event.addDomListener(window, 'load', $scope.initialize())
            })//Second get method ends
        })


        }
    );



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
