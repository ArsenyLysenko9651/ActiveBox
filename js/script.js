// Данная запись позволяет дождаться пока загрузиться весь документ и только тогда
// выполняет какие-то действия с Dom элементами(«Document Object Model»).
// А внутри уже пишется код Js.
$(function(){

/*=============================Fixed Header===========================================*/
	let header = $("#header");
	let intro = $("#intro");

	//Переменныя высоты блока intro.
	let introH;
	//Переменныя позиции скролла(расстояние от верха).
	// $(window) обращение к открытому окну.
	let scrollPos = $(window).scrollTop();

	//обработчики событий on (при скролле, изменения размера экрана)
	$(window).on("scroll resize", function(){
		//Запись значения высоты блока intro.
		introH = intro.innerHeight();
		//Обновление и запись текуший позиции скролла.
		//this это обращение к $(window)
		scrollPos = $(this).scrollTop();
		//в функцию checkScroll будут приниматься параметры (высота и текущая позиция скролла)
		checkScroll(scrollPos, introH);
	});

	function checkScroll(scrollPos, introH){
		if (scrollPos > introH ){
			// Добавляем к классу header класс fixed
			header.addClass("fixed");
			//Если позиция скролла не выходи выходит за высоту блока то
			//убираем класс fixed.
		} else {
			header.removeClass("fixed");
		}
	}

/*==================================Smooth scroll=========================================*/
	/*Происходит выборка элементов с атрибутом data-scroll( атриубут указывается 
	в [] Устанвалимаем счетчик на событие клик.
	(1)НЕОБХОДИМО ОТМЕНИТЬ стандартное поведение ссылки при клике function (event)
	чтобы страница не перезагружалась при клике*/
	$("[data-scroll]").on("click", function(event){
		/*отменяет стандартное поведение ссылки*/
		event.preventDefault();

		/*При клике в переменой будет храниться id блока*/
		let elementId = $(this).data('scroll');
		/*Отступ данного элемента от верха*/
		let elementOffset = $(elementId).offset().top;

		/*При клике также убирается класс show
		СМОТРИ скрипт для Nav Toggle=*/
		nav.removeClass("show");

		/*Добавляем анимацию перехода до блока 
		отступаем 70px чтобы был отступ и устанавливаем 
		время перехода 700=0.7секунд (указывается в миллисекундах)*/
		$("html, body").animate({
			scrollTop: elementOffset - 70
		},700);
	});


/*==================================Nav Toggle============================================*/
	/*Селектор по id навигации*/
	let nav = $("#nav");
	/*Селектор по id #navToggle*/
	let navToggle = $("#navToggle");
	/*По событию клик*/
	navToggle.on("click", function(event){
		/*Отменяет стандартное поведение (на случай
		если сделать кнопку через тег [a])*/
		event.preventDefault();

		/*Тумблер выдачи класса show*/
		nav.toggleClass("show");
	})

/*==================================Reviews Slider (https://kenwheeler.github.io/slick/)============================================*/
/*Сохраняем в переменную slider селектор по id reviewsSlider*/
let slider = $("#reviewsSlider");
/*Указываем переменную slider, вызываем метод slick */
	slider.slick({
		/*Бесконечная прокрутка слайдов*/
		infinite: true,
		/*Количество слайдов которые мы хотим показать*/
		slidesToShow: 1,
		/*Количество слайдов которые мы будем сколлить при нажатии*/
		slidesToScroll: 1,
		/*Чтобы отзывы затемнялись, один исчезал другой появлялся нужно поставить true 
		Чтобы шли друг за другом false*/
		fade:false,
		/*Убираем кнопки если они не нужны*/
		arrows:false,
		/*Убираем кнопки*/
		dots:true,
		/*autoplay: true*/
	});

});