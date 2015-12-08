angular.module('map', [])

    .controller('mapController', function($scope, $http) {
        //$scope.channelArray = [];
        //for (var i= 0; i < $scope.channelArray.length; i++) {
        //
        //}
        $http({method: 'GET', url: 'http://aimsweatherservice.appspot.com/service/vbleachStatuses'}).success(function(data){
            $scope.siteMarkers = [];
            $scope.tempArray = data._embedded.vbleachStatuses;



            for (var i = 0; i < $scope.tempArray.length; i++) {
                $scope.siteMarkers[i] = [$scope.tempArray[i].siteName, $scope.tempArray[i].siteId, '#/details/' + $scope.tempArray[i].siteId, -23.44347, 151.94926 ]
            }

            $scope.showdiv = function(){
                $scope.templateURL = 'pages/map.html';
            }

            //$scope.siteMarker = $scope.getSiteMarkers();
            console.log($scope.siteMarkers);
            console.log($scope.siteMarkers[0][4], $scope.siteMarkers[0][3]);

            $scope.initialize = function() {
                var siteIcon = '/resources/rsz_11images1.png';
                var mapProp = {
                    center: new google.maps.LatLng(-24.994167,134.866944),
                    zoom:5,
                    mapTypeId:google.maps.MapTypeId.SATELLITE
                };

                var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

                <!--Adds a marker to the map.-->
                var marker, i;
                for (i = 0; i < $scope.siteMarkers.length; i++) {
                    //console.log(siteMarkers[i][4]);
                    marker=new google.maps.Marker({
                        position: new google.maps.LatLng($scope.siteMarkers[i][3], $scope.siteMarkers[i][4]),
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

        })


        }
    );


//angular.module('docsTemplateUrlDirective', [])
//        .controller('Controller', ['$scope', '$compile', function($scope, $compile) {
//
//            $scope.showdiv = function(){
//                $scope.templateURL = 'my-customer.html';
//            };
//        }]);
//})(window.angular);
