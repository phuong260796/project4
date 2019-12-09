App.controller('InforBankController', function ($scope, $http, $stateParams) {
        $scope.searchbank = function () {
            $scope.fromDate = $("#fromDate").val();
            $scope.toDate =$("#toDate").val();
            var data = {
                fromDate:$scope.fromDate,
                toDate:$scope.toDate,
                STK:$scope.userBankkk.STK,
                page:"2"
            };
             // $http.post("http://localhost:8181/laygiaodich",data)
           $http.post("http://localhost:8181/lay-giao-dich-truc-tiep",data)
                .success(function (res) {
                    if (res!==null&&res!==""&&res!==undefined){
                        $scope.dataResponee = res.giaoDichTechcombanks;
                        console.log($scope.dataResponee)
                    }else {
                        $scope.status = "Không tìm thấy giao dịch nào!";
                    }
                });
        };
    $scope.getInfoUserBankkk = function(){
        $http.get("http://localhost:8181/infor-bank2/"+$scope.userBankkk.STK)
            .success(function (res) {
                console.log(res);
                if (res !== null && res !== "" && res !== undefined) {
                    $scope.infoUserrr = res;
                } else {
                    $scope.status = "Không tìm thấy giao dịch nào!"
                }
            })
    };

    $scope.getUserBank= function () {
        $http.get("http://localhost:8181/get-user-bank")
            .success(function (res) {
                $scope.listUserBank = res;
                setTimeout(function () {
                        $('.selectpicker').selectpicker('refresh');
                },1000);
            });
    };
    $scope.getUserBank();
    // $scope.infoUserBank();
});
