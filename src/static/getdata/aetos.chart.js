/**
 * silva.lim
 * 2014-03-26
 * QQ: 1520002068
 *
 * Tools: Chart
 */
var filterPro = [
	"PLATINUM",
	"CORN",
	"SOYBEANS",
	"SOYBEANOIL",
	"WHEAT",
	"LIVECATTLE",
	"COFFEE",
	"SUGAR",
	"COTTON",
	"COCOA",
	"AAPL",
	"ADBE",
	"AMZN",
	"AXP",
	"BABA",
	"BAC",
	"BBRY",
	"C",
	"CSCO",
	"EBAY",
	"FB",
	"GOOG",
	"HPQ",
	"INTC",
	"JPM",
	"MA",
	"MSFT",
	"MT",
	"ORCL",
	"SLB",
	"XOM",
	"YHOO"
]

function datafilter(obj) {
	if (filterPro.indexOf(obj.p) >= 0) {
		return false;
	} else {
		return true;
	}
}
//刷新跑马灯数据
var chartsURL = 'https://quote.aetoscg.asia/quote';
var chartsImg = 'https://static.aetoscg.asia/MT4/';

function quotation(data) {
	var data = data.filter(datafilter);
	var dataBox = $("#hot-news-box"),
		_ul = '<ul class="hot-news">',
		_dSize = 42; //data.length;
	if (dataBox.hasClass('dataLoaded')) { //加载更新
		if (!$.isArray(data)) return;
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			var li = dataBox.find("li[symbol='" + obj.p + "']");
			li.find("span.liter").removeClass('up').removeClass('down').addClass(obj.u);
			li.find("span.liter").html(obj.b);
			li.find('img.p-up-down').attr('src', 'base/images/' + obj.u + '-cn.png');
			li.find("p.high span").html(obj.h);
			li.find("p.low span").html(obj.l);
		}
	} else { //首次加载
		var _tmp = '';
		for (var i = 0; i < _dSize; i++) {
			var obj = data[i];
			var _li = '<li symbol="' + obj.p + '"><a href="#" title="' + obj.p + '">' +
				'<span class="pro">' + obj.p + '</span>' +
				'<span class="liter ' + obj.u + '">' + obj.b + '</span><span><img src="base/images/' + obj.u + '-cn.png" class="p-up-down"/></span>' +
				'HIGH&nbsp;&nbsp;<span class="high">' + obj.h + '</span> &nbsp;&nbsp;LOW&nbsp;&nbsp;<span class="low">' + obj.l + '</span></a></li>';

			if (i % 3 == 0 && i != _dSize) {
				_tmp += _ul + _li;
			} else if (i % 3 == 2 && i != _dSize) {
				_tmp += _li + '</ul>';
			} else {
				_tmp += _li;
			}
		}
		dataBox.addClass('dataLoaded').html(_tmp + '</ul>');
	}
}

//交易专区
function loadingData() {
	var boxId = $(".market-trend-tab > li.select").attr("id").split('_')[1];
	switch (boxId) {
		case "fxBox":
			$('.stock').find('span.select').attr('lib', 'ST'); //判断charts.html的图片链接是否加a
			$.getScript(chartsURL + "?group=FX&callback=fillData");
			break;
		case "mBox":
			$('.stock').find('span.select').attr('lib', 'IX');
			$.getScript(chartsURL + "?group=ML&callback=fillData");
			break;
		case "oBox":
			$('.stock').find('span.select').attr('lib', 'IX');
			$.getScript(chartsURL + "?group=OL&callback=fillData");
			break;
		case "iBox":
			$('.stock').find('span').eq(0).attr('lib', 'ST');
			$('.stock').find('span').eq(1).attr('lib', 'IX');
			var _ch = $('.stock').find('span.select').attr('lib');
			if (_ch != 'IX' && _ch != 'ST') {
				$.getScript(chartsURL + "?group=IX&callback=fillData");
				$.getScript(chartsURL + "?group=ST&callback=fillDataST");
			} else {
				$.getScript(chartsURL + "?group=" + _ch + "&callback=fillData");
			}
			break;
		case "cBox":
			$('.stock').find('span.select').attr('lib', 'IX');
			$.getScript(chartsURL + "?group=FM&callback=fillData");
			break;
	}
}
//填充数据
function fillData(data) {
	if (!data) return;
	var data = data.filter(datafilter);
	var boxId = $(".market-trend-tab").find("li.select").eq(0).attr("id").split('_')[1];
	//if loaded,partial update
	if ($("#" + boxId).hasClass('dataLoaded')) {
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			var oldTr = $("#" + boxId).find("tr[name=" + obj.p + "]").eq(0);
			if (oldTr.length > 0) {
				oldTr.find("td.fx-n").html('<span class="' + ((obj.o == 1) ? 'green' : 'red') + '">•</span>' + obj.p);
				oldTr.find("td").eq(1).html(obj.s).removeClass().addClass((obj.u == 'up') ? 'drop ' : 'liter').addClass('buy');
				oldTr.find("td").eq(2).html(obj.b).removeClass().addClass((obj.u == 'up') ? 'drop' : 'liter').addClass('sell')
				oldTr.find("td").eq(3).html(obj.h);
				oldTr.find("td").eq(4).html(obj.l + '<span class="' + obj.u + '"></span>');
				// oldTr.find("td").eq(5).html('<img src="base/images/' + ((obj.u == 'up') ? 'up' : 'down') + '-cn.png" />');
			}
		}
	} else {
		var tableHtml = '<table class="market-trend-tbody table-body" width="100%">';

		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			tableHtml += '<tr name="' + obj.p + '">';
			tableHtml += '<td  width="20%" class="name" class="name">' + obj.p + '</td>';
			tableHtml += '<td  width="20%" class="buy ' + ((obj.u == 'up') ? 'drop' : 'liter') + '">' + obj.s + '</td>';
			tableHtml += '<td  width="20%" class="sell ' + ((obj.u == 'up') ? 'drop' : 'liter') + '">' + obj.b + '</td>';
			tableHtml += '<td  width="20%" class="hign">' + obj.h + '</td>';
			tableHtml += '<td  width="20%" class="low" >' + obj.l + '<span class="' + obj.u + '"></span></td>';
			// tableHtml += '<td align="left" class="img"><img src="base/images/' + ((obj.u == 'up') ? 'up' : 'down') + '-cn.png" /></td>';
			tableHtml += '</tr>';
		}
		var p = data[data.length - 1].p;
		console.log(chartsImg + p + '1_409x286x2.gif')
		console.log('https://static.aetoscg.asia/MT4/USDCNH1_409x286x2.gif?radom=1537966228973')
			//检测是否存在.chart-img-box
		var rightPic = $(document).find('.chart-img-box').size();
		if (rightPic == 0) {
			// var strTr = '<tr name="image"><td colspan="5" style=" width:409px; height:286px;"><img src="' + chartsImg + ((p.length < 6 && p !== 'DXY') ? (p + 'A') : p) + '1_409x286x2.gif" width="409" height="286"/></td></tr>';
			var strTr = '<tr name="image"><td colspan="5" style=" width:409px; height:286px;"><img src="' + chartsImg + p + '1_409x286x2.gif?radom=' + new Date().getTime() + '" width="409" height="286"/></td></tr>';
			tableHtml += strTr;
		}
		tableHtml += '</table>'
		$("#" + boxId).addClass('dataLoaded').html(tableHtml);
		$("#" + boxId).children('table').children('tbody').children('tr').click(tr_click);
		if (rightPic == 1) {
			var lastTr = $("#" + boxId).children('table').children('tbody').children('tr').last();
			lastTr.click();
		}

	}
}
//填充数据, 追加股票数据 
function fillDataST(data) {
	if (!data) return;
	var data = data.filter(datafilter);
	var boxId = $(".market-trend-tab").find("li.select").eq(0).attr("id").split('_')[1];
	//if loaded,partial update
	if ($("#" + boxId).hasClass('dataLoaded') && $("#" + boxId).hasClass('st')) {
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			var oldTr = $("#" + boxId).find("tr[name=" + obj.p + "]").eq(0);
			if (oldTr.length > 0) {
				oldTr.find("td.fx-n").html('<span class="' + ((obj.o == 1) ? 'green' : 'red') + '">•</span>' + obj.p);
				oldTr.find("td").eq(1).html(obj.s).removeClass().addClass((obj.u == 'up') ? 'drop' : 'liter');
				oldTr.find("td").eq(2).html(obj.b).removeClass().addClass((obj.u == 'up') ? 'drop' : 'liter');
				oldTr.find("td").eq(3).html(obj.h);
				oldTr.find("td").eq(4).html(obj.l);
				oldTr.find("td").eq(5).html('<span><img src="base/images/' + ((obj.u == 'up') ? 'up' : 'down') + '-cn.png" /></span>');
			}
		}
	} else {
		var tableHtml = '';

		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			tableHtml += '<tr name="' + obj.p + '" class="tr_st">';
			tableHtml += '<td width="20%">' + obj.p + '</td>';
			tableHtml += '<td width="20%" class="' + ((obj.u == 'up') ? 'drop' : 'liter') + '">' + obj.s + '</td>';
			tableHtml += '<td width="20%" class="' + ((obj.u == 'up') ? 'drop' : 'liter') + '">' + obj.b + '</td>';
			tableHtml += '<td width="20%">' + obj.h + '</td>';
			tableHtml += '<td width="20%">' + obj.l + '<span><img src="base/images/' + ((obj.u == 'up') ? 'up' : 'down') + '-cn.png" /></span></td>';
			tableHtml += '</tr>';
		}
		var p = data[data.length - 1].p;

		$("#" + boxId).addClass('st');
		$("#" + boxId).children('table').children('tbody').append(tableHtml);
		$("#" + boxId).children('table').children('tbody').children('tr').click(tr_click);

	}
}

//tr_click---
function tr_click(e) {
	e.preventDefault();
	var isOpen = $(this).data("isOpen") || false;
	var trName = $(this).attr("name");
	var $tr = $(this).parents("table").eq(0).find("tr[name='image']").eq(0);
	if (trName == 'image') {
		return;
	}

	var _ch = $('.stock').find('span.select').attr('lib');
	// if(_ch == 'ST' || $(this).hasClass('tr_st')){
	// 	trName = trName;
	// }else if(trName.length < 6 && trName !== 'DXY'){
	// 	trName = trName + 'A';
	// }
	//检测是否存在.chart-img-box
	var rightPic = $(document).find('.chart-img-box').size();
	if (rightPic == 0) {
		if (!isOpen) {
			$(this).data("isOpen", true);
			var $img = $tr.find("img");
			var newSrc = $(this).data("img_src") || '';
			var time = $(this).data("time") || '';
			if (time) {
				var nowTime = new Date().getTime();
				if ((nowTime - time * 1) > 60000) {
					newSrc = chartsImg + trName + '1_409x286x2.gif?radom=' + (new Date().getTime());
				}
			} else {
				newSrc = chartsImg + trName + '1_409x286x2.gif?radom=' + (new Date().getTime());
				$(this).data('time', new Date().getTime());
				$(this).data('img_src', newSrc);
			}
			$img.attr("src", newSrc);

			$(this).after($tr);
			$tr.show();
		} else {
			$(this).data("isOpen", false);
			//$tr.hide();
		}
	}

	//chart.html 页面使用
	if (rightPic == 1) {
		var rightPic = chartsImg + trName + '1_335x337x2.gif?radom=' + (new Date().getTime());
		$('.chart-img-box > img').attr("src", rightPic);
		$(this).parents('table').find('tr').css({
			'background': 'none'
		});
		$(this).css({
			'background': '#d9d9d9'
		});
	}

}

$(document).ready(function() {
	$("#fxBox").after('<div class="market-trend-box" id="mBox" style="display:none;"></div>' +
		'<div class="market-trend-box" id="oBox" style="display:none;">' + '</div><div class="market-trend-box" id="iBox" style="display:none;"></div>' + '</div><div class="market-trend-box" id="cBox" style="display:none;"></div>');

	//交易专区menu
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
	});

	$('.stock > span').on('click', function() {
		$('.stock').children('span').removeClass('select');
		$(this).addClass('select');
		$('#iBox').removeClass('dataLoaded').html();
		$('#t_iBox').click();
	})


	//加载数据,写到页面
	loadingData();
	setInterval(function() {
		$(".market-trend-tab").find("li.select").click();
	}, 5000);

	// //首页跑马灯
	// $.getScript(SystemProp.quoteBrowserUrl+"?group=ALL&callback=quotation&random="+(+new Date()));
	// setInterval(function(){$.getScript(SystemProp.quoteBrowserUrl+"?group=ALL&callback=quotation");},5000);

});