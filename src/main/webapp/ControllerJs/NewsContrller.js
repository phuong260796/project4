App.controller('NewsContrller', function ($rootScope, $scope, $http, $state, $uibModal, $stateParams) {
    $scope.changeActiveNews = function (data, active) {
        if (data.active !== active) {
            if (active === "Y") {
                $(".changeN-" + data.id).removeClass("active");
                $(".changeN-" + data.id).addClass("notActive");
                $(".changeY-" + data.id).removeClass("notActive");
                $(".changeY-" + data.id).addClass("active");
            } else {
                $(".changeY-" + data.id).removeClass("active");
                $(".changeY-" + data.id).addClass("notActive");
                $(".changeN-" + data.id).removeClass("notActive");
                $(".changeN-" + data.id).addClass("active");
            }
            $http.post(BASE_URL + '/new/active/' + active, data)
                .success(function () {
                    data.active = active;
                });
        }

    };

    $scope.news = function () {
        $http.get(BASE_URL + '/new/get-news/' + $stateParams.id)
            .success(function (resp) {
                $rootScope.dataNews = resp;
            })
    };

    $scope.NewsAll = function () {
        $http.get(BASE_URL + '/new/get-all-news')
            .success(function (resp) {
                console.log(resp);
                $rootScope.dataNewsAll = resp;
            })
    };

    $scope.addNews = function () {
        $http.get(BASE_URL + '/getAllCateAddNews')
            .success(function (resp) {
                $scope.dataResp = resp;
                $uibModal.open({
                    templateUrl: BASE_URL + '/htmlviews/ModalAddNews.html',
                    controller: "ModalAddNews",
                    scope: $scope,
                    size: '',
                });
            });

    };

    $scope.updateNewss = function (id) {
        $http.get(BASE_URL + '/new/updatenewsdetail/' + id)
            .success(function (resp) {
                $scope.dataResp = resp;
                $http.get(BASE_URL + '/getAllCateAddNews')
                    .success(function (res) {
                        $scope.data = res;
                        $uibModal.open({
                            templateUrl: BASE_URL + '/htmlviews/ModalUpdateNews.html',
                            controller: "ModalUpdateNews",
                            scope: $scope,
                            size: '',
                        });
                    });
            });
    };

    $scope.deleteN = function (id) {
        $scope.idDelete = id;
        var modal = $uibModal.open({
            templateUrl: BASE_URL + '/htmlviews/ModalDeleteNews.html',
            controller: "ModalDeleteNews",
            scope: $scope,
            size: '',
        });
    };

    $scope.news();
    $scope.NewsAll();
});

App.controller('ModalDeleteNews', function ($scope, $uibModalInstance, $http) {
    $scope.deleteNewss = function () {
        $scope.id = $scope.idDelete;
        $http.post(BASE_URL + '/new/delete/' + $scope.id, null)
            .success(function () {
                $(".new-" + $scope.id).addClass("hidden");
            });
        $uibModalInstance.close("Ok");
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});

App.controller('ModalUpdateNews', function ($rootScope,$scope, $uibModalInstance, $http) {
    setTimeout(function () {
        CKEDITOR.replace('editor1');
    }, 500);
    $scope.dataRespone = $scope.dataResp;
    $scope.dataCate = $scope.data;
    $scope.updatNewss = function () {
        var valueContent = CKEDITOR.instances["editor1"].getData();
        var data = {
            id: $scope.dataRespone.id,
            title: $scope.dataRespone.title,
            categoryId: $scope.dataRespone.categoryId,
            content: valueContent,
            active: $scope.dataRespone.active,
            createTime: null
        };
        if ($scope.dataRespone.title !== null && $scope.dataRespone.title !== '' && $scope.dataRespone.title !== undefined &&
            valueContent !== null && valueContent !== '' && valueContent !== undefined) {
            $http.post(BASE_URL + '/new/check-add-update', data)
                .success(function (res) {
                    if (res) {
                        $http.post(BASE_URL + '/new/add-update', data)
                            .success(function (resp) {
                                angular.forEach($rootScope.dataNews, function (value, key) {
                                    if (value.id === resp.id) {
                                        $rootScope.dataNews[key] = resp;
                                    }
                                });
                            });
                        $uibModalInstance.close("Ok");
                    } else {
                        alert('trùng tên tài khoản mời nhập lại!');
                    }
                })
                .error(function () {
                    alert('trùng tên tài khoản mời nhập lại!');
                });
        } else {
            console.log(143);
            $scope.status = "Bạn chưa nhập đủ thông tin";
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});

App.controller('ModalAddNews', function ($rootScope, $scope, $uibModalInstance, $http) {
    setTimeout(function () {
        CKEDITOR.replace('editor1');
    }, 500);
    $scope.listdata = $scope.dataResp;

    $scope.addN = function (inputParam) {
        var valueContent = CKEDITOR.instances["editor1"].getData();
        // var valueContent1 = CKEDITOR.instances["editor1"].document.getBody().getText();
        var data = {
            id: null,
            title: inputParam.title,
            categoryId: inputParam.categoryId,
            content: valueContent,
            active: "Y",
            createTime: null
        };
        if (inputParam.title !== null && inputParam.title !== '' && inputParam.title !== undefined &&
            valueContent !== null && valueContent !== '' && valueContent !== undefined) {
            $http.post(BASE_URL + '/new/check-add-update', data)
                .success(function (res) {
                    if (res) {
                        $http.post(BASE_URL + '/new/add-update', data)
                            .success(function (resp) {
                                $rootScope.dataNews.push(resp);
                            });
                        $uibModalInstance.close("Ok");
                    } else {
                        alert('trùng tên tài khoản mời nhập lại!');
                    }
                })
                .error(function () {
                    alert('trùng tên tài khoản mời nhập lại!');
                });
        } else {
            $scope.status = "Bạn chưa nhập đủ thông tin";
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});

