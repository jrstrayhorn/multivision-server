angular.module('app', ['ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/app/main/main.html',
            controller: 'mainCtrl'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: '/app/account/signup.html',
            controller: 'signupCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/app/account/login.html',
            controller: 'loginCtrl',
            onEnter: ['$state', 'authService', function($state, authService){
                if(authService.isLoggedIn()){
                    $state.go('main');
                }
            }]
        })

        .state('adminUsers', {
            url: '/admin/users',
            templateUrl: '/app/admin/user-list.html',
            controller: 'userListCtrl',
            resolve: {
                userPromise: ['userService', function(userService){
                    return userService.getAll();
                }]
            },
            onEnter: ['$state', 'authService', function($state, authService){
                if(!authService.isAuthorized('admin')){
                    $state.go('main');
                }
            }]
        })
        ;
    
    $urlRouterProvider.otherwise('main');
}]);

