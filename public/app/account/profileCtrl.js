angular.module('app').controller('profileCtrl', ['$scope', '$state', 'authService', 'notifierService', function($scope, $state, authService, notifierService){
    
    $scope.user = {};

    $scope.user.email = authService.currentUser();
    $scope.user.fname = authService.currentUserFirstName();
    $scope.user.lname = authService.currentUserLastName();

    $scope.update = function(){

        var newUserData = {
            username: $scope.user.email,
            firstname: $scope.user.fname,
            lastname: $scope.user.lname
        };
        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        authService.update(newUserData).error(function(error){
            $scope.error = error;
        }).then(function(){
            notifierService.notify('User updated successfully!');
            $state.go('main');
        });
    };
}]);