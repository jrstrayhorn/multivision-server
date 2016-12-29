angular.module('app').factory('authService', ['$http', '$window', function($http, $window){
    var auth = {};

    auth.saveToken = function (token){
        $window.localStorage['multivision-token'] = token;
    };

    auth.getToken = function (){
        return $window.localStorage['multivision-token'];
    };

    auth.isLoggedIn = function(){
        var token = auth.getToken();

        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.isAdmin = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.roles && payload.roles.indexOf('admin') > -1;
        }
    };

    auth.isAuthorized = function(role){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.roles && payload.roles.indexOf(role) > -1;
        }
    };

    auth.currentUserFullName = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.firstname + ' ' + payload.lastname;
        }
    };

    auth.register = function(user){
        return $http.post('/register', user).success(function(data){
            auth.saveToken(data.token);
        });
    };

    auth.logIn = function(user){
        return $http.post('/login', user).success(function(data){
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function(){
        $window.localStorage.removeItem('multivision-token');
    };

    return auth;
}]);