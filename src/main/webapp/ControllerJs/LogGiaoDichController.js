App.controller('LogGiaoDichController', function ($scope, $http) {
    $scope.getUserBank = function () {
        $http.get("http://localhost:8181/get-user-bank")
            .success(function (res) {
                $scope.listUserBank = res;
                // setTimeout(function () {
                //     $('.selectpicker').selectpicker('refresh');
                // },1000);
            });
    };
    $scope.getInfoUserBank = function () {
        $http.get("http://localhost:8181/infor-bank2/" + $scope.userBankkk.STK)
            .success(function (res) {
                if (res !== null && res !== "" && res !== undefined) {
                    $scope.infoUser = res;
                } else {
                    $scope.status = "Không tìm thấy giao dịch nào!"
                }
            })
    };

    $scope.layLogGiaoDich = function () {
        $scope.fromDate = $("#fromDate").val();
        $scope.toDate = $("#toDate").val();
        var data = {
            fromDate: $scope.fromDate,
            toDate: $scope.toDate,
            STK: $scope.userBankkk.STK,
            page: "2"
        };
        $http.post("http://localhost:8181/lay-giao-dich-database", data)
            .success(function (res) {
                if (res !== null && res !== "" && res !== undefined) {
                    $scope.dataResponeee = res.giaoDichTechcombanks;
                } else {
                    $scope.status = "Không tìm thấy giao dịch nào!";
                }
            });
    };


    $scope.getUserBank();
});
