(function() {
    $(window).scroll(function() {
        // gnb fixed
        if ($(this).scrollTop() > 100) {
            $('header').addClass('fixed');
        } else {
            $('header').removeClass('fixed');
        }

        //gnb anchor css
        var scrollPosition = $(window).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        var mainPosition = $('#mainSec').offset().top;
        var mainHeight = $('#mainSec').innerHeight();
        var bannerPosition = $('#bannerSec').offset().top;
        var bannerHeight = $('#bannerSec').innerHeight();
        var programPosition = $('#program').offset().top;
        var programHeight = $('#program').innerHeight();
        var reviewPosition = $('#review').offset().top;
        var bannerBgPosition = $('#bannerBgSec').offset().top;
        var contactPosition = $('#contact').offset().top;
        var contactHeight = $('#contact').innerHeight();
        
        $('.menu-item').each(function() {
            var linkHref = $(this).find('a').attr('href');
            if (linkHref === '#program' && scrollPosition >= 400 && scrollPosition < bannerBgPosition) {
                $(this).addClass('on');
                $(this).siblings('.menu-item').removeClass('on');
            } else if (linkHref === '#review' && scrollPosition + 210 > bannerBgPosition  && scrollPosition <= reviewPosition) {
                $(this).addClass('on');
                $(this).siblings('.menu-item').removeClass('on');
            } else if (linkHref === '#contact' && scrollPosition + 200 >= reviewPosition && scrollPosition >= documentHeight - 300) {
                $(this).addClass('on');
                $(this).siblings('.menu-item').removeClass('on');
            } else {
                $(this).removeClass('on');
            }

            if (scrollPosition + windowHeight >= documentHeight - 10) {
                $('.menu-item').eq(1).removeClass('on');
                $('.menu-item').eq(2).addClass('on');
            }

            //글로벌 연수후기
            if( bannerBgPosition < scrollPosition+300){
                $("#review").addClass('animated');
            }else{
                $("#review").removeClass('animated');
            }
        });

        //Quick Menu
        var footerTop = $('footer').offset().top;
        var quickMenu = $('#quickMenu');
        var scrollBottom = $(window).scrollTop() + $(window).height(); // 브라우저의 하단 위치

        if (scrollBottom > footerTop - 20) {
            // footer에 도달했을 때
            quickMenu.css('bottom', scrollBottom - footerTop + 20);
        } else {
            // footer에 도달하지 않았을 때
            quickMenu.css('bottom', '20px');
        }

        if(scrollPosition > 100){
            $("#quickMenu").addClass('on');
        }else{
            $("#quickMenu").removeClass('on');
        }
    }); //End of the $(window).scroll
})(); //End of the 즉시실행함수 (function() {}

$(document).ready(function() {
    // 모바일 화면 크기 정의
    var isMobile = window.innerWidth <= 768;
    // 태블릿 화면 크기 정의
    var isTablet = window.innerWidth <= 1024;

    // Swiper :: .main-swiper
    var listArray = ["[9월] IFA 2024 & ESG 한국대표단", "[9월] HR Technology Espo 2024 한국대표단", "[10월] ATD-APC 2024 한국대표단"];
    var mainSwiper = new Swiper('.main-swiper', {
        effect: 'fade',
        autoplay: { // 자동 재생
            delay: 3000, //css animation과 시간 맞춰줘야함
            disableOnInteraction: false, //사용자 슬라이더 상호작용시 자동재생기능 비활성화여부
        },
        pagination: { // bullet
            el: '.main-swiper .swiper-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
                if(isTablet){
                    return '<span class="' + className + '"></span>';
                }else{
                    return '<span class="' + className + '">' + '<em>'+ listArray[index] +'</em>' + '<i></i>' + '<b></b>' + '</span>';
                }
            }
        },
        navigation: { // arrow
            nextEl: '.main-swiper .swiper-button-next',
            prevEl: '.main-swiper .swiper-button-prev',
        },
    });

    //Swiper :: .banner-swiper
    var bannerSwiper = new Swiper('.banner-swiper', {
        loop: true, // 무한 슬라이드
        pagination: { 
            el: '.banner-swiper .swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
    });

    //Swiper :: .conference-swiper
    var conferenceSwiper = new Swiper('.conference-swiper', {
        slidesPerView: 2,
        spaceBetween: 14, //슬라이드 사이 간격
        navigation: {
            nextEl: '.conference-swiper .swiper-button-next',
            prevEl: '.conference-swiper .swiper-button-prev',
        },
        breakpoints: {
            1280: { // 브라우저 >= 1280
              slidesPerView: 4,  
              spaceBetween: 26.7   
            },
            
        },
    });

    //Swiper :: .regular-swiper
    var regularSwiper = new Swiper('.regular-swiper', {
        slidesPerView: 2,
        spaceBetween: 14, //슬라이드 사이 간격
        navigation: {
            nextEl: '.regular-swiper .swiper-button-next',
            prevEl: '.regular-swiper .swiper-button-prev',
        },
        breakpoints: {
            1280: { // 브라우저 >= 1280
              slidesPerView: 4,  
              spaceBetween: 26.7   
            },
            
        },
    });

    // Slick :: #review
    reviewCon = $('.main-review-list');
    var reviewItemLength = reviewCon.find('.list-item').length;

    reviewCon.on('beforeChange', function(event, slick, currentSlide, nextSlide) {	
        $(this).addClass('slide-on');
        if (currentSlide < nextSlide) { 
            for (var i=0; i<nextSlide; i++) {
                $(this).find('.list-item').eq(i).addClass('off');
            }
        }else {
            for (var i=reviewItemLength; i>nextSlide; i--) {
                $(this).find('.list-item').eq(i).removeClass('off');
            }
        }
    });

    reviewCon.not('.slick-initialized').slick({ //아직 초기화되지 않은 요소(.slick-initialized 클래스를 갖지 않는 요소만 선택)
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots:true,
        autoplay: false,
        speed:500,
        infinite:false,
        draggable : true,
        focusOnSelect:true,
        easing: 'linear',
        pauseOnHover:true,
        useTransform: false,
    });

    adjustImageSize(); // 슬라이드 이미지 정사각형 비율 자동조정

    $(window).on("resize",function  () {
        adjustImageSize(); //슬라이드 이미지 정사각형 비율 자동조정
    });

    reviewScroll();
    $(window).on('resize', reviewScroll);

    // mobile gnb click function
    $(".mobile-menu .menu-item").on("click", function(){
        gnbClose();
    })

}); // End of the Document ready	

//메인슬라이드 링크 연결
function goDtlPg(index){
    var url_Main = index == 1 ? 'https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=undefined&p_crscd=&p_crsseq_id=121416&p_view_type=S&p_ctgry_id=&CRSCD=&CRSSEQ_ID=121416&p_hmpgcd=30&mkey=36394' :
    				// index == 2 ? 'https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=002&p_crscd=&p_crsseq_id=121004&p_view_type=S&p_ctgry_id=&CRSCD=&CRSSEQ_ID=121004&p_hmpgcd=30&mkey=36394' :
                    index == 3 ? 'https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=undefined&p_crscd=&p_crsseq_id=121421&p_view_type=S&p_ctgry_id=&CRSCD=&CRSSEQ_ID=121421&p_hmpgcd=30&mkey=36394' :
                    index == 4 ? 'https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=undefined&p_crscd=&p_crsseq_id=121417&p_view_type=S&p_ctgry_id=&CRSCD=&CRSSEQ_ID=121417&p_hmpgcd=30&mkey=36394' :
                    "";
    if(url_Main){
        window.open(url_Main, "_blank");
    }
}

//컨퍼런스 해외연수, 일반 해외연수, 글로벌 연수후기 슬라이드 링크 연결
function goSubPg(type, index){
    if(type == 'confrn'){
        var url_Dtl = index == 1 ? 'https://www.kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=002&p_crscd=&p_crsseq_id=120661&p_view_type=S&p_ctgry_id=525&CRSCD=&CRSSEQ_ID=120661&p_hmpgcd=30&mkey=36297' :
                        index == 2 ? 'https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=002&p_crscd=110056&p_crsseq_id=120672&p_ctgry_id=undefined&p_hmpgcd=30' :
                        index == 3 ? 'https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=002&p_crscd=110059&p_crsseq_id=120704&p_ctgry_id=undefined&p_hmpgcd=30' :
                        "https://www.atd.kma.or.kr/";
        if(url_Dtl){
            window.open(url_Dtl, "_blank");
        }               
    }else if(type == 'regular'){
        var url_Dtl_reg = index == 1 ? 'https://www.kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=002&p_crscd=&p_crsseq_id=120662&p_view_type=S&p_ctgry_id=525&CRSCD=&CRSSEQ_ID=120662&p_hmpgcd=30&mkey=36297' :
                        index == 2 ? 'https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=002&p_crscd=110060&p_crsseq_id=120705&p_ctgry_id=undefined&p_hmpgcd=30' :
                        index == 3 ? 'https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=002&p_crscd=110055&p_crsseq_id=120671&p_ctgry_id=undefined&p_hmpgcd=30' :
                        "https://kma.or.kr/usrs/eduRegMgnt/eduRegInfoDetailForm.do?p_edutype_cd=002&p_crscd=110057&p_crsseq_id=120673&p_ctgry_id=undefined&p_hmpgcd=30";
        if(url_Dtl_reg){
            window.open(url_Dtl_reg, "_blank");
        } 
    }
}

//슬라이드 이미지 정사각형 비율 자동조정
function adjustImageSize() {
    var imageContainer = $('.swiper-slide .edu-img');
    var width = imageContainer.width(); // 컨테이너의 현재 너비를 가져옴
    imageContainer.css('height', width); // 너비에 맞춰 높이 조정
}

var mobileWidth = 800;
let reviewCon = $('.main-review-list');

// 임의의 영역을 만들어 스크롤바 크기 측정
function getScrollBarWidth(){
    if($(document).height() > $(window).height()){
        $('body').append('<div id="fakescrollbar" style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>');
        fakeScrollBar = $('#fakescrollbar');
        fakeScrollBar.append('<div style="height:100px;">&nbsp;</div>');
        var w1 = fakeScrollBar.find('div').innerWidth();
        fakeScrollBar.css('overflow-y', 'scroll');
        var w2 = $('#fakescrollbar').find('div').html('html is required to init new width.').innerWidth();
        fakeScrollBar.remove();
        return (w1-w2);
    }
    return 0;
}

// 브라우저 가로, 세로크기 측정
function getWindowWidth () {
    return $(window).outerWidth() + getScrollBarWidth() ;
}
function getWindowHeight () {
    return $(window).height() ;
}

// 모바일 체크
function isMobile(){
    var UserAgent = navigator.userAgent;
    if (UserAgent.match(/iPhone|iPad|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
    {
        return true;
    }else{
        // Ipad Safari Browser
        if ( detectIpad() ) {
            return true;
        }else {
            return false;
        } 
    }
}
function detectIpad() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Lying iOS13 iPad
    if (userAgent.match(/Macintosh/i) !== null && getWindowWidth () < 1025 ) {
        // need to distinguish between Macbook and iPad
        var canvas = document.createElement("canvas");
        if (canvas !== null) {
            var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            if (context) {
                var info = context.getExtension("WEBGL_debug_renderer_info");
                if (info) {
                    var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
                    if (renderer.indexOf("Apple") !== -1)
                    return true;
                }
            }
        }
    }
    return false;
}

// OS 체크
function detectOS(){
    var agent = navigator.userAgent.toLowerCase(); 
    var osCheck; 

    if ( agent.indexOf('android') > -1) {
        return "android";
    } else if ( agent.indexOf("iphone") > -1|| agent.indexOf("ipad") > -1|| agent.indexOf("ipod") > -1 || agent.indexOf("macintosh") > -1 ) {
        return "ios";
    } else {
        return "other";
    }

    return osCheck;
}

// Check Passive Support
function passiveSmoothScroll(){
    var supportsPassive = false;
    try {document.addEventListener("test", null, { get passive() { supportsPassive = true }});
    } catch(e) {}
    return supportsPassive;
}

// Start smooth Scroll
function smoothScroll(){
    if( isMobile() || detectOS() === "ios" ) return;
    var $window = $(window);
    if(passiveSmoothScroll()){
        window.addEventListener("wheel",smoothScroll_scrolling,{passive: false});
    }else{
        $window.on("mousewheel DOMMouseScroll", smoothScroll_scrolling);
    }
    $("html").addClass("smooth-srolling");
}

// Scroll Event
function smoothScroll_scrolling(event){
    event.preventDefault();
    var $window = $(window);
    var scrollTime = 1.5; // 애니메이션 지속시간(초)
    var delta = 0; //스크롤양
    if(passiveSmoothScroll()){
        var scrollDistance = 400; //$window.height() / 8;
        delta = event.wheelDelta/120 || -event.originalEvent.detail/3;
    }else{
        var scrollDistance = $window.height() / 2.5;
        if(typeof event.originalEvent.deltaY != "undefined"){
            delta = -event.originalEvent.deltaY/120;
        }else{
            delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
        }
    }

    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta*scrollDistance);
    winScrolling = gsap.to($window, scrollTime, {
        scrollTo : { y: finalScroll, autoKill:true },
        ease: Power4.easeOut,
        overwrite: 5
    });
}

// Destroy smooth Scroll
function destroySmoothScroll (event) {
    if( isMobile() || detectOS() === "ios" ) return;
    if(passiveSmoothScroll()){
        window.removeEventListener("wheel",smoothScroll_scrolling);
    }else{
        $(window).off("mousewheel DOMMouseScroll", smoothScroll_scrolling);
    }
    gsap.killTweensOf($(window),{scrollTo:true});
}

// 마우스 휠 동작에 따른 슬라이드 움직임
function reviewScroll () {
    destroySmoothScroll();

    var $reviewBottomTxt = $('#review .bottom-txt');
    var slideScroll = $('.main-review-list').find('.slick-slide');
    
    if ( $(window).width() > mobileWidth ) {
        slideScroll.on('wheel', (function (e) {
            if (e.originalEvent.deltaY < 0) {
                e.preventDefault();
                setTimeout(function(){
                    if ( reviewCon.find('.list-item').eq(0).hasClass('slick-current') === false ) {
                        reviewCon.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                        });
                        reviewCon.slick('slickPrev');
                    }
                },100);
                
            } else {
                e.preventDefault();
                setTimeout(function(){
                    if ( reviewCon.find('.list-item.last').hasClass('slick-current') === false ) {
                        reviewCon.on('beforeChange', function(event, slick, currentSlide, nextSlide) {	
                            $reviewBottomTxt.css('left', ((nextSlide / 5) * 100) + '%');

                        });
                        reviewCon.slick('slickNext');
                    }
                },100);
            }
        }));
    }
}

// 위로 이동
function goToGo() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

// mobile gnb close
function gnbClose() {
    $(".mobile-menu").animate({
        right: "-100%"
    });
}

// mobile gnb open
function gnbOpen() {
    $(".mobile-menu").animate({
        right: 0
    });
}
