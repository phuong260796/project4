App.controller('ProductInfoController', function ($scope, $rootScope, $http) {
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    $scope.searchInfoProduct = function (textSearch) {
        if (textSearch !== null && textSearch !== '' && textSearch !== undefined) {
            var uri = encodeURIComponent(textSearch);
            if (textSearch.indexOf("taobao.com" >= 0)) {
                $http.get("http://localhost:8181/crawl/taobao?url=" + uri)
                    .success(function (resp) {
                        if (resp !== null) {
                            setTimeout(function () {
                            }, 300);
                            console.log(resp);
                            $scope.dataTaobao = resp;
                            setTimeout(function () {
                                // selectProperties();
                                $(".propertiesDTOS").click(function () {
                                    var titleCheck = $(this).attr("titleProperties");
                                    if ($(this).hasClass("checked")) {
                                        $(this).removeClass("checked");
                                    } else {
                                        $("[titleProperties=" + titleCheck + "]").removeClass("checked");
                                        $(this).addClass("checked");
                                    }
                                    var textCheckId = "";
                                    var titleee = "";
                                    setTimeout(function () {
                                        $(".checked").each(function () {
                                            textCheckId += $(this).attr("idProperties") + ";";
                                            titleee += $(this).attr("titlee") + "-"
                                        });
                                        textCheckId = textCheckId.substring(0, textCheckId.length - 1);
                                        titleee = "Đã chọn:" + titleee.substring(0, titleee.length - 1);
                                        $(".choose").text(titleee);
                                        for (id of resp.priceOfProperties) {
                                            if (id.id === textCheckId) {
                                                $(".priceProduct").addClass("hidden");
                                                $(".priceSelected").removeClass("hidden");
                                                $(".priceSelected span").text(id.priceText + "~" + (id.priceText * 3400).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "đ");
                                                $(".quantity").addClass("hidden");
                                                $(".quaityOnly").removeClass("hidden");
                                                $(".quaityOnly span").text(id.quantity);
                                                break;
                                            } else {
                                                $(".quantity").removeClass("hidden");
                                                $(".quaityOnly").addClass("hidden");

                                                $(".priceProduct").removeClass("hidden");
                                                $(".priceSelected").addClass("hidden");
                                            }
                                        }
                                    }, 500)
                                });
                            }, 500);
                        } else {
                            alert('link sản phẩm sai!');
                        }
                    })
                    .error(function () {
                        alert('link sản phẩm sai!');
                    });
            }

            if (textSearch.indexOf("taobao.com") >= 0) {
                $http.get("http://localhost:8181/crawl/1688?url=" + uri)
                    .success(function (resp) {
                        if (resp !== null) {
                            console.log(resp)
                        } else {
                            alert('link sản phẩm sai!');
                        }
                    })
                    .error(function () {
                        alert('link sản phẩm sai!');
                    });
            }
        } else {
            $scope.status = "Bạn chưa nhập đủ thông tin";
        }
    };
    $scope.imagee = function (dt) {
        // console.log(dt);
        if (dt.indexOf("50x50") >= 0) {
            $scope.data.bigImageUrl = dt.replace("50x50", "400x400");
        }
        if (dt.indexOf("60x60") >= 0) {
            $scope.data.bigImageUrl = dt.replace("60x60", "400x400");
        }
        if (dt.indexOf("64x64") >= 0) {
            $scope.data.bigImageUrl = dt.replace("64x64", "400x400");
        }
        if (dt.indexOf("32x32") >= 0) {
            $scope.data.bigImageUrl = dt.replace("32x32", "400x400");
        }
        if (dt.indexOf("30x30") >= 0) {
            $scope.data.bigImageUrl = dt.replace("30x30", "400x400");
        }
    };

    $scope.clickImage = function (dttb) {
        // console.log(dt);
        if (dttb.indexOf("50x50") >= 0) {
            $scope.dataTaobao.bigImageUrl = dttb.replace("50x50", "400x400");
        }
        if (dttb.indexOf("60x60") >= 0) {
            $scope.dataTaobao.bigImageUrl = dttb.replace("60x60", "400x400");
        }
        if (dttb.indexOf("64x64") >= 0) {
            $scope.dataTaobao.bigImageUrl = dttb.replace("64x64", "400x400");
        }
        if (dttb.indexOf("32x32") >= 0) {
            $scope.dataTaobao.bigImageUrl = dttb.replace("32x32", "400x400");
        }
        if (dttb.indexOf("30x30") >= 0) {
            $scope.dataTaobao.bigImageUrl = dttb.replace("30x30", "400x400");
        }
    };
    $scope.crawl = function () {
        $http.get("http://localhost:8181/crawl/data-price")
            .success(function (resp) {
            })
            .error(function () {
                alert('link sản phẩm sai!');
            });
    };

    $scope.test = function () {
        $http.get("http://localhost:8181/crawl/testTaobao")
            .success(function (resp) {
                setTimeout(function () {
                }, 300);
                $scope.dataTaobao = resp;
                setTimeout(function () {
                    // selectProperties();
                    $(".propertiesDTOS").click(function () {
                        var titleCheck = $(this).attr("titleProperties");
                        if ($(this).hasClass("checked")) {
                            $(this).removeClass("checked");
                        } else {
                            $("[titleProperties=" + titleCheck + "]").removeClass("checked");
                            $(this).addClass("checked");
                        }
                        var textCheckId = "";
                        var titleee = "";
                        setTimeout(function () {
                            $(".checked").each(function () {
                                textCheckId += $(this).attr("idProperties") + ";";
                                titleee += $(this).attr("titlee") + "-"
                            });
                            textCheckId = textCheckId.substring(0, textCheckId.length - 1);
                            titleee = "Đã chọn:" + titleee.substring(0, titleee.length - 1);
                            $(".choose").text(titleee);
                            for (id of resp.priceOfProperties) {
                                if (id.id === textCheckId) {
                                    $(".priceProduct").addClass("hidden");
                                    $(".priceSelected").removeClass("hidden");
                                    $(".priceSelected span").text(id.priceText + "~" + (id.priceText * 3400).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+ "đ");
                                    $(".quantity").addClass("hidden");
                                    $(".quaityOnly").removeClass("hidden");
                                    $(".quaityOnly span").text(id.quantity);
                                    break;
                                } else {
                                    $(".quantity").removeClass("hidden");
                                    $(".quaityOnly").addClass("hidden");

                                    $(".priceProduct").removeClass("hidden");
                                    $(".priceSelected").addClass("hidden");
                                }
                            }
                        }, 500)
                    });
                }, 500);
            })
            .error(function () {
                alert('link sản phẩm sai!');
            });
    };

    function selectProperties() {
        $(".propertiesDTOS").click(function () {
            var titleCheck = $(this).attr("titleProperties");
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
            } else {
                $("[titleProperties=" + titleCheck + "]").removeClass("checked");
                $(this).addClass("checked");
            }
            var textCheckId = "";
            setTimeout(function () {
                $(".checked").each(function () {
                    textCheckId += $(this).attr("idProperties") + ";";
                });
                textCheckId = textCheckId.substring(0, textCheckId.length - 1);
                for (let i = 0; i < resp; i++) {
                }
            }, 500)
        });
    }

    $scope.formatPrice =  function formatPrice(price) {
        return (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    $scope.formatNumber = function (i) {
        return Math.round(i * 100) / 100;
    };
    $scope.Amount = 1;

    $scope.upAmount = function () {
        $scope.Amount++;
    };

    $scope.downAmount = function () {
        if ($scope.Amount > 1) {
            $scope.Amount--;
        }
    };

    $rootScope.cookiesId = 1;

    $scope.addcart = function () {
        $scope.dataaa = $scope.dataTaobao;
        var textCheckIdd = "";
        var titleeed = "";
        setTimeout(function () {
            $(".checked").each(function () {
                textCheckIdd += $(this).attr("idProperties") + ";";
                titleeed += $(this).attr("titlee") + "-"
            });
            textCheckIdd = textCheckIdd.substring(0, textCheckIdd.length - 1);
            titleeed = titleeed.substring(0, titleeed.length - 1);
            $(".choose").text(titleeed);
            // for (id of $scope.dataaa.priceOfProperties) {
            for (var i=0;i<$scope.dataaa.priceOfProperties.length;i++) {
                console.log($scope.dataaa.priceOfProperties[i]);
                console.log(textCheckIdd);
                // if (id.id === textCheckIdd) {
                if ($scope.dataaa.priceOfProperties[i].id === textCheckIdd) {
                    var taobaoo = {
                        name: $scope.dataaa.name,
                        check: titleeed,
                        count: $scope.Amount,
                        priceChina: id.priceText,
                        priceChinaOfCount: id.priceText * $scope.Amount,
                        priceVn: id.priceText * 3400,
                        priceVnOfCount: id.priceText * 3400 * $scope.Amount,
                        bigImageUrl: $scope.dataaa.bigImageUrl.replace("400x400", "50x50")
                    };
                    var  idCookie = 1;
                    idCookie =  getCookie("id");
                    if (idCookie===null||idCookie===""||idCookie==="undefined"||idCookie===undefined){
                        var dataAddcookie = {
                            name:taobaoo.name,
                            check: taobaoo.check,
                            count: taobaoo.count,
                            priceChina: taobaoo.priceChina,
                            priceChinaOfCount: taobaoo.priceChinaOfCount,
                            priceVn: taobaoo.priceVn,
                            priceVnOfCount: taobaoo.priceVnOfCount,
                            bigImageUrl:taobaoo.bigImageUrl,
                            cookieName:"gioHangChipo1"
                        };
                        setCookie("gioHangChipo1", JSON.stringify(dataAddcookie), 1);
                        setCookie("id", 2, 1);
                        alert("Thêm vào giỏ hàng thành công");
                        $rootScope.cookiesId++;
                        return;
                    }else {
                        var dataAddcookiee = {
                            name:taobaoo.name,
                            check: taobaoo.check,
                            count: taobaoo.count,
                            priceChina: taobaoo.priceChina,
                            priceChinaOfCount: taobaoo.priceChinaOfCount,
                            priceVn: taobaoo.priceVn,
                            priceVnOfCount: taobaoo.priceVnOfCount,
                            bigImageUrl:taobaoo.bigImageUrl,
                            cookieName:"gioHangChipo"+idCookie
                        };
                        setCookie("gioHangChipo"+idCookie, JSON.stringify(dataAddcookiee), 1);
                        setCookie("id", parseInt(idCookie)+1, 1);
                        alert("Thêm vào giỏ hàng thành công");
                        $rootScope.cookiesId++;
                        return;
                    }
                }
            }
            alert("Vui lòng chọn đầy đủ thuộc tính của sản phẩm")
        }, 500)
    };

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2)
            return parts.pop().split(";").shift();
    }

    $scope.readFile = function () {
        $http.get("http://localhost:8181/read-folder" )
            .success(function (resp) {
                console.log(resp)
            })

    };

    $scope.getdatatech = function () {
        $http.get("http://localhost:8181/save-data-bank")
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.autoReload = function () {
        $http.get("http://localhost:8181/autoReload")
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.loginnn = function () {
        let param = {
            userName: "0342201133",
            password: "pHUON2"
        };
        $http.post("http://localhost:8181/login-bank",param)
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.schedule = function () {
        $http.get("http://localhost:8181/schedule")
            .success(function (resp) {
                console.log(resp)
            })
    };
    $scope.schedule2 = function () {
        $http.get("http://localhost:8181/schedule2")
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.laygiaodich = function () {
        let paramm = {
            fromDate: "2019-09-10",
            toDate: "2019-10-10"
        };
        $http.post("http://localhost:8181/laygiaodich",paramm)
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.luugiaodich = function () {
        $http.get("http://localhost:8181/luuGiaoDich")
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.luugiaodich2 = function () {
        $http.get("http://localhost:8181/luuGiaoDich2")
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.test1 = function () {
        $http.get("http://localhost:8181/data-index")
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.infor1 = function () {
        $http.get("http://localhost:8181/infor1")
            .success(function (resp) {
                console.log(resp)
            })
    };

    $scope.infor2 = function () {
        $http.get("http://localhost:8181/luuGiaoDich3")
            .success(function (resp) {
                console.log(resp)
            })
    };

});
