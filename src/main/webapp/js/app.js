var App = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngSanitize']);

App.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home/');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/htmlviews/CategoryNews.html',
            controller: 'IndexController'
        })
        .state('news', {
            url: '/news/{id}',
            templateUrl: '/htmlviews/News.html',
            controller: 'NewsContrller'
        })
        .state('log', {
            url: '/log/{textsearch}',
            templateUrl: '/htmlviews/Log.html',
            controller: 'LogController'
        })
        .state('NewsAll', {
            url: '/NewsAll',
            templateUrl: '/htmlviews/NewsAll.html',
            controller: 'NewsAllContrller'
        })
        .state('DetailNews', {
            url: '/DetailNews/{id}',
            templateUrl: '/htmlviews/DetailNews.html',
            controller: 'DetailNewsContrller'
        })
        .state('ProductInfo', {
            url: '/ProductInfo',
            templateUrl: '/htmlviews/ProductInfo.html',
            controller: 'ProductInfoController'
        })
        .state('giohang', {
            url: '/giohang',
            templateUrl: '/htmlviews/giohang.html',
            controller: 'giohangController'
        })
        .state('LoginBank', {
            url: '/LoginBank',
            templateUrl: '/htmlviews/LoginBank.html',
            controller: 'LoginBankController'
        })
        .state('InforBank', {
            url: '/InforBank/{id}',
            templateUrl: '/htmlviews/InforBank.html',
            controller: 'InforBankController'
        })
        .state('InforBankk', {
            url: '/InforBankk',
            templateUrl: '/htmlviews/InforBank.html',
            controller: 'InforBankController'
        })
        .state('adminBank', {
            url: '/adminBank',
            templateUrl: '/htmlviews/adminBank.html',
            controller: 'adminBankController'
        })
        .state('LogGiaoDich', {
        url: '/LogGiaoDich',
        templateUrl: '/htmlviews/LogGiaoDich.html',
        controller: 'LogGiaoDichController'
    });
});
