# btOneSlide

Jquery 슬라이드 plugin

http://bbatta38.github.io/btOneSlide/

예제 : 파일 다운 후 index.html 실행

## 설치
```html
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/jquery.btOneSlide.js"></script>
```

## 기본 사용법

```javascript
$(function(){
    $(".wrap").btOneSlide({
    });
});
```

## 옵션

**mode** : 슬라이드의 가로세로 설정
```javascript
$(".wrap").btOneSlide({
	mode : "horizontal" // or "vertical"
});
```
**container**: 슬라이드 될 컨테이너(여러개 선택 가능)
```javascript
$(".wrap").btOneSlide({
	container:".first, .second, .third" // 복수선택 할 경우
    //설정하지 않을 경우 wrap의 자식 객채 중 ul로 지정
});
```
**startIndex** : 시작 인덱스(0부터 시작)
```javascript
$(".wrap").btOneSlide({
	startIndex : 0
    // 인덱스의 범위가 child의 갯수를 넘어갈 경우 마지막 인덱스로 설정
});
```

**controller** : 양쪽 화살표 컨트롤러
```javascript
$(".wrap").btOneSlide({
	controller:".oneSlideControls" // default
});
```

**pager** : 페이지 표시
```javascript
$(".wrap").btOneSlide({
	pager:".pager"
});
```

**hasPagerClass** : 페이저의 각각의 li에 on 클래스의 적용여부
```javascript
$(".wrap").btOneSlide({
	hasPagerClass:false // or true
    // 이 옵션을 false로 설정했을경우 on클래스가 적용되지 않고 opacity값이 1로 설정됌
});
```

**loop** : 무한루프
```javascript
$(".wrap").btOneSlide({
	loop:true // or false
});
```

**ease** : easing 값(jquery ease 참조)
```javascript
$(".wrap").btOneSlide({
	ease:"linear" // or jquery easing
});
```

**animateSpeed** : 슬라이드 속도
```javascript
$(".wrap").btOneSlide({
	animateSpeed:300 // or 400, 500 ...
});
```

**auto** : 자동 슬라이드 설정
```javascript
$(".wrap").btOneSlide({
	auto:false // or true
});
```

**intervalTime** : 자동 슬라이드 되는 시간간격
```javascript
$(".wrap").btOneSlide({
	intervalTime:5000 // or 3000, 4000 ...
});
```

**windowFit** : 슬라이드 크기를 윈도우에 맞출것인지에 대한 여부
```javascript
$(".wrap").btOneSlide({
	windowFit:false //or true
});
```

**onSlideReadyComplete** : 슬라이드 준비가 다 끝난 시점
```javascript
$(".wrap").btOneSlide({
	onSlideReadyComplete:function(){
    	// on your code
    }
});
```

**onChangeStart** : 모션 시작 시점
```javascript
$(".wrap").btOneSlide({
	onChangeStart:function($sl, $index, $oldIndex){
    	// $sl : 슬라이드 객체
    	// $index : 현재의 객체 인덱스 값
		// $oldIndex : 이전의 객체 인덱스 값
    }
});
```

**onChangeEnd** : 모션 끝 시점
```javascript
$(".wrap").btOneSlide({
	onChangeEnd:function($sl, $index, $oldIndex){
    	// $sl : 슬라이드 객체
    	// $index : 현재의 객체 인덱스 값
		// $oldIndex : 이전의 객체 인덱스 값
    }
});
```

e-mail : bbatta38@gmail.com