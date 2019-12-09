App.controller('LogController', function ($scope, $http) {
    var textSearch = "";
    $scope.pagaIndex = 0;
    setTimeout(function () {
        $(".pagination .changePage").click(function () {
            $(".pagination .changePage").removeClass("active");
            $(this).addClass("active");
            $scope.pagaIndex = $(this).html() - 1;
            console.log($scope.pagaIndex);
        });
        $(".down").click(function () {
            if ($scope.pagaIndex > 1) {
                $scope.pagaIndex--;
            }
            console.log($scope.pagaIndex);
        });
        $(".up").click(function () {
            $scope.pagaIndex++;
            console.log($scope.pagaIndex);
        });

    }, 500);

    $scope.search = function () {
        var data = {
            // page: $scope.pagaIndex,
            textSearch: $scope.textSearch
            // size: 15
        };
        $http.post(BASE_URL + '/log', data)
            .success(function (resp) {
             /*   $scope.page = [];
                if (resp[0].totalRecord / data.size > 5) {
                    $(".pagination .nextPage").removeClass("hidden");
                    for (var i in resp) {
                        $scope.page.push(resp[i].id);
                        if (i == 4) {
                            break;
                        }
                    }
                } else {
                    for (var j in resp) {
                        $scope.page.push(resp[j].id);
                        var temp = Math.ceil(resp[0].totalRecord / data.size);
                        if (j ==temp-1) {
                            break
                        }
                    }
                }*/
                $scope.dataLog = resp;
            })
    };
    $scope.search();
});

