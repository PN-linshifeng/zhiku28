/**
 * Tools: Economic Calendar
 */
var indexHour;
var indexMinute;
var timer;
var maxtime;
var lang = 0;
var GMTTime;
var GMTH;
var GMTM;

var exDateTime, countdown, exDateTime2, callbackEcon;

//获取当前日期的事件
function getEvent(strDate) {
    var date = strDate.replace(/-/g, ''),
        // url = SystemProp.appServerUrl+"/content/get-fx-daily!callback.json?ln=0&onDate="+date+"time="+(+new Date());
        url = "https://content.aetoscg.asia/api/getEcoDataList.php?onDate=" + date;

    $.getScript(url + '&callback=callbackEcon');

}
//初始化日期
function showDate(dateStr) {
    var checkDate = str2Date(dateStr);

    var day = checkDate.getDay();
    var $week = $("#weekDay");
    $week.find("a.hover").removeClass("hover");
    $week.find("li.hover").removeClass("hover");
    for (var i = 0; i < 7; i++) {
        var date = str2Date(dateStr);
        if (i != day) {
            date.setDate(checkDate.getDate() * 1 + (i - day));
            $week.find("a").eq(i).attr("name", date2Str(date)).find("b").html(date.getDate());
        } else {
            $week.find("a").eq(day).attr("name", date2Str(checkDate)).addClass("hover").find("b").html(checkDate.getDate());
            $week.find("a").eq(day).parent('li').addClass('hover');
        }
    }
}

function ajaxGetServerTime() {
    var getDateTimeUrl2 = "https://trust.aetoscg.asia/content/get-fx-daily!callbackDateTime.json?callback=exDateTime&ln=0";
    // $.getScript(getDateTimeUrl2);
}

function GetRTime() {
    if (GMTM >= 59) {
        GMTM = 0;
        GMTH++;
        GMTH = charLeftAll(GMTH);
        GMTM = charLeftAll(GMTM);
        $('#t_h').html(GMTH);
        $('#t_m').html(GMTM);
    } else {
        GMTM++;
        GMTM = charLeftAll(GMTM);
        $('#t_m').html(GMTM);
    };
    if (GMTH > 23) {
        ajaxGetServerTime();
    };
}

exDateTime = function(rs) {
    if (rs.code == 200 && !!rs.data) {
        showDate(rs.data.date1);
        getEvent(rs.data.date2);
        exDateTime2(rs);
    }

    ajaxGetServerTime();

    // setInterval(function() {
    // 	GetRTime();
    // }, 60000);
};

exDateTime2 = function(rs) {
    if (rs.code == 200 && !!rs.data) {
        //初始化时钟
        GMTTime = rs.data.date1 + " " + rs.data.time;
        GMTTime = GMTTime.replace(/-/g, "/");
        var GDate = new Date(GMTTime);
        GMTH = GDate.getHours();
        GMTM = GDate.getMinutes();
        GMTH = charLeftAll(GMTH);
        GMTM = charLeftAll(GMTM);
        $('#GMTTimer').html('<span id="t_h"></span>:<span id="t_m"></span>');
        $('#t_h').html(GMTH);
        $('#t_m').html(GMTM);
        $('#GMTDater').html(rs.data.date1);

        var weekNum = rs.data.week;
        var weekStr = "";
        // var lang = Drupal.settings.aetoswsee.lang;
        switch (lang) {
            case 0:
            case "zh-tw":
                if (weekNum == 1) {
                    weekStr = "星期日";
                } else if (weekNum == 2) {
                    weekStr = "星期一";
                } else if (weekNum == 3) {
                    weekStr = "星期二";
                } else if (weekNum == 4) {
                    weekStr = "星期三";
                } else if (weekNum == 5) {
                    weekStr = "星期四";
                } else if (weekNum == 6) {
                    weekStr = "星期五";
                } else if (weekNum == 7) {
                    weekStr = "星期六";
                }
                break;
            case 1:
                if (weekNum == 1) {
                    weekStr = "Sunday";
                } else if (weekNum == 2) {
                    weekStr = "Monday";
                } else if (weekNum == 3) {
                    weekStr = "Tuesday";
                } else if (weekNum == 4) {
                    weekStr = "Wednesday";
                } else if (weekNum == 5) {
                    weekStr = "Thursday";
                } else if (weekNum == 6) {
                    weekStr = "Friday";
                } else if (weekNum == 7) {
                    weekStr = "Saturday";
                }
                break;
        }

        $('#GMTWeek').html(weekStr);
    }
}

function countDownInterval() {

    if (maxtime >= 0) {
        maxtime--;
        hours = Math.floor(maxtime / 60);
        minutes = Math.floor(maxtime % 60);
        hours = charLeftAll(hours);
        minutes = charLeftAll(minutes);
        hours = hours.toString();
        minutes = minutes.toString();
        if (!(maxtime < 0)) {
            var hours1 = hours.substr(0, 1),
                hours2 = hours.substr(1, 2),
                minute1 = minutes.substr(0, 1),
                minute2 = minutes.substr(1, 2);

            $('.hours1').html(hours1);
            $('.hours2').html(hours2);
            $('.minute1').html(minute1);
            $('.minute2').html(minute2);
        }
    } else {
        clearInterval(timer);
    }
}

//callback 倒计时
countdown = function(rs) {

    if (rs.code == 200 && !!rs.data.hourSpan && !!rs.data.minSpan) {
        //$("#countdown").text(rs.data.hourSpan+":"+rs.data.minSpan);

        var hours1 = rs.data.hourSpan.substr(0, 1),
            hours2 = rs.data.hourSpan.substr(1, 2),
            minute1 = rs.data.minSpan.substr(0, 1),
            minute2 = rs.data.minSpan.substr(1, 2);

        $('.hours1').html(hours1);
        $('.hours2').html(hours2);
        $('.minute1').html(minute1);
        $('.minute2').html(minute2);
        $(".event-time").html(rs.data.hourSpan + ":" + rs.data.minSpan)
        maxtime = parseInt(rs.data.hourSpan, 10) * 60 + parseInt(rs.data.minSpan);
        // timer = setInterval("countDownInterval()", 60000);
    }
};

//callback function 
callbackEcon = function(rs) {

    if (rs.msg == 'ok') {
        var eventBody = $("#all_events");
        eventBody.empty();
        var data = rs.data;
        for (var i = 0; i < data.length; i++) {
            var event = data[i];
            // var lang = Drupal.settings.aetoswsee.lang;
            var valEnEvent = "";
            switch (lang) {
                case 0:
                    if (event.cn_event.length > 35) {
                        valEnEvent = event.cn_event.substr(0, 35) + '...';
                    } else {
                        valEnEvent = event.cn_event;
                    }
                    break;
                case "zh-tw":
                    if (event.tw_event.length > 35) {
                        valEnEvent = event.tw_event.substr(0, 35) + '...';
                    } else {
                        valEnEvent = event.tw_event;
                    }
                    break;
                case 1:
                    if (event.en_event.length > 65) {
                        valEnEvent = event.en_event.substr(0, 65) + '...';
                    } else {
                        valEnEvent = event.en_event;
                    }
                    break;
            }
            var importance = "";
            if (lang === 0) {
                importance = event.importance == 'H' ? '高' : event.importance == 'M' ? '中' : '低'
            } else {
                importance = event.importance == 'H' ? 'High' : event.importance == 'M' ? 'Middle' : 'Low'
            }
            var strTr = '<tr ' + ((i == 0) ? 'class="quick"' : '') + '><td width="60">' + event.pub_time + '</td><td width="60">' + event.region_code + '</td><td>' + valEnEvent + '</td><td width="70">' +
                '<span class="' + event.importance + '" >' + importance + '</span></td><td width="70">' + event.prior +
                '</td><td width="70">' + event.forecast + '</td><td width="70">' + event.actual + '</td></tr>';

            $('.economic').find('.replaceImg').remove();
            eventBody.append(strTr);
        }

    } else if (rs.msg == 'Empty') {
        if ($('.economic').find('.replaceImg').length > 0) {
            $('.economic').find('.replaceImg').html('Not more data.');
            $('.economic').find('.replaceImg').removeClass('replaceImg');
        } else {
            var eventBody = $("#all_events");
            eventBody.empty();
            eventBody.append("<tr align='center'><td align='center'  colspan='7'>Not more data</td><tr>");
        }
    }
}

function date2Str(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}

function str2Date(string) {
    //string yyyy-mm-dd
    var date = new Date();
    var array = string.split("-");
    date.setFullYear(array[0] * 1, array[1] * 1 - 1, array[2] * 1);

    return date;
}

function charLeftAll(n) {
    if (n < 10) {
        return "0" + n;
    } else {
        return n;
    }
}
$(function() {

    var dayNamesMin = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (lang == "0") {
        dayNamesMin = ["日", "一", "二", "三", "四", "五", "六"];
        monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
    //日历控件
    $("#datePicker").datepicker({
        dateFormat: "yy-mm-dd",
        dayNamesMin: dayNamesMin,
        monthNames: monthNames,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function(dateStr) {
            if (!!dateStr) {
                getEvent(dateStr);
            }
            showDate(dateStr);
        }
    });


    //周选择器
    $("#weekDay").find("a").click(function(e) {
        var date = $(this).attr("name");
        if (!!date) {
            getEvent(date);
        }
        $("#weekDay").find("li.hover").removeClass("hover");
        $(this).parent('li').addClass("hover");
        $("#datePicker").datepicker("setDate", date);
    });

    //showIndexEcoList(9, Drupal.settings.aetoswsee.lang);

    var getDateTimeUrl = "https://trust.aetoscg.asia/content/get-fx-daily!callbackDateTime.json?callback=exDateTime&ln=0";
    $.getScript(getDateTimeUrl);

    var countdownUrl = "https://trust.aetoscg.asia/content/get-fx-daily!callbackCountdown.json?callback=countdown&ln=0&time=" + (new Date()).getTime();
    $.getScript(countdownUrl);

})