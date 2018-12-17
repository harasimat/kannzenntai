/* =========================================================*/
// jquery.shidewide.js / ver.2.9

// Copyright (c) 2015 CoolWebWindow
// This code is released under the MIT License
// https://osdn.jp/projects/opensource/wiki/licenses%2FMIT_license

// Date: 2017-03-03
// Author: CoolWebWindow
// Mail: info@coolwebwindow.com
// Web: http://www.coolwebwindow.com

// Used jquery.js
// http://jquery.com/
/* =========================================================*/

$(function($){
	$.fn.slidewide = function(options) {
		// 蛻晄悄蛟､
		var o = $.extend({
			touch         : true,
			touchDistance : '80',
			autoSlide     : true,
			repeat        : true,
			interval      : 3000,
			duration      : 500,
			easing        : 'swing',
			imgHoverStop  : true,
			navHoverStop  : true,
			prevPosition  : 0,
			nextPosition  : 0,
			filter        : true,
			filterNav     : true,
			viewSlide     : 1,
			baseWidth     : 0,
			navImg        : false,
			navImgCustom  : false,
			navImgSuffix  : ''
		}, options);

		// 繧ｻ繝ｬ繧ｯ繧ｿ險ｭ螳�
		var $slider     = $(this),
			$container  = $slider.find('.slideInner'),
			$element    = $container.children(),
			$prevNav    = $slider.find('.slidePrev'),
			$nextNav    = $slider.find('.slideNext'),
			$prevImg    = $slider.find('.slidePrev img'),
			$nextImg    = $slider.find('.slideNext img'),
			$controlNav = $slider.find('.controlNav');

		// 螟画焚險ｭ螳�
		var windowWidth,
			sliderWidth,
			slideWidth,
			totalWidth,
			slidePosition,
			filterWidth,
			filterHeight,
			imgMargin,
			imgPadding,
			prevImgWidth,
			prevImgHeight,
			prevImgYPosition,
			prevImgXPosition,
			nextImgWidth,
			nextImgHeight,
			nextImgYPosition,
			nextImgXPosition,
			count = 1,
			imgNum = 1,
			slideCount = 1,
			stopFlag = false,
			hoverFlag = false;

		// 繝輔ぅ繝ｫ繧ｿ繝ｼ險ｭ鄂ｮ
		if(o.filter) {
			$slider.append('<div class="filterPrev"></div><div class="filterNext"></div>');
			var $filterPrev = $slider.find('.filterPrev'),
				$filterNext = $slider.find('.filterNext');
		}

		// 繧ｹ繝ｩ繧､繝臥判蜒剰､�｣ｽ
		$('li', $container).clone().prependTo($container);
		$('li', $container).clone().appendTo($container);

		// 譛蠕後�逕ｻ蜒上ｒ譛蛻昴↓遘ｻ蜍�
		$('li:last-child', $container).prependTo($container);

		// 繧ｹ繝医ャ繝励Δ繝ｼ繝画凾PREV繝懊ち繝ｳ髱櫁｡ｨ遉ｺ
		if (!o.repeat) {
			$prevNav.hide();
		}

		// 繧ｹ繝ｩ繧､繝芽ｨｭ鄂ｮ
		$(this).find('img').on('load', function(){
			$slider.css({'display' : 'block'});
			// 繧ｹ繝ｩ繧､繝峨�讓呎ｺ悶し繧､繧ｺ險ｭ螳�
			if(o.baseWidth <= 0) {
				o.baseWidth = $element.width();
			}
			posSlide();
		});
		var timer = false;
		$(window).on('resize', function(){
			if (timer !== false) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				posSlide();
			}, 200);
		});

		var posSlide = function () {
			windowWidth = $(window).width();
			if(windowWidth < o.baseWidth){
				$container.find('img').css({width : windowWidth});
			} else {
				$container.find('img').css({width : o.baseWidth});
			}

			// 蜷�､蜿門ｾ�
			sliderWidth = $slider.outerWidth(true);
			slideWidth = $slider.find('li').outerWidth(true);
			totalWidth = ($slider.find('li').length * slideWidth);
			imgMargin = parseInt($element.find('img').css('margin-left'));
			imgPadding = parseInt($element.find('img').css('padding-left'));
			filterWidth = ((sliderWidth - slideWidth * o.viewSlide) / 2) - (imgMargin + imgPadding);
			filterHeight = $slider.find('li').height();
			prevImgWidth = parseInt($prevImg.css('width'));
			prevImgHeight = parseInt($prevImg.css('height'));
			prevImgYPosition = (filterHeight- prevImgHeight) / 2;
			prevImgXPosition = filterWidth - prevImgWidth + o.prevPosition;
			nextImgWidth = parseInt($nextImg.css('width'));
			nextImgHeight = parseInt($nextImg.css('height'));
			nextImgYPosition = (filterHeight- nextImgHeight) / 2;
			nextImgXPosition = filterWidth - nextImgWidth + o.nextPosition;

			// 繧ｹ繝槭�繝医ヵ繧ｩ繝ｳ縺ｮ蝣ｴ蜷医�繧ｹ繝ｩ繧､繝臥判蜒上ｒ1譫壹★縺､陦ｨ遉ｺ
			if('ontouchstart' in document) {
				slidePosition = ((sliderWidth - totalWidth ) / 2) - (slideWidth / 2);
			} else {
				slidePosition = ((sliderWidth - totalWidth ) / 2) - (slideWidth / 2) - (slideWidth * (0.5 * o.viewSlide - 0.5));
			}

			// 繧ｹ繝ｩ繧､繝峨す繝ｧ繝ｼ縺ｮ讓ｪ蟷��隱ｿ謨ｴ
			if(windowWidth < o.baseWidth){
				slidePosition = ((sliderWidth - totalWidth ) / 2) - (slideWidth / 2);
			}

			// CSS
			$container.css({
				'float' : 'left',
				'width' : totalWidth,
				'height' : filterHeight,
				'top' : '0',
				'left' : slidePosition,
				'margin-left' : -slideWidth
			});
			if(o.filterNav) {
				$prevNav.css({'width' : filterWidth , 'height' : filterHeight});
				$nextNav.css({'width' : filterWidth , 'height' : filterHeight});
			}
			$prevNav.css({'top' : '0' , 'left' : '0'});
			$nextNav.css({'top' : '0' , 'right' : '0'});
			$element.css({'width' : slideWidth , 'height' : filterHeight});
			$prevImg.css({'top' : prevImgYPosition , 'left' : prevImgXPosition});
			$nextImg.css({'top' : nextImgYPosition , 'right' : nextImgXPosition});
			if(o.filter) {
				$filterPrev.css({'width' : filterWidth , 'height' : filterHeight});
				$filterNext.css({'width' : filterWidth , 'height' : filterHeight});
			}

			// 繧ｿ繝�メ繝代ロ繝ｫ縺ｯPREV/NEXT繝懊ち繝ｳ髱櫁｡ｨ遉ｺ
			if('ontouchstart' in document) {
				$prevNav.hide();
				$prevImg.hide();
				$nextNav.hide();
				$nextImg.hide();
			}
		}

		// 繧ｳ繝ｳ繝医Ο繝ｼ繝ｫ繝翫ン繝�じ繧､繝ｳ
		var controlNavDesign = function () {
			$controlNav.children('span').removeClass('current');
			$controlNav.children('span:eq(' + (count -1) + ')').addClass('current');
		};

		// 閾ｪ蜍募�繧頑崛縺医せ繧ｿ繝ｼ繝�
		var start;
		var startTimer = function () {
			start = setInterval(function(){
				nextSlide(slideCount);
			},o.interval);
		};

		// 閾ｪ蜍募�繧頑崛縺医せ繝医ャ繝�
		var stopTimer = function () {
			 clearInterval(start);
		};

		// 繧ｹ繝医ャ繝玲ｩ溯�
		var slideStop = function () {
			if (!o.repeat) {
				if(count >= $element.length){
					$nextNav.hide();
					stopTimer();
					stopFlag = true;
				}else{
					$nextNav.show();
				}
				if(count == 1){
					$prevNav.hide();
				}else{
					$prevNav.show();
				}
			}
		};

		// 繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ
		 var counter = function () {
			if(count > $element.length){
				count = 1;
			}
			 if(count == 0){
				count = $element.length;
			}
			slideCount = 1;
		};

		// 蟾ｦ譁ｹ蜷代せ繝ｩ繧､繝�
		var prevSlide = function (slideCount) {
			stopTimer();
			$container.not(':animated').animate({
				marginLeft:parseInt($container.css('margin-left')) + (slideWidth * slideCount) + 'px'
			},o.duration,o.easing,
			function(){
				for(i=0; i < slideCount; i++){
					$('li:last-child', $container).prependTo($container);
				}
				$container.css('margin-left',-slideWidth + 'px');
			});
			count = count - slideCount;
			counter();
			controlNavDesign();
			slideStop();
			if(!stopFlag && o.autoSlide && !hoverFlag) {
				startTimer();
			}
		}

		// 蜿ｳ譁ｹ蜷代せ繝ｩ繧､繝�
		var nextSlide = function (slideCount) {
			stopTimer();
			$container.not(':animated').animate({
				marginLeft:parseInt($container.css('margin-left')) - (slideWidth * slideCount) + 'px'
			},o.duration,o.easing,
			function(){
				for(i=0; i < slideCount; i++){
					$('li:first-child', $container).appendTo($container);
				}
				$container.css('margin-left',-slideWidth + 'px');
			});
			count = count + slideCount;
			counter();
			controlNavDesign();
			slideStop();
			if(!stopFlag && o.autoSlide && !hoverFlag) {
				startTimer();
			}
		}

		// 謌ｻ繧九�繧ｿ繝ｳ
		$prevNav.click(function(){
			if($container.is(':animated')) {
				return false;
			}
			prevSlide(slideCount);
		});

		// 騾ｲ繧繝懊ち繝ｳ
		$nextNav.click(function(){
			if($container.is(':animated')) {
				return false;
			}
			nextSlide(slideCount);
		});

		// 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ逕滓�
		$element.each(function (e) {
			$('<span/>').text(e + 1).appendTo($controlNav)
			.click(function () {
				if($container.is(':animated')) {
					return false;
				}
				if((e + 1) == count) { return false; }
				// 蟾ｦ譁ｹ蜷代せ繝ｩ繧､繝�
				if((e + 1) < count) {
					slideCount = count - (e + 1);
					prevSlide(slideCount);
				}
				// 蜿ｳ譁ｹ蜷代せ繝ｩ繧､繝�
				if((e + 1) > count) {
					slideCount = (e + 1) - count;
					nextSlide(slideCount);
				}
			});
		});
		$controlNav.find('span:first-child').addClass('current');

		// 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ逕ｻ蜒丞喧
		if(o.navImg){
			$element.each(function (e) {
				var cloneEle = $($element.find('img')[e]).clone();
				$($controlNav.find('span')[e]).html(cloneEle);
				// 繧ｵ繝�繝阪う繝ｫ逕ｨ縺ｮ逕ｻ蜒上′縺ゅｋ蝣ｴ蜷�
				if(o.navImgCustom && !(o.navImgSuffix == '')){
					// 逕ｻ蜒丞錐繧貞叙蠕�
					var src = cloneEle.attr('src');
					// 繧ｵ繝�繝阪う繝ｫ逕ｨ縺ｮ逕ｻ蜒丞錐繧貞叙蠕暦ｼ域磁蟆ｾ霎槭ｒ莉伜刈��
					var srcSuffix = src.replace(/^(.+)(\.[a-z]+)$/, '$1' + o.navImgSuffix + '$2');
					$($controlNav.find('img')[e]).attr('src', srcSuffix);
				}
			});
		}

		// 繧ｿ繝�メ繝代ロ繝ｫ縺ｯ繝帙ヰ繝ｼ蜍穂ｽ懃┌蜉ｹ
		if(!('ontouchstart' in document)) {
			// 逕ｻ蜒上↓繝帙ヰ繝ｼ縺励◆髫帙�蜍穂ｽ�
			if(o.imgHoverStop){
				$container.hover(function() {
					stopTimer();
				},function() {
					if(!stopFlag && o.autoSlide) {
						startTimer();
					}
				});
			}

			// 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ縺ｫ繝帙ヰ繝ｼ縺励◆髫帙�蜍穂ｽ�
			if(o.navHoverStop){
				$prevNav.hover(function() {
					hoverFlag = true;
					stopTimer();
				},function() {
					hoverFlag = false;
					if(!stopFlag && o.autoSlide) {
						startTimer();
					}
				});

				$nextNav.hover(function() {
					hoverFlag = true;
					stopTimer();
				},function() {
					hoverFlag = false;
					if(!stopFlag && o.autoSlide) {
						startTimer();
					}
				});

				$controlNav.hover(function() {
					hoverFlag = true;
					stopTimer();
				},function() {
					hoverFlag = false;
					if(!stopFlag && o.autoSlide) {
						startTimer();
					}
				});
			}
		}

		if(o.touch) {
			// 繧ｿ繝�メ繝代ロ繝ｫ蟇ｾ蠢�
			$slider.find('li').on('touchstart', touchStart);
			$slider.find('li').on('touchmove' , touchMove);
			$slider.find('li').on('touchend' , touchEnd);
		}

		// 繧ｿ繝��縺励◆菴咲ｽｮ繧偵Γ繝｢繝ｪ繝ｼ縺吶ｋ
		function touchStart(e) {
			var pos = Position(e);
			$slider.find('li').data('memoryS',pos.x);
		}

		// 繧ｿ繝��繧帝屬縺励◆菴咲ｽｮ繧偵Γ繝｢繝ｪ繝ｼ縺吶ｋ
		function touchMove(e) {
			// 菴咲ｽｮ諠��ｱ繧貞叙蠕�
			var pos = Position(e);
			$slider.find('li').data('memoryE',pos.x);
		}

		// 繧ｹ繝ｯ繧､繝暦ｼ医ち繝��縺励◆菴咲ｽｮ縺九ｉ繝励Λ繧ｹ縺九�繧､繝翫せ縺九〒蟾ｦ蜿ｳ遘ｻ蜍輔ｒ蛻､譁ｭ��
		function touchEnd(e) {
			var startX = $slider.find('li').data('memoryS');
			var endX = $slider.find('li').data('memoryE');

			// 蟾ｦ縺九ｉ蜿ｳ縺ｸ繧ｹ繝ｯ繧､繝�
			if(startX < endX) {
				if(endX - startX > o.touchDistance){
					if($container.is(':animated')) {
						return false;
					}
					prevSlide(slideCount);
				}

			// 蜿ｳ縺九ｉ蟾ｦ縺ｸ繧ｹ繝ｯ繧､繝�
			}else{
				if(startX - endX > o.touchDistance){
					if($container.is(':animated')) {
						return false;
					}
					nextSlide(slideCount);
				}
			}
		}

		// 迴ｾ蝨ｨ菴咲ｽｮ繧貞叙蠕�
		function Position(e){
			var x = Math.floor(e.originalEvent.touches[0].pageX)
			var y = Math.floor(e.originalEvent.touches[0].pageY);
			var pos = {'x' : x , 'y' : y};
			return pos;
		}

		// 閾ｪ蜍輔せ繧ｿ繝ｼ繝郁ｨｭ螳�
		if(o.autoSlide){
			startTimer();
		}

	};
});