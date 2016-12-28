angular.module('app').controller('navBarLoginCtrl', ['$scope', 'authService', 'notifierService', function($scope, authService, notifierService){
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.currentUser = authService.currentUser;
    $scope.logOut = function(){
        authService.logOut();
        notifierService.notify('You have successfully logged out!');
    }; 
    $scope.currentUserFullName = authService.currentUserFullName;
    $scope.isAdmin = authService.isAdmin;
}]);