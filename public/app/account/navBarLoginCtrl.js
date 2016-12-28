angular.module('app').controller('navBarLoginCtrl', ['$scope', 'authService', function($scope, authService){
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.currentUser = authService.currentUser;
    $scope.logOut = authService.logOut;
    $scope.currentUserFullName = authService.currentUserFullName;
}]);