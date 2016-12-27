angular.module('app').controller('navBarLoginCtrl', ['$scope', 'authService', function($scope, authService){
    $scope.user = {};

    $scope.login = function(){
        authService.logIn($scope.user).error(function(error){
            console.log('failed to log in!');
        }).then(function(){
            console.log('logged in!');
        });
    };
}]);