var registerfb = angular.module('registerfb', []);
registerfb.controller('RegisterFacebookController', function ($scope, $http, $rootScope) {
    // $scope.userName  =   document.write(sessionStorage.userName);
    // console.log($scope.userName);

    if (typeof (Storage) !== "undefined") {
        var data = localStorage.getItem('email');
        var dataparam = {
            userName: data,
            password: null,
            passwordRepeat: null
        };
        $scope.dataa = dataparam;
    } else {
        alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
    }

    $scope.registerFb = function (inputParam) {
        if (inputParam!== undefined && inputParam.userName !== null && inputParam.userName !== '' && inputParam.userName !== undefined &&
            inputParam.password !== null && inputParam.password !== '' && inputParam.password !== undefined &&
            inputParam.passwordRepeat !== null && inputParam.passwordRepeat !== '' && inputParam.passwordRepeat !== undefined) {
        if (inputParam.password !== inputParam.passwordRepeat) {
            alert("mật khẩu bạn nhập không gióng nhau,mời nhập lại ")
        } else {
            $http.post('http://localhost:8181/register-social', inputParam)
                .success(function (resp) {
                    if (resp) {
                        setTimeout(function () {
                            localStorage.removeItem("email");
                            alert("Đăng kí thành công,bạn có muốn đăng nhập không.");
                            window.location.href = "http://localhost:8181/login";
                        }, 500);
                    } else {
                        alert('trùng tên tài khoản,mời nhập lại!');
                    }
                })
                .error(function () {
                    alert('trùng tên tài khoản,mời nhập lại!');
                });
        }
        }else {
            $scope.status = "Bạn chưa nhập đủ thông tin";
        }
    };
});