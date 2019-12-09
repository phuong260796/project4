App.controller('IndexController', function ($scope, $rootScope, $http, $state, $uibModal, $stateParams) {
    $scope.changeActive = function (data, active) {
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
            $http.post(BASE_URL + '/update-active/' + active, data)
                .success(function () {
                    data.active = active;
                });
        }

    };


    $scope.index = function () {
        $http.get(BASE_URL + '/data-index')
            .success(function (resp) {
                $rootScope.dataIndex = resp;
                $rootScope.userName = $stateParams.userName;
                console.log($rootScope.userName );
            })
    };


    $scope.addCategory = function () {
        var modalInstance = $uibModal.open({
            templateUrl: BASE_URL + '/htmlviews/ModalAddCategory.html',
            controller: "ModalAddCategory",
            size: '',
        });
    };

    $scope.updateCategory = function (id) {
        $http.get(BASE_URL + '/updatedetail/' + id)
            .success(function (resp) {
                $scope.dataResp = resp;
                $uibModal.open({
                    templateUrl: BASE_URL + '/htmlviews/ModalUpdateCategory.html',
                    controller: "ModalUpdateCategory",
                    scope: $scope,
                    size: '',
                });
            });
    };

    $scope.deleteCate = function (id) {
        $http.get(BASE_URL + '/check-delete/' + id)
            .success(function (resp) {
                // $scope.dataResp = resp;
                var dataDelete = {
                    qtyNews: resp,
                    categoryId: id
                };
                $scope.dataResp = dataDelete;
                $uibModal.open({
                    templateUrl: BASE_URL + '/htmlviews/ModalDeleteCategory.html',
                    controller: "ModalDeleteCategory",
                    scope: $scope,
                    size: '',
                });
            });
    };

    $scope.index();

});

App.controller('ModalDeleteCategory', function ($scope, $uibModalInstance, $http) {
    $scope.dataRespone = $scope.dataResp;
    $scope.delete = function () {
        $http.post(BASE_URL + '/delete/' + $scope.dataRespone.categoryId, null)
            .success(function () {
                $(".cate-" + $scope.dataRespone.categoryId).addClass("hidden");
            });
        $uibModalInstance.close("Ok");
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});

App.controller('ModalAddCategory', function ($scope, $rootScope, $uibModalInstance, $http) {

    $scope.ok = function (inputParam) {
        if (inputParam !== null && inputParam !== '' && inputParam !== undefined) {
            var data = {
                id: null,
                name: inputParam,
                active: "Y"
            };
            $http.post(BASE_URL + '/check-add-update', data)
                .success(function (resp) {
                    if (resp) {
                        $http.post(BASE_URL + '/add-update', data)
                            .success(function (resp) {
                                    $rootScope.dataIndex.push(resp);
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

App.controller('ModalUpdateCategory', function ($scope, $rootScope, $uibModalInstance, $http) {
    $scope.dataRespone = $scope.dataResp;
    $scope.submit = function () {
        if ($scope.dataRespone.name !== null && $scope.dataRespone.name !== '' && $scope.dataRespone.name !== undefined) {
            $http.post(BASE_URL + '/check-add-update', $scope.dataRespone)
                .success(function (resp) {
                    if (resp) {
                        $http.post(BASE_URL + '/add-update', $scope.dataRespone)
                            .success(function (resp) {
                                angular.forEach($rootScope.dataIndex, function (value, key) {
                                    if (value.id === resp.id) {
                                        $rootScope.dataIndex[key] = resp;
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
            $scope.status = "Bạn chưa nhập đủ thông tin";
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});