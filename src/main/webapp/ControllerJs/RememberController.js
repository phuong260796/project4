var remember = angular.module('remember', []);
remember.controller('RememberController', function ($scope) {
    $scope.test = function () {
        setTimeout(function () {
            window.location.href = "http://localhost:8181/#/home";
        }, 500);
    };
    $scope.test()
});



