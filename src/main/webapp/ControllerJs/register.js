var register = angular.module('register', ['ui.bootstrap']);

/*register.controller('registerController',function ($scope,$http) {
    $scope.registerFunction = function (inputParam) {
        console.log(inputParam);
        var re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(inputParam.userName))
        {
            console.log("dang nhap thanh cong");
            if (inputParam.password!==inputParam.passwordRepeat){
                alert("mật khẩu bạn nhập không gióng nhau,mời nhập lại ")
            }else {
                $http.post('http://localhost:8181/register-check', inputParam)
                    .success(function (resp) {
                        if (resp){
                            console.log(resp);
                            setTimeout(function() {
                                localStorage.removeItem("email");
                                window.location.href = "http://localhost:8181/login";
                            }, 500);
                        }else { alert('trùng tên tài khoản,mời nhập lại!');}
                    })
                    .error(function () {
                        alert('trùng tên tài khoản,mời nhập lại!');
                    });
            }
        }
        else {
            alert("Email sai định dạng,mời nhập lại")
        }
    };
});*/
register.controller('registerController', function ($scope, $http,$uibModal) {
    $scope.registerFunction = function (inputParam) {
        if (inputParam!== undefined && inputParam.userName !== null && inputParam.userName !== '' && inputParam.userName !== undefined &&
            inputParam.password !== null && inputParam.password !== '' && inputParam.password !== undefined &&
            inputParam.passwordRepeat !== null && inputParam.passwordRepeat !== '' && inputParam.passwordRepeat !== undefined) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(inputParam.userName)) {
                if (inputParam.password !== inputParam.passwordRepeat) {
                    alert("mật khẩu bạn nhập không gióng nhau,mời nhập lại ")
                } else {
                    $http.post('http://localhost:8181/register-check', inputParam)
                        .success(function (resp) {
                            if (resp !== null) {
                                $scope.dataEmail = resp;
                                $uibModal.open({
                                    templateUrl: 'http://localhost:8181/htmlviews/ModalVerificationEmail.html',
                                    controller: "VerificationEmail",
                                    scope: $scope,
                                    size: '',
                                });
                            } else {
                                alert('trùng tên tài khoản,mời nhập lại!');
                            }
                        })
                        .error(function () {
                            alert('trùng tên tài khoản,mời nhập lại!');
                        });
                }
            } else {
                alert("Email sai định dạng,mời nhập lại")
            }
        }else {
            $scope.status = "Bạn chưa nhập đủ thông tin";
        }
    };
});


register.controller('VerificationEmail', function ($scope, $rootScope, $uibModalInstance, $http) {
    $scope.dataEmaill = $scope.dataEmail;
    $scope.submitt = function (code) {
        $scope.dataEmaill.codeInput = code;
        $http.post('http://localhost:8181/register-email', $scope.dataEmaill)
            .success(function (resp) {
                if (resp !== null) {
                    setTimeout(function() {
                        localStorage.removeItem("email");
                        alert("Đăng kí thành công,bạn có muốn đăng nhập không.");
                        window.location.href = "http://localhost:8181/login";
                    }, 500);
                } else {
                    alert('Mã xác nhận sai,mời nhập lại!');
                }
            })
            .error(function () {
                alert('Mã xác nhận sai,mời nhập lại!');
            });
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});
