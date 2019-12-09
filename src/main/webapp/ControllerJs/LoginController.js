var loginController = angular.module('login', []);

loginController.controller('LoginController', function ($rootScope, $scope, $http) {
    $scope.checkk = true;
    // var data = localStorage.getItem('checkrm');
    // var checkrm = 0;
    // if (data < 1||data === undefined) {
    //     $scope.checkReme = function () {
    //         let cookie = document.cookie.split(";").reduce((ac, cv, i) => Object.assign(ac, {[cv.split('=')[0]]: cv.split('=')[1]}), {});
    //         $http.get('http://localhost:8181/remember')
    //             .success(function (resp) {
    //                 console.log(resp);
    //                 if (resp != null) {
    //                     setTimeout(function () {
    //                         window.location.href = "http://localhost:8181/#/home/" + resp.userName;
    //                     }, 500);
    //                 }
    //                 // else {
    //                 //     // window.location.href = "http://localhost:8181/htmlviews/loginn";
    //                 //     if (typeof (Storage) !== 'undefined') {
    //                 //         var a = checkrm++;
    //                 //         localStorage.setItem('checkrm', a);
    //                 //     } else {
    //                 //         alert('Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!');
    //                 //     }
    //                 // }
    //             })
                // .error(function () {
                //     // window.location.href = "http://localhost:8181/htmlviews/loginn";
                //     if (typeof (Storage) !== 'undefined') {
                //       var a = checkrm++;
                //         localStorage.setItem('checkrm', a);
                //     } else {
                //         alert('Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!');
                //     }
                // })
    //     };
    // }
    $scope.loginFunction = function (inputParam) {
        if (inputParam !== undefined && inputParam.userName !== null && inputParam.userName !== '' && inputParam.userName !== undefined &&
            inputParam.password !== null && inputParam.password !== '' && inputParam.password !== undefined) {
            $http.post('http://localhost:8181/check-login', inputParam)
                .success(function (resp) {
                    if (resp) {
                        setTimeout(function () {
                            $rootScope.user = inputParam.userName;
                            // $state.go('home', {stateParamKey: inputParam.userName});

                            window.location.href = "http://localhost:8181/#/home";
                            // window.location.href =  "http://localhost:8181/home/";
                        }, 500);
                    } else {
                        alert('sai tai khoan hoac mat khau!');
                    }
                })
                .error(function () {
                    alert('sai tai khoan hoac mat khau!');
                });
        } else {
            $scope.status = "Bạn chưa nhập đủ thông tin";
        }

    };

    window.fbAsyncInit = function () {
        FB.init({
            appId: '513060062595617',
            cookie: true,
            xfbml: true,
            version: 'v3.3'
        });
    };
    $scope.RequestLoginFB = function () {
        setTimeout(function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    var accessToken = response.authResponse.accessToken;
                    $http.get('http://localhost:8181/login-facebook/' + accessToken)
                        .success(function (resp) {
                            if (resp.password != null) {
                                $http.post('http://localhost:8181/check-login', resp)
                                    .success(function (respone) {
                                        if (respone) {
                                            setTimeout(function () {
                                                $rootScope.user = resp.userName;
                                                window.location.href = "http://localhost:8181/#/home";
                                            }, 500);
                                        } else {
                                            alert('sai tai khoan hoac mat khau!');
                                        }
                                    })
                                    .error(function () {
                                        alert('sai tai khoan hoac mat khau!');
                                    });
                            } else {
                                $rootScope.dataResponee = resp;
                                if (typeof (Storage) !== 'undefined') {
                                    localStorage.setItem('email', resp.userName);
                                } else {
                                    alert('Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!');
                                }

                                setTimeout(function () {
                                    window.location.href = "http://localhost:8181/htmlviews/RegisterWithFacebook.html";
                                }, 500);
                            }
                        })
                }
            }, {scope: 'email,public_profile', return_scopes: true});
        }, 500);
    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId=513060062595617";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // $scope.checkReme();

});



