$(function() {
	$.fn.jsbook = function(options) {
		var defaults = {
			pageNum: 15, //自动切换时间
			index: 0, //当前页
			images: '', //图片路径
			id: '', //标识
			width: 1280,
			height: 720,
			maxWidth: 1280,
			maxHeight: 720,
			zIndex: 10000,
			sprite: ''
		}

		var options = $.extend(defaults, options);
		this.each(function(index, el) {
			var itemImg = "";
			var xuhao = /{{(.+?)}}/g.exec(options.images)[1].length;
			var xxx = /{{(.+?)}}/g.exec(options.images)[1]

			for (var i = 0; i < options.pageNum; i++) {
				itemImg = itemImg + '<div class="item"><img src="' + options.images + '" ></div>';
				var name = "";
				var j = xuhao;
				var maxJ = i.toString().length;
				while (j > 0) {
					if (j != maxJ) {
						name = name + "0";
					} else {
						name = name + i;
						j = 0
					}
					j--
				}
				itemImg = itemImg.toString().replace(/{{.+?}}/g, name)
			}
			//id="' + options.id + '"
			var html = '<div class="jqbook" ><div class="book-bg"></div><div class="book-main">' +
				'<div class="context">' + itemImg +
				'</div>' +
				'</div>' +
				'<div class="book-tool">' +
				'<a class="jqbook-control jqbook-control-lastLeft jqbook-disabled"><i></i></a>' +
				'<a class="jqbook-control jqbook-control-left jqbook-disabled"><i></i></a>' +
				'<span class="jqbook-control jqbook-control-currentPage" ><input class="jqbook-input-page" style="display: none; top: 10.5px;"><span class="current-page" style="width: 100%; visibility: visible;">' + (options.index + 1) + '/' + options.pageNum + '</span></span>' +
				'<a class="jqbook-control jqbook-control-right"><i></i></a>' +
				'<a class="jqbook-control jqbook-control-lastRight"><i></i></a>' +
				'<a title="thumbnails on/off" class="jqbook-control jqbook-control-thumbnails"><i></i></a>' +
				'</div><div class="sprite-item"></div><button class="jqbook-close">✕</button><div class="jqbook-fx jqbook-left"></div><div class="jqbook-fx jqbook-right"></div><audio src="' + options.audio + '"></audio>' +
				'</div>';

			$("body").append($(this))
			$(this).html(html)
			var spriteHTML = "";

			var $this = $(this);
			$this.attr("show", true)
			$this.find(".item").eq(options.index).css({
				zIndex: 1
			});
			$this.hide().fadeIn(500)
			console.log($(this))

			sprite();
			resetWindow();
			// $this.find('.jqbook').hide().fadeIn(500);
			//浏览器缩放事件
			$(window).resize(function(event) {
				resetWindow()
			});
			$this.on('click', '.jqbook-control-right,.jqbook-right', function() {
				nextPage();
			})
			$this.on('click', '.jqbook-control-left,.jqbook-left', function() {
				prevPage();
			});

			$this.on('click', '.jqbook-control-lastLeft', function() {
				if (options.index > 0) {
					gotoPage(0);
				}
			});
			$this.on('click', '.jqbook-control-lastRight', function() {
				if (options.index < options.pageNum - 1) {
					gotoPage(options.pageNum - 1);
				}
			});
			//打开或者关闭雪碧图
			$this.on("click", ".jqbook-control-thumbnails", function() {
				$this.find('.sprite-item').toggleClass('show');
			});
			//点击下雪碧图
			$this.on('click', '.sprite-right', function() {
				spriteScroll(1)
			});
			//点击上雪碧图
			$this.on('click', '.sprite-left', function() {
				spriteScroll(-1)
			});
			//点击雪碧图
			$this.on('click', '.scroll span', function() {
				var index = $(this).attr("page");
				gotoPage(index)
			});
			//关闭弹窗
			$this.on("click", ".jqbook-close", function() {
				$this.fadeOut(500);
				console.log($this)
			})

			//属性值计算
			function resetWindow() {
				var w = $this.find('.book-main').width();
				var h = $this.find('.book-main').height();
				if (options.width / options.height < w / h) {
					options.maxHeight = h > options.height ? options.height : h
					options.maxWidth = options.width * options.maxHeight / options.height;
					$this.find('.context').height(options.maxHeight).width(options.maxWidth)
						// console.log(options.maxWidth, options.maxHeight)
				} else {
					options.maxWidth = w > options.width ? options.width : w
					options.maxHeight = options.maxWidth * options.height / options.width;
					$this.find('.context').height(options.maxHeight).width(options.maxWidth)
						// console.log(options.maxWidth, options.maxHeight)
				}
			}
			//下一页
			function nextPage() {
				if (options.index >= options.pageNum - 1) return;
				audioShow()
				options.index++;
				showPage()
				$this.find(".item").each(function(index, el) {
					var zIndex = index > options.index ? 0 : index + 1
					$(this).css({
						zIndex: zIndex
					});
				});
				$this.find(".item").eq(options.index).css({
					left: options.maxWidth
				}).animate({
					left: 0
				}, 500)
			}
			//上一页
			function prevPage() {
				if (options.index <= 0) return;
				audioShow()
				options.index--;
				showPage()
				$this.find(".item").each(function(index, el) {
					var zIndex = index < options.index ? 0 : options.pageNum - index
					$(this).css({
						zIndex: zIndex
					})
				});
				$this.find(".item").eq(options.index).css({
					left: -options.maxWidth
				}).show().stop().animate({
					left: 0
				}, 500)
			}
			//进去指定页面
			function gotoPage(page) {
				audioShow()
				if (Number(page) > Number(options.index)) {
					options.index = page;
					$this.find(".item").eq(options.index).css({
						left: options.maxWidth,
						zIndex: options.zIndex++
					}).animate({
						left: 0
					}, 500)
				} else if (Number(page) < Number(options.index)) {
					options.index = page;
					$this.find(".item").eq(options.index).css({
						left: -options.maxWidth,
						zIndex: options.zIndex++
					}).stop().animate({
						left: 0
					}, 500)
				}
				showPage()
			}
			//显示页数
			function showPage() {
				var html = (options.index + 1) + '/' + options.pageNum;
				$this.find('.current-page').html(html)
			}
			//加载sprite图片
			function sprite() {
				var html = '<div class="sprite-left"></div><div class="sprite-context"><div class="scroll"><ul>';
				var w = 97;
				var h = Math.ceil(options.height * w / options.width);
				for (var i = 0; i < options.pageNum; i++) {
					html = html + '<li><span page="' + i + '" style="display:inline-block;width:' + w + 'px;height:' + h + 'px;background:url(' + options.sprite + ') no-repeat 0px -' + (i * h) + 'px" ></span></li>';
				}
				html = html + '<ul></div></div><div class="sprite-right"></div>';
				$this.find('.sprite-item').html(html)
				options.spriteScroll = $this.find(".scroll ul").innerWidth()
				$this.find('.sprite-item .scroll').css({
					width: options.spriteScroll
				})
			}
			//雪碧图滚动条
			function spriteScroll(d) {
				var left = Math.abs(parseInt($this.find('.sprite-item .scroll').css("left")));
				var slide = $this.find('.sprite-item .scroll li').outerWidth() * 5 * d + left;
				var w = $this.find(".sprite-context").width();
				slide = slide > options.spriteScroll - w ? options.spriteScroll - w : slide;
				slide = slide < 0 ? 0 : slide;
				$this.find('.scroll').animate({
					left: -slide
				}, 500)
			}
			//声音播放
			function audioShow() {
				// $this.find('audio')[0].pause();
				// $this.find('audio')[0].currentTime = 0
				// $this.find('audio')[0].play();
				var audioNew = new Audio();
				audioNew.src = options.audio;
				audioNew.play();
			}

		});
		return $(this);
	}
})