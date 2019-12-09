App.controller('LoginBankController', function ($rootScope, $scope, $http, $state, $uibModal, $stateParams) {
    $scope.inputParam = {};
    $scope.searchUserBank = function () {
        $scope.param = $scope.inputParam;
        $http.post("http://localhost:8181/search-user-bank", $scope.param)
            .success(function (res) {
                $rootScope.dataRespone = res;
            })
    };

    $scope.nganhang = [
        'Tất cả',
        'Techcombank',
        'Vietcombank',
        'Tpbank'
    ];

    $scope.trangthai = [
        'Tất cả',
        'Kích hoạt',
        'Chưa kích hoạt'
    ];

    $scope.sapxep = [
        'Mới nhất',
        'cũ nhất'
    ];

    $scope.addUserBank = function () {
        $uibModal.open({
            templateUrl: BASE_URL + '/htmlviews/ModalAddUserBank.html',
            controller: "ModalAddUserBank",
            scope: $scope,
            size: '',
        });
    };
    $scope.searchUserBank();
});

App.controller('ModalAddUserBank', function ($rootScope, $scope, $uibModalInstance, $http) {

    $scope.nganhang = [
        'Techcombank',
        'Vietcombank',
        'Tpbank'
    ];
    $scope.loginBank = function (inputParam) {
        if (inputParam.userName !== null && inputParam.userName !== '' && inputParam.userName !== undefined &&
            inputParam.STK !== null && inputParam.STK !== '' && inputParam.STK !== undefined &&
            inputParam.bank !== null && inputParam.bank !== '' && inputParam.bank !== undefined &&
            inputParam.password !== null && inputParam.password !== '' && inputParam.password !== undefined) {
            $http.post("http://localhost:8181/add-user-bank", inputParam)
                .success(function (res) {
                        console.log(res);
                        $scope.state = "Thêm tài khoản thành công!";
                        setTimeout(function () {
                            $scope.cancel()
                        }, 1500);
                        // $rootScope.dataRespone.push(res)
                        location.reload();
                    }
                )
        } else {
            $scope.status = "Bạn chưa nhập đủ thông tin";
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});