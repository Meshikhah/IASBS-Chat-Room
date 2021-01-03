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
                $http.post('getmessagelist.php', JSON.stringify(x)).then(function (responseText1) {
                    $scope.messages = responseText1.data;
    
            });

        });
        }

    }


    $scope.onclick3 = function($index){
        
        var x = {user1:$scope.usr, date:$scope.messages[$index].date};
        $http.post('deletemessage.php', JSON.stringify(x)).then(function (responseText) {
            //alert("ok");
            $scope.messages = responseText.data;
            $http.post('getmessagelist.php', JSON.stringify(x)).then(function (responseText1) {
                $scope.messages = responseText1.data;

        });

            //alert($scope.messages.data);
        });
    }

    $scope.onclick4 = function(){
        var x = {user1:$scope.usr};
        $http.post('setblockedlist.php', JSON.stringify(x)).then(function (responseText) {
            //alert("ok");
            // $scope.messages = responseText.data;
            $http.post('getblockedlist.php', JSON.stringify(x)).then(function (responseText1) {
                $scope.blockedlist = responseText1.data;
                alert($scope.blockedlist);

        });

            //alert($scope.messages.data);
        });
    }

    $scope.onclick5 = function(){
        
        
        $http.get('allusers.php').then(function (d) {
            var x = {user1:$scope.usr};
            $scope.allusers = d.data;
            var all = $scope.allusers;
            all[0]=" ";
            all = all.split(' ').join("\n");
            all = all.split('"').join(" ");
            var contact = prompt(all,"Type username");
            if (contact == null || contact == "") {
                txt = "User cancelled the prompt.";
            } else if(all.search(contact)) {
                //alert(contact);
                var x = {user1:contact};
                $http.post('addcontact.php', JSON.stringify(x)).then(function (responseText) {
                    $http.get('getContactList.php').then(function (d) {
                        $scope.lst = d.data;
                    });
              });
            }
        });
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


