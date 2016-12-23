angular.module('app', ['ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: '/partials/partial-main.html',
            controller: 'mainCtrl'
        })
        ;
    
    $urlRouterProvider.otherwise('main');
}]);

