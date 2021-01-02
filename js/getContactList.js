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
        

        // $scope.onclick = function($index){
        //     $scope.clicked = $index;
        //     alert($scope.lst[$index]);

        //     $scope.usr = $scope.lst[$index];
           
        //     //alert(usr);
        //     // $.ajax({
        //     //     url: 'getMessage.php',
        //     //     type: 'post',
        //     //     async: !1,
        //     //     //contentType: 'charset=utf-8',
        //     //     data: { un: $usr},
        //     //     success: function (data) {
        //     //        alert("seccess"+data);
        //     // });
        // }
        
        
        

    


            // xmlhttp = new XMLHttpRequest();
            // xmlhttp.onreadystatechange = function ()
            // {
            //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            //         m.innerHTML = xmlhttp.responseText;
            //     else if (xmlhttp.readyState == 1)
            //         m.innerHTML = "please wait...";
            // }
            // xmlhttp.open("GET", "getmessagelist.php?un="+$usr, false);
            // xmlhttp.send();
		//}

        $scope.showLoader = false;


    }, function (error) {
        alert('failed to load users list');
    });

    $scope.onclick = function($index){
        $scope.clicked = $index;
        //alert($scope.lst[$index]);

        $scope.usr = $scope.lst[$index];
        var x = {user1:$scope.usr};
        // $.ajax({
        //     url: 'getmessage1.php',
        //     type: 'POST',
        //     async: !1,
        //     //contentType: 'charset=utf-8',
        //     data: { un_to: $scope.usr},
        //     success: function (data) {
        //         alert("ok:"+data);
        //     }
        // });


        $http.post('getmessagelist.php', JSON.stringify(x)).then(function (responseText) {
            //alert("ok");
            $scope.messages = responseText.data;

            //alert($scope.messages.data);
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


