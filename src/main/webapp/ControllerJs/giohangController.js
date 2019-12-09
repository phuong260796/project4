App.controller('giohangController', function ($scope, $http) {

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2)
            return parts.pop().split(";").shift();
    }



    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    $scope.data = function () {
        setCookie("taobao","t=36326caf96134c580843ee85f4b31097; _tb_token_=371bee7370d57; thw=ca; lgc=chipooo; tracknick=chipooo; tg=5; swfstore=491; x=e%3D1%26p%3D*%26s%3D0%26c%3D0%26f%3D0%26g%3D0%26t%3D0%26__ll%3D-1%26_ato%3D0; v=0; dnk=chipooo; csg=145d0b58; existShop=MTU3MDYxMjk3MQ%3D%3D; _cc_=URm48syIZQ%3D%3D; whl=-1%260%260%261570624134441; mt=ci=-1_0; cna=hZUlFtw8QUkCAfTvsQ4acMjR; linezing_session=lx2O2K53ZenZTDcUaVaFfSaa_1570678661005RS3P_1; _m_h5_tk=a79f75cd3e0eea9eb647deb617ae2456_1571076495539; _m_h5_tk_enc=cb1af290e8bb37c0700907c8cf07429f; uc1=cookie16=VT5L2FSpNgq6fDudInPRgavC%2BQ%3D%3D&cookie21=V32FPkk%2FhSt6CA8j&cookie15=V32FPkk%2Fw0dUvg%3D%3D&existShop=false&pas=0&cookie14=UoTbnKMGRCuegA%3D%3D&tag=8&lng=zh_CN; l=dBaXz_jgqp4_pnvkBOCw5uI8ad7OSIRYmuPRwNAvi_5IX_LsDEQOkg3s9Ep6VAWf9DTB45113tv9-etkVO92_5D8sxAJwxDc.; isg=BBsbJxv3wgaEtT7EBEvDyAwXqn9FWC-DHcRyJg1Y95ox7DvOlcC_QjlsghRHSIfq"
        ,1);
        var result = document.cookie;
        var obj = [];
        for (let i = 0; i <100 ; i++) {
           var a = getCookie("gioHangChipo"+i);
            if (a!==null&&a!==""&&a!==undefined){
                obj.push(JSON.parse(a));
            }
        }
        $scope.dataa = obj;
        console.log($scope.dataa);
        var price = 0;
        for (var i = 0 ;i< obj.length;i++){
            price = price+ obj[i].priceVnOfCount;
        }
        $scope.totalPrice = (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    $scope.deleteCookies = function(resp){
        console.log(resp.cookieName);
        alert("Ban có muốn xóa sản phẩm này khỏi giỏ hàng không");
        delete_cookie(resp.cookieName);
        $(".id-" + resp.cookieName).addClass("hidden");
        var obj = [];
        for (let i = 0; i <100 ; i++) {
            var a = getCookie("gioHangChipo"+i);
            if (a!==null&&a!==""&&a!==undefined){
                obj.push(JSON.parse(a));
            }
        }
        $scope.dataa = obj;
        var price = 0;
        for (var i = 0 ;i< obj.length;i++){
            price = price+ obj[i].priceVnOfCount;
        }
        $scope.totalPrice = (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        console.log($scope.totalPrice)

    };

    function delete_cookie( name ) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    $scope.updateAmount = function(resp){
        delete_cookie(resp.cookieName);
        var dataAdd = {
            name:resp.name,
            check: resp.check,
            count: resp.count,
            priceChina: resp.priceChina,
            priceChinaOfCount: resp.priceChina*resp.count,
            priceVn: resp.priceVn,
            priceVnOfCount: resp.priceVn*resp.count,
            bigImageUrl:resp.bigImageUrl,
            cookieName:resp.cookieName
        };

        setCookie(resp.cookieName, JSON.stringify(dataAdd), 1);
        var obj = [];
        for (let i = 0; i <100 ; i++) {
            var a = getCookie("gioHangChipo"+i);
            if (a!==null&&a!==""&&a!==undefined){
                obj.push(JSON.parse(a));
            }
        }
        $scope.dataa = obj;
        var price = 0;
        for (var i = 0 ;i< obj.length;i++){
            price = price+ obj[i].priceVnOfCount;
        }
        var ab = price;
        console.log(ab);
        $scope.totalPrice = (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

   $scope.formatPrice =  function formatPrice(price) {
        return (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    $scope.data();
});
