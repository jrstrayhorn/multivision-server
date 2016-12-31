
angular.module('app').controller('mainCtrl', ['$scope', 'courseService', function($scope, courseService){
    $scope.courses = [];

    courseService.GetAll()
       .then(function (courses) {
           $scope.courses = courses;
       });
}]);