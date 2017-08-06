var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/', { templateUrl: 'views/parts/login.ejs' })
    .when('/dashboard', {
        resolve: {
            "check" : function($location, $rootScope){
                    if(!$rootScope.loggedIn)  $location.path('/');
            }
        }, 
        templateUrl: '/views/parts/dashboard.ejs'
    })
    .otherwise({ redirectTo : '/' })
});

app.controller("loginCtrl", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
    
    $scope.submit = function(){

        var userName = $scope.userName;
        var userPassworld = $scope.userPassworld;
         $rootScope.thisName
   
         if($scope.userName == 'admin' && $scope.userPassworld == 'admin') {

                $rootScope.loggedIn = true;
                $location.path('/dashboard');
                
         }

    };


}]);

app.controller("Users", ['$scope', 'acount', function($scope, acount){


}]);