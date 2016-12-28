angular.module('app').factory('userService', ['$http', 'authService', function($http, authService){
    
    var o = {
        users: []
    };

    o.getAll = function() {
        return $http.get('/api/users', {
            headers: {Authorization: 'Bearer ' + authService.getToken()}
        }).success(function(data){
            angular.copy(data, o.users);
        });
    };

    return o;

}]);