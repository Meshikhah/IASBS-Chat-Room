var app = angular.module('userContacts', ['ui.bootstrap']);

app.controller('userContactsController', function ($scope, $http) {
    $scope.clicked = -1;
    $scope.showLoader = true;
    $http.get('getContactList.php').then(function (d) {
        $scope.lst = d.data;
 
        $scope.totalItems = $scope.lst.length;
        $scope.currentPage = 1;
        $scope.numPerPage = 10;

        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.lst.indexOf(value);
            return (begin <= index && index < end);
        };


        $scope.onclick = function($index){
            $scope.clicked = $index;
            alert($scope.lst[$index]);
		}

        $scope.showLoader = false;

        $scope.$watch("name", function(){
            Data.setScope($scope.lst[$index]);
        });

    }, function (error) {
        alert('failed to load users list');
    });

});

app.controller("userMessageController", function($scope, $http){
    $scope.userName;

    $scope.$watch(function(){
        $scope.userName = Data.getScope()
    });
});


app.factory("Data", function(){

    var data = {
        name:""
    };
    return {
        getScope: function(){
            return data.name;
        },
        setScope: function(setData){
            data.name = setData;
        }
    }
});