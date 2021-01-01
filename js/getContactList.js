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


        // $scope.onclick = function($index){
        //     $scope.clicked = $index;
        //     alert($scope.lst[$index]);

        //     $usr = $scope.lst[$index];
        //     //alert(usr);
        //     // $.ajax({
        //     //     url: 'getMessage.php',
        //     //     type: 'post',
        //     //     async: !1,
        //     //     //contentType: 'charset=utf-8',
        //     //     data: { un: $usr},
        //     //     success: function (data) {
        //     //        alert("seccess"+data);
        //     //     }
        //     // });


        //     //$http.post('/getMessage.php', {un: $usr}, config).then(successCallback, errorCallback);
        



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

        // $scope.$watch("name", function(){
        //     Data.setScope($scope.lst[$index]);
        // });

        

    }, function (error) {
        alert('failed to load users list');
    });

    $scope.onclick = function($index){
        $scope.clicked = $index;
        alert($scope.lst[$index]);
        
        $usr = $scope.lst[$index];

        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function ()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                m.innerHTML = xmlhttp.responseText;
            else if (xmlhttp.readyState == 1)
                m.innerHTML = "please wait...";
        }
        xmlhttp.open("GET", "getmessagelist.php?un="+$usr, false);
        xmlhttp.send();
    }

});

app.controller("userMessageController", function($scope, $http){
    $scope.userName;

    $scope.clicked = -1;
    $scope.showLoader = true;
    $http.get('getmessagelist.php').then(function (d) {

        $scope.lst = d.data;
        // alert($scope.lst);
         alert($scope.lst);

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
    // $scope.$watch(function(){
    //     $scope.userName = Data.getScope()
    });

    // $.ajax({
    //         url: 'getMessage.php',
    //         type: 'post',
    //         async: !1,
    //         //contentType: 'charset=utf-8',
    //         data: { un: $scope.userName},
    //         success: function (data) {
    //             alert("seccess"+data);
    //         }
    //     });
});


// app.factory("Data", function(){

//     var data = {
//         name:""
//     };
//     return {
//         getScope: function(){
//             return data.name;
//         },
//         setScope: function(setData){
//             data.name = setData;
//         }
//     }
// });