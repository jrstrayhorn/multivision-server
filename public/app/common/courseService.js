angular.module('app').factory('courseService', ['$http', 'authService', '$q', function($http, authService, $q){
    
    var apiUrl = '/api/courses';
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;

    return service;

    function GetAll() {
        return $http.get(apiUrl).then(handleSuccess, handleError);
    }

    function GetById(_id) {
        return $http.get(apiUrl + '/' + _id).then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }

}]);