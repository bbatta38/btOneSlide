/**
 * Created by kimbyungsoo on 2015-03-16.
 */

(function($){
	$.fn.btOneSlide = function(opt, callback){
		if($.isFunction(opt)){
			callback = opt;
			opt = null;
		}

		$.fn.btOneSlide.setting = {
			mode:"horizontal",              // vertical : 세로, horizontal : 가로
			startIndex:0,                   // 시작 인덱스
			controller:".oneSlideControls",  // 양쪽 화살표
			pager:"",                       // 페이지 표시
			container:$(this).find('ul'),   // 슬라이드 될 컨테이너(여러개의 컨테이너가 있을수 있으므로 따로 옵션으로 만듦)
			loop:true,                      // 무한루프
			ease:"linear",                  // easing 값(jquery ease 참조)
			animateSpeed:300,               // 애니메이션 스피드
			hasPagerClass:false,            // 페이저의 각각의 li에 on 클래스가 있는지 없는지 없을시에는 기본적으로 opacity 0.3 적용
			auto:false,                     // 자동 슬라이드
			intervalTime:5000,              // 자동 슬라이드 타임
			windowFit:false,                // 윈도우 크기 맞춤
			onSlideReadyComplete:function(){},
			onChangeStart:function(){},     // 모션시작시점
			onChangeEnd:function(){}        // 모션 끝 시점
		};

		opt = $.extend($.fn.btOneSlide.setting, opt);

		var el = this;
		var _controlPrev = $(this).find(opt.controller).find("a:first");
		var _controlNext = $(this).find(opt.controller).find("a:last");
		var _container = $(this).find(opt.container);
		var _pager = $(opt.pager);
		var _length = _container.children().length / _container.length;
		var _index;
		var _oldIndex;
		var _interval;
		if(opt.startIndex > _length-1){
			_index = _length-1;
			_oldIndex = _length-1;
		}else{
			_index = opt.startIndex;
			_oldIndex = opt.startIndex;
		}
		var _direction = "";
		var isEvent;
		_pager.find("li").each(function(i){
			if(i === _index){
				if(opt.hasPagerClass){
					$(this).addClass("on");
				}else{
					$(this).css("opacity", "1");
				}
			}else{
				if(opt.hasPagerClass){
					$(this).removeClass("on");
				}else{
					$(this).css("opacity", "0.3");
				}
			}

			$(this).bind("click", function(e){
				e.preventDefault();
				_index = $(this).index();
				el.goClickOneSlide(_index);
			});
		});

		el.goClickOneSlide = function($idx){
			_index = $idx;
			if(_index != _oldIndex){
				if(_index < _oldIndex){
					_direction = "prev";
				}else{
					_direction = "next";
				}
				el.goOneSlide();
				if(opt.auto){
					clearInterval(_interval);
					autoSetting(opt.auto);
				}
			}
		};

		_container.each(function(i){
			var _li = $(this).children();
			if(opt.windowFit){
				$(this).wrap("<div style='position:relative; width:100%; height:100%; overflow:hidden'></div>");
			}else{
				$(this).wrap("<div style='position:relative; width:"+_container.children().width()+"px; height:"+ _container.children().height() +"px; overflow:hidden'></div>");
			}
			$(this).css({"position":"absolute", "left":"0", "top":"0"});

			_li.css({"display": "none", "position":"absolute", "top":0, "left":0});
			_li.eq(_index).css({"display": "block"});

		});

		_controlPrev.bind("click", function(e){
			el.prevClick(e);
		});

		el.prevClick = function(e){
			//클릭하는 부분
			e.preventDefault();
			_direction = "prev";
			_index--;
			if(_index < 0){
				if(opt.loop){
					_index = _length - 1;
				}else{
					_index = 0;
				}
			}

			if(_index != _oldIndex){
				el.goOneSlide();
			}

			if(opt.auto){
				clearInterval(_interval);
				autoSetting(opt.auto);
			}
		};

		_controlNext.bind("click", function(e){
			el.nextClick(e);
		});

		el.nextClick = function(e){
			//클릭하는 부분
			e.preventDefault();
			_direction = "next";
			_index++;
			if(_index >_length - 1){
				if(opt.loop){
					_index = 0;
				}else{
					_index = _length - 1;
				}
			}

			if(_index != _oldIndex){
				el.goOneSlide();
			}

			if(opt.auto){
				clearInterval(_interval);
				autoSetting(opt.auto);
			}
		};

		controlSetting();

		el.goOneSlide = function(){
			opt.onChangeStart(this, _index, _oldIndex);
			isEvent = false;

			if(_pager){
				_pager.find("li").each(function(){
					$(this).unbind("click");
				});
				if(opt.hasPagerClass){
					if(_index > _pager.find("li").length - 1){
						_pager.find("li").removeClass("on");
					}else{
						_pager.find("li").eq(_index).addClass("on").siblings().removeClass("on");
					}
				}else{
					_pager.find("li").eq(_index).css("opacity", "1").siblings().css("opacity", "0.3");
				}
			}

			if(_controlPrev){
				_controlPrev.unbind("click");
				_controlNext.unbind("click");
				controlSetting();
			}

			_container.each(function(i){
				var _li = $(this).children();
				var cssObj;
				var aniObj;
				if(opt.mode === "horizontal"){
					var _width;
					if(_direction === "prev"){
						_width = -_li.width();
					}else if(_direction === "next"){
						_width = _li.width();
					}
					cssObj = {"display": "block", "left":_width};
					aniObj = {left:-(_width)};
				}else if(opt.mode === "vertical"){
					var _height;
					if(_direction === "prev"){
						_height = -_li.height();
					}else if(_direction === "next"){
						_height = _li.height();
					}
					cssObj = {"display": "block", "top":_height};
					aniObj = {top:-(_height)};
				}

				_li.eq(_index).css(cssObj);

				//애니메이션 부분
				$(this).stop().animate(aniObj, opt.animateSpeed, opt.ease, function(){
					$(this).css({"left":"0", "top":"0"});
					_li.css({"display": "none"});
					_li.eq(_index).css({"display": "block", "left":"0", "top":"0"});
					//애니메이션 끝
					if(!isEvent){
						opt.onChangeEnd(el, _index, _oldIndex);
						if(_controlPrev){
							_controlPrev.bind("click", function(e){
								el.prevClick(e);
							});
							_controlNext.bind("click", function(e){
								el.nextClick(e);
							});
						}
						if(_pager) {
							_pager.find("li").each(function () {
								$(this).bind("click", function(e){
									e.preventDefault();
									_index = $(this).index();
									el.goClickOneSlide(_index);
								});
							});
						}
						isEvent = true;
						_oldIndex = _index;
					}
				});
			});
		};

		function controlSetting(){
			if(!opt.loop && _controlPrev && _controlNext){
				if(_index === _length - 1){
					_controlNext.css("opacity", "0.2");
				}else{
					_controlNext.css("opacity", "1");
				}

				if(_index === 0){
					_controlPrev.css("opacity", "0.2");
				}else{
					_controlPrev.css("opacity", "1");
				}
			}
		}

		opt.onSlideReadyComplete();

		autoSetting(opt.auto);
		function autoSetting($bool){
			if($bool){
				_interval = setInterval(function(){
					_direction = "next";
					_index++;
					if(_index >_length - 1){
						_index = 0;
					}
					el.goOneSlide();
				}, opt.intervalTime);
			}
		}

		return this;
	};
})(jQuery);