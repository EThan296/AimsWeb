angular.module('bleaching.overviewService', [])

    .service('overviewService', ['$http', function($http) {
        var self = this;

        self.getAnomalyData = function() {
            return $http.get('http://aimsweatherservice.appspot.com/service/vanomolyStatuses')
                .then(function(response) {
                    var data = response.data._embedded.vanomolyStatuses;
                    return data;
            })
        };

        self.getBleachingData = function() {
            return $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses')
                .then(function(response) {
                    var data = response.data._embedded.vbleachStatuses;
                    return data;
                })
        };

        self.getMapData = function (id) {
            return $http.get('http://aimsweatherservice.appspot.com/service/vchannels/' + id)
                .then(function(response){
                    var data = response.data;
                    return data;
                })


        };
    }]);