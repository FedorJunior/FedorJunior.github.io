angular.module("authorizeApp",['ngRoute'])
    .config(function($routeProvider){

        $routeProvider.when('/login',{templateUrl:'loginPage.html'})
            .when('/create',{templateUrl:'createAccountPage.html'})
            .when('/private',{templateUrl:'privatePage.html'})
            .otherwise({redirectTo:'/login'});
    })
    .controller("authorizeCtrl",function($scope,$location,$timeout){

        $scope.accountExist = false;

        //хранилище данных
        $scope.storage = [{name: "default", password: "default"}];

        //вход пользователя в систему или перенаправление на создание аккаунта
        $scope.logIn = function(user){
            var storage = $scope.storage;
            if($scope.containsRequiredProp(user)){
                for(var i=0;i<storage.length;i++){
                    if(angular.equals(storage[i],user)){
                        $scope.path = "private";
                        break;
                        //проверяем, авторизирован ли пользователь
                    }
                    if(i == storage.length - 1){
                        $scope.path = "create";
                        //если пользователь неавторизирован, перенаправляем его на страницу создания аккаунта
                    }
                }
            }
            $scope.setDefault(user);//обнуляем значение при переходе со страницы
        }

        //проверка, что все поля заполнены
        $scope.containsRequiredProp = function(user){
            return (user && (user.name && user.password));
        }

        //обнуляет поля
        $scope.setDefault = function(user){
            if(angular.isDefined(user)){
                user.name = "";
                user.password = "";
            }
        }

        //создание аккаунта
        $scope.createAccount = function(user){
            if(angular.isObject(user)){
                if($scope.containsRequiredProp(user)){
                    if(!$scope.checkDuplicates(user)){
                        $scope.storage.push(angular.copy(user));
                        $location.path("/login");
                        $scope.accountExist = false;
                    } else {
                        $scope.accountExist = true;
                        $timeout(function(){
                            $scope.accountExist = false;
                        },3000);
                    }
                }
            }
            $scope.setDefault(user);
        }

        //существоет ли аккаунт с таким же именем
        $scope.checkDuplicates = function(user){
            var storage = $scope.storage;
            for(var i=0;i<storage.length;i++){
                if(storage[i].name == user.name){
                    return true;
                    break;
                }
            }
            return false;
        }

        $scope.logOut = function(){
            $location.path("/login");
            $scope.path = "";
        }
    });
