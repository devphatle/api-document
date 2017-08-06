var app  = angular.module('users', []);

app.factory('acount', ['$http'], function($http){

    return {
        get : function(){
            return $http.get(api/users);
        }
    }
    
});