angular.module('app').controller('signupCtrl', ['$scope', '$state', 'authService', 'notifierService', function($scope, $state, authService, notifierService){
    
    $scope.user = {};

    $scope.register = function(){
        authService.register($scope.user).error(function(error){
            $scope.error = error;
        }).then(function(){
            notifierService.notify('User created successfully!');
            $state.go('main');
        });
    };
}]);