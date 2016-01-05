angular.module('bleaching.siteService', [])
	.service('siteService', ['$http', function($http) {
		var self = this;

		self.getSiteDetailsById = function(id) {
			return $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses')
				.then(function(response) {
					var data = response.data._embedded.vbleachStatuses;
					for (var i = 0; i < data.length; i++) {
		                if (data[i].siteId == id) {
							var siteName = data[i].siteName
							data[i].climatologyFileName = "Climatology_" + siteName.replace(/ /g, '') + ".xlsx";

							if (data[i].status == "No current Risk of Bleaching"){
								data[i].color = "#33cc33";
							} else if (data[i].status == "Low risk of Bleaching ") {
								data[i].color = "color: #ffff00; ";
							} else if (data[i].status == "Medium Risk of Bleaching"){
								data[i].color = "color: #ff8000;";
							}else {
								data[i].color = "color: #ff1a1a;"; //High Risk of Bleaching
							}
						return data[i];
		                }
		            }

				})
		};
		self.getAllSiteDetails = function() {
			return $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses')
					.then(function(response) {
						var data = response.data._embedded.vbleachStatuses;
						return data;
					})
		};

		self.getAnomolyStatusesById = function(id) {
			return $http.get('http://aimsweatherservice.appspot.com/service/vanomolyStatuses')
				.then(function(response) {
					var data = response.data._embedded.vanomolyStatuses;
					for (i = 0; i < data.length; i++) {
		                if (data[i].siteId == id) {
		                	if (data[i].status=="Normal"){
			                    data[i].status = "Normal for this time of year";
								data[i].color = "#33cc33;"; //#33cc33
							}
							else if (data[i].status=="Much Cooler"){
								data[i].color = "#0000e6;"; //#0000e6
							}
							else if (data[i].status=="Cooler"){
								data[i].color = "#00ccff;"; //#00ccff
							}
							else if (data[i].status=="Warmer"){
								data[i].color = "#ff8000 ;"; //#ff8000
							}
							else if (data[i].status==" Much Warmer"){
								data[i].color = "#ff1a1a;"; //#ff1a1a
							}
		                    return data[i];
		                }
		            }
				})
		};

		self.getClimatologyByChannel = function(id) {
			return $http.get('http://aimsweatherservice.appspot.com/service/vclimatologies/search/findByChannelId?channelId=' + id)
			.then(function(response) {
				return response.data._embedded.vclimatologies;
			})

		};
		self.getvChannel = function(id) {
			return $http.get('http://aimsweatherservice.appspot.com/service/vchannels/' + id)
					.then(function(response) {
						return response.data;
					})
		}
	}]);