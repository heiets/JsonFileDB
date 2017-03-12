var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

$scope.contactId = 0;
var refresh = function() {
  $http.get('/contactlist').then(function(response) {
    console.log("I got the data I requested");
    console.log(response.data);
    $scope.contactlist = response.data.data;
    $scope.contact = {};
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).then(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).then(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $scope.contactId = id;
  $http.get('/contactlist/').then(function(response) {
    $scope.contact = response.data.data[id];
  });
};  

$scope.update = function() {
  console.log($scope.contactId);
  $http.put('/contactlist/' + $scope.contactId, $scope.contact).then(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿