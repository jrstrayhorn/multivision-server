angular.module('app', ['ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/app/main/main.html',
            controller: 'mainCtrl'
        })

        .state('courses', {
            url: '/courses',
            templateUrl: '/app/courses/course-list.html',
            controller: 'courseListCtrl'
        })

        .state('courseDetails', {
            url: '/courses/{_id}',
            templateUrl: '/app/courses/course-details.html',
            controller: 'courseDetailsCtrl'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: '/app/account/signup.html',
            controller: 'signupCtrl',
            onEnter: ['$location', 'authService', function($location, authService){
                if(authService.isLoggedIn()){
                    $location.path("/");
                }
            }]
        })

        .state('profile', {
            url: '/profile',
            templateUrl: '/app/account/profile.html',
            controller: 'profileCtrl',
            onEnter: ['$location', 'authService', function($location, authService){
                if(!authService.isLoggedIn()){
                    $location.path("/");
                }
            }]
        })

        .state('login', {
            url: '/login',
            templateUrl: '/app/account/login.html',
            controller: 'loginCtrl',
            onEnter: ['$location', 'authService', function($location, authService){
                if(authService.isLoggedIn()){
                    $location.path("/");
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
            onEnter: ['$location', 'authService', function($location, authService){
                if(!authService.isAuthorized('admin')){
                    $location.path("/");
                }
            }]
        })
        ;
    
    $urlRouterProvider.otherwise('main');
}]);

