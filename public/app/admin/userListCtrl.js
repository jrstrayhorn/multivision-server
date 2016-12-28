angular.module('app').controller('userListCtrl', ['$scope', 'userService', function($scope, userService){
   $scope.users = userService.users;
}]);