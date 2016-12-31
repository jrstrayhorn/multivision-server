
angular.module('app').controller('courseListCtrl', ['$scope', 'courseService', function($scope, courseService){
    $scope.courses = [];

    courseService.GetAll()
        .then(function (courses) {
            $scope.courses = courses;
        });

    $scope.sortOptions = [
        {value:"title",text:"Sort by Title"},
        {value:"published",text: "Sort by Publish Date"}
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
}]);