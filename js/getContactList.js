var app = angular.module('userContacts', ['ui.bootstrap']);

app.controller('userContactsController', function ($scope, $http) {
    $scope.clicked = -1;
    $scope.showLoader = true;
    $scope.messages;

    
    

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
        $scope.showLoader = false;


    }, function (error) {
        alert('failed to load users list');
    });

    $scope.onclick = function($index){
        $scope.clicked = $index;
        //alert($scope.lst[$index]);

        $scope.usr = $scope.lst[$index];
        var x = {user1:$scope.usr};
        $http.post('getmessagelist.php', JSON.stringify(x)).then(function (responseText) {
            //alert("ok");
            $scope.messages = responseText.data;

            //alert($scope.messages.data);
        });
    }

    $scope.onclick2 = function() {
        $scope.msg = document.getElementById('txt-msg').value;
        //alert($scope.msg);
        //alert($scope.usr);
        document.getElementById('txt-msg').value = "";
        if($scope.msg != "") {
            var x = {user1:$scope.usr, msg:$scope.msg};
            $http.post('sendmessage.php', JSON.stringify(x)).then(function (responseText) {
            //alert(responseText.data);
                $http.post('getmessagelist.php', JSON.stringify(x)).then(function (responseText) {
                    $scope.messages = responseText.data;
    
            });

        });
        }

    }

});

app.controller("userMessageController", function($scope, $http){
    $scope.userName;

    $scope.clicked = -1;
    $scope.showLoader = true;
    $http.get('getmessagelist.php').then(function (d) {

        $scope.lst = d.data;
         //alert($scope.lst);
         //alert($scope.lst);

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

    });

});


