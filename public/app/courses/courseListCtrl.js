
angular.module('app').controller('courseListCtrl', ['$scope', 'courseService', function($scope, courseService){
    $scope.courses = [];

    courseService.GetAll()
        .then(function (courses) {
            $scope.courses = courses;
        });
}]);