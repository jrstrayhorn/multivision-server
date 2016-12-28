angular.module('app').controller('navBarLoginCtrl', ['$scope', 'authService', 'notifierService', '$location', function($scope, authService, notifierService, $location){
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.currentUser = authService.currentUser;
    $scope.logOut = function(){
        authService.logOut();
        notifierService.notify('You have successfully logged out!');
        $location.path('/');
    }; 
    $scope.currentUserFullName = authService.currentUserFullName;
    $scope.isAdmin = authService.isAdmin;
}]);