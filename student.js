'use strict';
var myApp = angular.module('myApp', [ 'ngRoute']);

myApp.factory('Data', function () {
	return { user: "joey-bachand", message: "Enter a message", course:"linear-algebra"};
});


myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/:user', {
      templateUrl: "course-list.html",
      controller: "CourseListCtrl"
  }).when('/:user/:course', 
  {
    templateUrl: "message-list.html",
    controller: "MessageListCtrl"
  }).otherwise({
      redirectTo: 'joey-bachand'});
}]);


function FirstCtrl($scope, $http, $routeParams,  Data){
  $scope.data = Data;
  Data.course = $routeParams.course;
  console.log(Data.course);
  $scope.postMsg = function () {
  	//console.log(course);
  	//msg ={
  	//	"user":Data.user,
  	//	"message":Data.message
  	//};
  	//console.log(msg.user);
    $http.defaults.useXDomain = true;
    //delete $http.defaults.headers.common['X-Requested-With'];
  	$http({method:'POST', url:'http://localhost:8080/class/' + Data.course, data:Data}).success(
    function () {
      Data.user = $routeParams.user;
      console.log(Data.user);
      //Data.course = $routeParams.course;
      $scope.user = Data.user;
      //console.log(Data.user);
      $http({method:'GET', url:'http://localhost:8080/class/' + Data.course})
      .success(function(data, status, headers, config) {
      $scope.messages = data;
    }).error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
      // this callback will be called asynchronously
      // when the response is available
  }).
  error(function(data, status, headers, config) {
    console.log(data);
    console.log(status);
    console.log(headers);
    console.log(config);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  }}



myApp.controller('MessageListCtrl', function ($scope, $http, $routeParams, Data) {
    Data.user = $routeParams.user;
    console.log(Data.user);
    //Data.course = $routeParams.course;
    $scope.user = Data.user;
    //console.log(Data.user);
    $http({method:'GET', url:'http://localhost:8080/class/' + $routeParams.course})
    .success(function(data, status, headers, config) {
    $scope.messages = data;
  }).error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

});

myApp.controller('CourseListCtrl', function ($scope, $http, $routeParams, Data) {
    Data.user = $routeParams.user;
    console.log($routeParams.user);
    $http.get('courses/courses.json').success(function(courseData) {
      $scope.courses = courseData;
    });
    $scope.user = Data;

  });
 
myApp.controller('UserListCtrl', function ($scope) {
  $scope.users = [
    {'name': 'Joey Bachand',
     'courses': 'joey-courses'},
    {'name': 'Caleb Sanders',
     'courses': 'caleb-courses'},
    {'name': 'Jacob Cornwell',
     'courses': 'jacob-courses'},
    {'name': 'Tyler Gillen',
     'courses': 'tyler-courses'},
    {'name': 'Brooke B',
     'courses': 'brooke-courses'}
  ];
  
});


myApp.controller('SwitchUser' ['$scope',  function ($scope){
  $scope.switchUser = function (newUser){
  
  $scope.filt = newUser;

} 
}]);
