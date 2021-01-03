
var app = angular.module('userContacts', ['ui.bootstrap']);

app.controller('userContactsController', function ($scope, $http) {
    $scope.clicked = -1;
    $scope.showLoader = true;
    $scope.messages;

    
    
    
    $http.get('getContactList.php').then(function (d) {
        $scope.lst = d.data;
        $scope.totalItems = $scope.lst.length;
        $scope.currentPage = 1;
        $scope.numPerPage = 100;

        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.lst.indexOf(value);
            return (begin <= index && index < end);
        };
        
        $scope.showLoader = false;
        
        
        $scope.imgload();
        
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
        $http.post('getblockedlist.php').then(function (responseText1) {
            $scope.blockedlist = responseText1.data;
            //alert($scope.blockedlist);
    
            if(($scope.blockedlist.includes($scope.usr))) {
                //alert("block");
                document.getElementById('txt-msg').readOnly = true;
                document.getElementById('txt-msg').placeholder = "Blocked";
            }else {
                //alert("unblock");
    
                document.getElementById('txt-msg').readOnly = false;
                document.getElementById('txt-msg').placeholder = "Type a message...";
            }
                
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

    $scope.block = function(){
        var x = {user1:$scope.usr};
        $http.post('setblockedlist.php', JSON.stringify(x)).then(function (responseText) {
            //alert("ok");
            // $scope.messages = responseText.data;
            $http.post('getblockedlist.php').then(function (responseText1) {
                $scope.blockedlist = responseText1.data;
                alert($scope.blockedlist);

                if(($scope.blockedlist.includes($scope.usr))) {
                    document.getElementById('txt-msg').readOnly = true;
                    document.getElementById('txt-msg').placeholder = "Blocked";
                }else {
                    document.getElementById('txt-msg').readOnly = false;
                    document.getElementById('txt-msg').placeholder = "Type a message...";
                }
                    
        });

            //alert($scope.messages.data);
        });
    }

    $scope.unblock = function(){
        var x ={user1:$scope.usr};
        $http.post('unblock.php', JSON.stringify(x)).then(function(responseText){
            $http.post('getblockedlist.php').then(function (responseText1) {
                $scope.blockedlist = responseText1.data;
                alert($scope.blockedlist);

                if(($scope.blockedlist.includes($scope.usr))) {
                    document.getElementById('txt-msg').readOnly = true;
                    document.getElementById('txt-msg').placeholder = "Blocked";
                }else {
                    document.getElementById('txt-msg').readOnly = false;
                    document.getElementById('txt-msg').placeholder = "Type a message...";
                }
                    
            });
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

    $scope.logout = function(){
        $http.post('logout.php').then(function(){
            // alert("logout me");
            // $location.path('/index.php');
            // $location.replace();
            // $route.reload();
            location.reload();
        });
    }


    $scope.imgload = function() {  
        $.getJSON('imageprofile.php', function(data) {
            $scope.imgs = data;
            //alert($scope.imgs);
            for(let i = 0; i < $scope.lst.length; i++) {
                document.getElementById('img-profile-'+i).src =  $scope.imgs[i].download_url;
            }
        });
        
        
    }

    $scope.onclick_profile = function(){

        var x = {user1:$scope.usr};

        $http.post('profile.php', JSON.stringify(x)).then(function(responseText){
            $scope.prof = responseText.data;
            var prf = $scope.prof;
            prf = prf.split('"').join("");
            prf = prf.split(':').join(": ");
            prf = prf.split(',').join("\n");
            alert(prf);
        });
    }

    $scope.isBlock = function() {
        
        var x = document.getElementById('txt-msg').placeholder;
        if(x == "Blocked")return true;
        else return false;

    }
    

    $scope.edit = function($index){
        var x = {user1:$scope.usr, message:$scope.messages[$index].message, date:$scope.messages[$index].date};
        var editedMessage = prompt("Edit the message", $scope.messages[$index].message);
        if(editedMessage != "" && editedMessage != $scope.messages[$index].message){
            // alert($scope.messages[$index].message);
            var x = {user1:$scope.usr, message:editedMessage, date:$scope.messages[$index].date};
            $http.post('editmessage.php', JSON.stringify(x)).then(function (responseText) {
                //alert("ok");
                $scope.messages = responseText.data;
                $http.post('getmessagelist.php', JSON.stringify(x)).then(function (responseText1) {
                    $scope.messages = responseText1.data;
    
            });
                //alert($scope.messages.data);
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
        $scope.numPerPage = 100;

        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.lst.indexOf(value);
            return (begin <= index && index < end);
        };

    });

});


