angular.module('bleaching.siteService', [])
	.service('siteService', ['$http', function($http) {
		var self = this;

		self.getSiteDetailsById = function(id) {
			return $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses')
				.then(function(response) {
					var data = response.data._embedded.vbleachStatuses;
					for (var i = 0; i < data.length; i++) {
		                if (data[i].siteId == id) {
		                	if (data[i].status=="NORMAL"){
		                    	data[i].status = "No current Risk of Bleaching";
		                	}
		                    return data[i];
		                }
		            }
				})
		}

		self.getAnomolyStatusesById = function(id) {
			return $http.get('http://aimsweatherservice.appspot.com/service/vanomolyStatuses')
				.then(function(response) {
					var data = response.data._embedded.vanomolyStatuses;
					for (i = 0; i < data.length; i++) {
		                if (data[i].siteId == id) {
		                	if (data[i].status==0){
			                    data[i].status = "Normal for this time of year";
						}
		                    return data[i];
		                }
		            }
				})
		}

		self.getClimatologyByChannel = function(id) {
			return $http.get('http://aimsweatherservice.appspot.com/service/vclimatologies/search/findByChannelId?channelId=' + id)
				.then(function(response) {
					return response.data._embedded.vclimatologies;
				})
		}
	}])