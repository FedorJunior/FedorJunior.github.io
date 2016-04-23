var myApp = angular.module("myApp",['ngRoute'])
            .config(function($routeProvider){

                $routeProvider
                    .when('/home',{
                        templateUrl: 'home.html'
                    })

                    .when('/super',{
                        templateUrl: 'super.html'
                    })

                    .when('/rich',{
                        templateUrl: 'rich.html'
                    })

                    .when('/genius',{
                        templateUrl: 'genius.html'
                    })

                    .otherwise({
                        redirectTo:'/home'})
    });