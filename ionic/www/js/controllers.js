angular.module('app.controllers', [])
  
.controller('searchCtrl', ['$scope', '$stateParams', 'uiGmapGoogleMapApi', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, uiGmapGoogleMapApi, $http) {
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
                        //let queueLen = 10, waitTime = 10;
                        $http.get("http://ypan.me:8080/api/restaurant/fetch/?place_id=" + places[i].place_id).then((response) => {
                            console.log(response);
                            let contentString;
                            if (response.data.status == 200) {
                                queueLen = response.data.restaurant.queue_len;
                                waitTime = response.data.restaurant.wait_time;
                                updateTime = response.data.restaurant.update_time;
                                contentString = '<div id="content">'+
                                    '<div id="siteNotice">'+
                                    '</div>'+
                                    '<h1 style="font-size:20px;">'+places[i].name+'</h1>'+
                                    '<div id="bodyContent">'+
                                    '<p><b>Address: </b>' + places[i].formatted_address + '</p>'+
                                    '<p><b>Current Queue: </b>' + queueLen + ' Person(s)</p>'+
                                    '<p><b>Estimated Waiting: </b>' + waitTime + ' Minute(s)</p>'+
                                    '<p><b>Updated at: </b>' + updateTime + '</p>'+
                                    '<h3 style="font-size:17px;">Share Your Data!</h3>'+
                                    '<p><b>Current Queue: </b><input class="share" ng-model="share.queueLen"></input> Person(s)</p>'+
                                    '<p><b>Estimated Waiting: </b><input class="share" ng-model="share.waitTime"></input> Minutes(s)</p>'+
                                    '<button class="upload" ng-click="upload(\'' + places[i].place_id + '\',\'' + places[i].name + '\',\'' + places[i].formatted_address + '\')">Upload</button>'+
                                    '</div>'+
                                    '</div>';
                            } else {
                                contentString = '<div id="content">'+
                                    '<div id="siteNotice">'+
                                    '</div>'+
                                    '<h1 style="font-size:20px;">'+places[i].name+'</h1>'+
                                    '<div id="bodyContent">'+
                                    '<p><b>Address: </b>' + places[i].formatted_address + '</p>'+
                                    '<p>No one has uploaded queue data yet.</p>'+
                                    '<h3 style="font-size:17px;">Share Your Data!</h3>'+
                                    '<p><b>Current Queue: </b><input class="share" ng-model="share.queueLen"></input> Person(s)</p>'+
                                    '<p><b>Estimated Waiting: </b><input class="share" ng-model="share.waitTime"></input> Minutes(s)</p>'+
                                    '<button class="upload" ng-click="upload(\'' + places[i].place_id + '\',\'' + places[i].name + '\',\'' + places[i].formatted_address + '\')">Upload</button>'+
                                    '</div>'+
                                    '</div>';
                            }
                            let upload = function(place_id, name, addr) {
                                console.log("uploading");
                                $http.post("http://ypan.me:8080/api/restaurant/upload/", {
                                    place_id: place_id,
                                    name: name,
                                    addr: addr,
                                    queue_len: 10,
                                    wait_time: 233,
                                });
                            };
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
                                    setTimeout(1000, () => {
                                        document.getElementsByClassName("upload")[0].addEventListener("click", () => {alert("Success Upload!");upload(places[i].place_id, places[i].name, places[i].formatted_address);});
                                    });
                                },
                            });
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
 
