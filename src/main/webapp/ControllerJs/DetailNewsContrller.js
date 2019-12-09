App.controller('DetailNewsContrller', function ($rootScope, $scope, $http, $state, $uibModal, $stateParams) {
    $scope.DetailNews = function () {
        $http.get(BASE_URL + '/new/detail-news/' + $stateParams.id)
            .success(function (resp) {
                $scope.dataDetailNews = resp;
                console.log($scope.dataDetailNews.content)
            })
    };
    $scope.DetailNews();
});


