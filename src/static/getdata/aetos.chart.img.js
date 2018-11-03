var loadingData, fillData, fillDataST, tr_click;
var strUrl = window.location.href;
var arrUrl = strUrl.split("/");
var strPage = arrUrl[arrUrl.length - 1];
var urlName = strPage.split(".")[0];
var charts = undefined;
var isInline = document.documentElement.clientWidth > 577 ? false : true; //577

(function aetoswsee($) {
    /**
     * Tools: Chart
     */

    //交易专区
    loadingData = function() {
        var boxId = $(".market-trend-tab > li.select").attr("id").split('_')[1];

        switch (boxId) {
            case "fxBox":
                $('.stock').find('span.select').attr('lib', 'ST'); //判断charts.html的图片链接是否加a

                $.getScript(SystemProp.quoteBrowserUrl + "?group=FX&callback=fillData");
                break;
            case "mBox":
                $('.stock').find('span.select').attr('lib', 'IX');
                $.getScript(SystemProp.quoteBrowserUrl + "?group=ML&callback=fillData");
                break;
            case "oBox":
                $('.stock').find('span.select').attr('lib', 'IX');
                $.getScript(SystemProp.quoteBrowserUrl + "?group=OL&callback=fillData");
                break;
            case "iBox":
                $('.stock').find('span').eq(0).attr('lib', 'ST');
                $('.stock').find('span').eq(1).attr('lib', 'IX');
                var _ch = $('.stock').find('span.select').attr('lib');
                if (_ch != 'IX' && _ch != 'ST') {
                    $.getScript(SystemProp.quoteBrowserUrl + "?group=IX&callback=fillData");
                    // $.getScript(SystemProp.quoteBrowserUrl + "?group=ST&callback=fillDataST");
                } else {
                    $.getScript(SystemProp.quoteBrowserUrl + "?group=" + _ch + "&callback=fillData");
                }
                break;
            case "cBox":
                $('.stock').find('span.select').attr('lib', 'IX');
                $.getScript(SystemProp.quoteBrowserUrl + "?group=FM&callback=fillData");
                break;
        }
    };
    //填充数据
    fillData = function(data) {
        if (!data)
            return;
        var boxId = $(".market-trend-tab").find("li.select").eq(0).attr("id").split('_')[1];
        //if loaded,partial update

        var trueDiv = 0;
        if (boxId == 'fxBox' && !!data && data[0].p == 'EURUSD') {
            trueDiv = 1;
        } else if (boxId == 'mBox' && !!data && data[0].p == 'XAUUSD') {
            //console.log(data.length);
            trueDiv = 1;
        } else if (boxId == 'oBox' && !!data && data[0].p == 'USOIL') {
            trueDiv = 1;
        } else if (boxId == 'iBox' && (!!data && data[0].p == 'US30' || !!data && data[0].p == 'AAPL')) {
            trueDiv = 1;
        } else if (boxId == 'cBox' && !!data && data[0].p == 'CORN') {
            trueDiv = 1;
        }
        if ($('.stock').length > 0) {
            var _ch = $('.stock').find('span.select').attr('lib');
            if (_ch == 'IX') {
                if (!(!!data && $("#iBox").find("tr[name=US30]").length > 0)) {
                    $("#iBox").removeClass('dataLoaded');
                }
            } else if (_ch == 'ST') {
                if (!(!!data && $("#iBox").find("tr[name=AAPL]").length > 0)) {
                    $("#iBox").removeClass('dataLoaded');
                }
            }
        }

        if (trueDiv == 1) {
            if ($("#" + boxId).hasClass('dataLoaded')) {

                for (var i = 0; i < data.length; i++) {
                    if (data[i].p != 'PLATINUM') {
                        var obj = data[i];
                        var oldTr = $("#" + boxId).find("tr[name=" + obj.p + "]").eq(0);
                        if (oldTr.length > 0) {
                            oldTr.find("td.fx-n").html('<span class="' + ((obj.o == 1) ? 'green' : 'red') + '">•</span>' + obj.p);
                            oldTr.find("td").eq(1).html(obj.b).removeClass().addClass((obj.u == 'up') ? 'drop' : 'liter');
                            oldTr.find("td").eq(2).html(obj.s).removeClass().addClass((obj.u == 'up') ? 'drop' : 'liter');
                            oldTr.find("td").eq(3).html(obj.h);
                            oldTr.find("td").eq(4).html(obj.l + '<span class="' + obj.u + '"></span>');
                        }
                    }
                }
            } else {
                var tableHtml = '<table class="market-trend-tbody table-body" >';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].p != 'PLATINUM') {
                        var obj = data[i];
                        tableHtml += '<tr name="' + obj.p + '">';
                        tableHtml += '<td width="20%">' + obj.p + '</td>';
                        tableHtml += '<td width="20%" class="' + ((obj.u == 'up') ? 'drop' : 'liter') + '">' + obj.b + '</td>';
                        tableHtml += '<td width="20%" class="' + ((obj.u == 'up') ? 'drop' : 'liter') + '">' + obj.s + '</td>';
                        tableHtml += '<td width="20%">' + obj.h + '</td>';
                        tableHtml += '<td  width="20%" class="low" >' + obj.l + '<span class="' + obj.u + '"></span></td>';
                        tableHtml += '</tr>';
                    }
                    if (i == 0) {
                        var p = data[0].p;
                        if (isInline) {
                            var strTr = '<tr name="image"><td colspan="5" style=" "><img src="' + SystemProp.chartBrowserUrl + '/' + ((p.length < 6 && p !== 'DXY') ? (p) : p) + '1_409x286x2.gif" /></td></tr>';
                            tableHtml += strTr;
                            // $('.chart-img-box > img').attr('src', '' + SystemProp.chartBrowserUrl + '/' + ((p.length < 6 && p !== 'DXY') ? (p) : p) + '1_409x286x2.gif');
                        }
                    }
                }

                tableHtml += '</table>'
                $("#" + boxId).addClass('dataLoaded').html(tableHtml);
                $("#" + boxId).children('table').children('tbody').find('tr').eq(0).css("background", "#dddddb").siblings("tr").css("background", "none");
                $("#" + boxId).children('table').children('tbody').children('tr').click(tr_click);
                // if (rightPic == 1) {
                var lastTr = $("#" + boxId).children('table').children('tbody').children('tr').first();
                lastTr.click();
                // }
            }
        }
        if (charts == undefined && inLine === false) {
            charts = new PerfectScrollbar('.scroll-charts');
        }
    };

    //填充数据, 追加股票数据 
    fillDataST = function(data) {
        if (!data)
            return;
        var boxId = $(".market-trend-tab").find("li.select").eq(0).attr("id").split('_')[1];
        //if loaded,partial update
        if ($("#" + boxId).hasClass('dataLoaded') && $("#" + boxId).hasClass('st')) {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var oldTr = $("#" + boxId).find("tr[name=" + obj.p + "]").eq(0);
                if (oldTr.length > 0) {
                    oldTr.find("td.fx-n").html('<span class="' + ((obj.o == 1) ? 'green' : 'red') + '">•</span>' + obj.p);
                    oldTr.find("td").eq(1).html(obj.b).removeClass().addClass((obj.u == 'up') ? 'drop' : 'liter');
                    oldTr.find("td").eq(2).html(obj.s).removeClass().addClass((obj.u == 'up') ? 'drop' : 'liter');
                    oldTr.find("td").eq(3).html(obj.h);
                    oldTr.find("td").eq(4).html(obj.l + '<span><img src="images/' + ((obj.u == 'up') ? 'up' : 'down') + '-cn.png" /></span>');
                }
            }
        } else {
            var tableHtml = '';

            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                tableHtml += '<tr name="' + obj.p + '" class="tr_st">';
                tableHtml += '<td width="70">' + obj.p + '</td>';
                tableHtml += '<td width="62" class="' + ((obj.u == 'up') ? 'drop' : 'liter') + '">' + obj.s + '</td>';
                tableHtml += '<td width="62" class="' + ((obj.u == 'up') ? 'drop' : 'liter') + '">' + obj.b + '</td>';
                tableHtml += '<td width="62">' + obj.h + '</td>';
                tableHtml += '<td>' + obj.l + '<span><img src="images/' + ((obj.u == 'up') ? 'up' : 'down') + '-cn.png" /></span></td>';
                tableHtml += '</tr>';
            }
            var p = data[data.length - 1].p;

            $("#" + boxId).addClass('st');
            $("#" + boxId).children('table').children('tbody').append(tableHtml);
            $("#" + boxId).children('table').children('tbody').children('tr').click(tr_click);

        }
    };

    //tr_click---   
    tr_click = function(e) {
        e.preventDefault();

        $(this).css("background", "#dddddb").siblings("tr").css("background", "none")
        var isOpen = $(this).data("isOpen") || false;
        var trName = $(this).attr("name");
        var $tr = $(this).parents("table").eq(0).find("tr[name='image']").eq(0);
        // alert($tr.length)
        if (trName == 'image') {
            $(this).css("background", "none");
            return;
        }

        var _ch = $('.stock').find('span.select').attr('lib');
        if (_ch == 'ST' || $(this).hasClass('tr_st')) {
            trName = trName;
        } else if (trName.length < 6 && trName !== 'DXY') {
            // trName = trName + 'A'; 
            trName = trName; //hx 2016/4/21
        }
        //检测是否存在.chart-img-box
        var rightPic = $(document).find('.chart-img-box > img').size();
        var $img = $tr.find("img");
        var newSrc = $(this).data("img_src") || '';
        var time = $(this).data("time") || '';
        if (isInline) {
            if (!isOpen) {
                $(this).data("isOpen", true);
                if (time) {
                    var nowTime = new Date().getTime();
                    if ((nowTime - time * 1) > 60000) {
                        newSrc = SystemProp.chartBrowserUrl + '/' + trName + '1_409x286x2.gif?radom=' + (new Date().getTime());
                    }
                } else {
                    newSrc = SystemProp.chartBrowserUrl + '/' + trName + '1_409x286x2.gif?radom=' + (new Date().getTime());
                    $(this).data('time', new Date().getTime());
                    $(this).data('img_src', newSrc);
                }
                $img.attr("src", newSrc);
                // $('.bord-all-chart > img').attr('src', newSrc);
                $(this).after($tr);
                $tr.show();
            } else {
                $(this).data("isOpen", false);
                //$tr.hide();
            }
        } else {

            if (time) {
                var nowTime = new Date().getTime();
                if ((nowTime - time * 1) > 60000) {
                    newSrc = SystemProp.chartBrowserUrl + '/' + trName + '1_409x286x2.gif?radom=' + (new Date().getTime());

                }
            } else {
                newSrc = SystemProp.chartBrowserUrl + '/' + trName + '1_409x286x2.gif?radom=' + (new Date().getTime());
                $(this).data('time', new Date().getTime());
                $(this).data('img_src', newSrc);
            }
            $('.chart-img-box > img').attr('src', newSrc);
        }

    };

    $(function() {
        $("#fxBox").after('<div class="market-trend-box" id="mBox" style="display:none;"></div>' +
            '<div class="market-trend-box" id="oBox" style="display:none;">' + '</div><div class="market-trend-box" id="iBox" style="display:none;"></div>'
        );
        console.log(99)
            //交易专区menu
        var pageWidth = Math.max($(window).width(), window.innerWidth);
        // console.log(pageWidth)
        $('.bord-all-chart .chart-img-box').append('<img>');
        $(".market-trend-tab > li").bind('click', function() {
            var boxId = $(this).attr("id").split("_")[1];
            if (boxId == 'iBox') {
                $('.stock').show();
            } else {
                $('.stock').hide();
            }

            $(".market-trend-tab > li").removeClass("select");
            $(this).addClass("select");
            $(".market-trend-box").hide();
            loadingData();
            $("#" + boxId).show();
            $("#" + boxId).children('table').children('tbody').find('tr').each(function() {
                if ($(this).css("background-color") == 'rgb(221, 221, 219)') {
                    $(this).click()
                }

            });
        });

        $('.stock > span').on('click', function() {
            $('.stock').children('span').removeClass('select');
            $(this).addClass('select');
            $('#iBox').removeClass('dataLoaded').html();
            $('#t_iBox').click();
        });

        //select tab
        switch (urlName) {
            case 'forex':
                //  console.log('forex');
                $('.market-trend-tab > li').removeClass('class');
                $('#t_fxBox').addClass('select');
                $(".market-trend-tab").find("li.select").click();
                break;
            case 'metals':
                // console.log('metals');
                $('.market-trend-tab > li').removeClass('class');
                $('#t_mBox').addClass('select');
                $(".market-trend-tab").find("li.select").click();
                break;
            case 'energy':
                // console.log('energy');
                $('.market-trend-tab > li').removeClass('class');
                $('#t_oBox').addClass('select').click();
                break;
            case 'indices':
                // console.log('indices');
                $('.market-trend-tab > li').removeClass('class');
                $('#t_iBox').addClass('select').click();
                break;
        }

        loadingData();
        setInterval(function() {
            $(".market-trend-tab").find("li.select").click(
                //function(e) {
                //   e ? e.stopPropagation() : event.cancelBubble = true;
                // }
            );
        }, 5000);
    })
})(jQuery);