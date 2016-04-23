myApp.controller("userCtrl",function($scope,$location){

      $scope.users = [];

      $scope.addUser = function (newUser) {

          if(newUser.super === undefined){
              newUser.super = false;
          }

          if(newUser.rich === undefined){
              newUser.rich = false;
          }

          if(newUser.genius === undefined){
              newUser.genius = false;
          }

          if(angular.isDefined(newUser) && newUser.name.length>0){

              $scope.users.push({name: newUser.name,
                  super: newUser.super,
                  rich: newUser.rich,
                  genius: newUser.genius,
                  isHide: false});

          }

          localStorage.setItem("arr",JSON.stringify($scope.users));
          //alert(localStorage.getItem("arr"));
          $scope.newUser.name = "";
      }

      $scope.sort = undefined;
      $scope.reverse = false;


      $scope.sortBy = function(sortParam){

              if($scope.sort === sortParam){
                  $scope.reverse = !$scope.reverse;
              } else{
                  $scope.sort = sortParam;
                  $scope.reverse = false;
              }
      }

      function hideElement(){

              for(var i in $scope.users){
                  if($scope.users[i].isHide){
                      $scope.users[i].isHide = false;
                  }
              }
      }



      $scope.isSure = function(user){

                hideElement();
                $scope.user = user;
                user.isHide = true;
      }

      $scope.noRemove = function(user){

                $scope.user = user;
                user.isHide = false;
      }

      $scope.removeUser = function(user){
                $scope.user = user;
                for(var i in $scope.users){
                    if($scope.users[i] === user){
                        var index =i;
                        $scope.users.splice(index,1);
                    }
                }
      }

      $scope.redirectTo = function(){


                var path = $location.path();

                if(path == "/super"&& !$scope.newUser.super){$location.path("/home");}
                else if(path == "/rich"&& !$scope.newUser.rich){$location.path("/home");}
                else if(path == "/genius"&& !$scope.newUser.genius){$location.path("/home");}
      }



});
