angular.module('app').controller('courseDetailsCtrl', ['$scope', 'courseService', '$stateParams', function($scope, courseService, $stateParams){
    $scope.course = {};

    courseService.GetById($stateParams._id)
        .then(function (course) {
            $scope.course = course;
        });
}]);