angular.module('app.controllers', [])
  
.controller('searchCtrl', ['$scope', '$stateParams', 'uiGmapGoogleMapApi', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps){
        // Configuration needed to display the road-map with traffic
        // Displaying Ile-de-france (Paris neighbourhood)
        $scope.map = {
            center: {
              latitude: 49.260802,
              longitude: -123.246635,
            },
            zoom: 13,
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP, // This is an example of a variable that cannot be placed outside of uiGmapGooogleMapApi without forcing of calling the google.map helper outside of the function
                streetViewControl: false,
                mapTypeControl: false,
                scaleControl: false,
                rotateControl: false,
                zoomControl: false
            }, 
            showTraficLayer:true
        };

        $scope.searchbox = {
            template:'searchbox.tpl.html', 
            events:{
                places_changed: function (searchBox) {
                    let places = searchBox.getPlaces();
                    let result = [];
                    for (let i = 0; i < places.length; i++) {
                        let queueLen = 10, waitTime = 10;
                        let contentString = '<div id="content">'+
                            '<div id="siteNotice">'+
                            '</div>'+
                            '<h1 style="font-size:20px;">'+places[i].name+'</h1>'+
                            '<div id="bodyContent">'+
                            '<p><b>Address: </b>' + places[i].formatted_address + '</p>'+
                            '<p><b>Current Queue: </b>' + queueLen + ' Person(s)</p>'+
                            '<p><b>Estimated Waiting: </b>' + waitTime + ' Minute(s)</p>'+
                            '</div>';
                        result.push({
                            coords: {
                                latitude: places[i].geometry.location.lat(),
                                longitude: places[i].geometry.location.lng(),
                            },
                            placeId: places[i].place_id,
                            click: (marker) => {
                                let info = new google.maps.InfoWindow({
                                    content: contentString,
                                    maxWidth: 320,
                                });
                                info.open(Map, marker);
                            },
                        });
                    }
                    $scope.places = result;
                    var bounds = new google.maps.LatLngBounds();
                    bounds.extend(new google.maps.LatLng($scope.map.center.latitude, $scope.map.center.longitude));
                    for (let i in result) {
                        bounds.extend(new google.maps.LatLng(result[i].coords.latitude, result[i].coords.longitude));
                    }
                    console.log(bounds);
                    $scope.map.bounds = {
                        northeast: {
                            latitude: bounds.getNorthEast().lat(),
                            longitude: bounds.getNorthEast().lng()
                        },
                        southwest: {
                            latitude: bounds.getSouthWest().lat(),
                            longitude: bounds.getSouthWest().lng()
                        }
                    };
                }
            }
        };
        
    });
}])
   
.controller('favoritesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('mapsExampleCtrl', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps){
        // Configuration needed to display the road-map with traffic
        // Displaying Ile-de-france (Paris neighbourhood)
        $scope.map = {
            center: {
              latitude: -23.598763,
              longitude: -46.676547
            },
            zoom: 13,
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP, // This is an example of a variable that cannot be placed outside of uiGmapGooogleMapApi without forcing of calling the google.map helper outside of the function
                streetViewControl: false,
                mapTypeControl: false,
                scaleControl: false,
                rotateControl: false,
                zoomControl: false
            }, 
            showTraficLayer:true
        };
    });
}])
 
