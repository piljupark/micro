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
        // var mainPosition = $('#mainSec').offset().top;
        // var mainHeight = $('#mainSec').innerHeight();
        // var bannerPosition = $('#bannerSec').offset().top;
        // var bannerHeight = $('#bannerSec').innerHeight();
        // var programPosition = $('#program').offset().top - 200;
        // var programHeight = $('#program').innerHeight();
        // var peoplePosition = $('#people').offset().top - 200;
        // var bannerBgPosition = $('#bannerBgSec').offset().top;
        // var contactPosition = $('#reference').offset().top - 200;
        // var contactHeight = $('#reference').innerHeight();

        var mainPosition = $('#mainSec').offset().top;
        var programPosition = $('#program').offset().top - 300;  // 120px 간격 추가
        var bannerBgPosition = $('#bannerBgSec').offset().top - 300;
        var referencePosition = $('#reference').offset().top - 300;
        var peoplePosition = $('#people').offset().top - 290;

        

        $('.menu-item').removeClass('on');  // 모든 메뉴의 .on 제거
        
        // 📌 #program 전까지는 #mainSec이 활성화
        if (scrollPosition < programPosition) {
            $(".menu-item a[href='#mainSec']").parent().addClass('on');
        }
        // 📌 #program 활성화
        else if (scrollPosition >= programPosition && scrollPosition < referencePosition) {
            $(".menu-item a[href='#program']").parent().addClass('on');
        }
        // 📌 #reference 활성화
        else if (scrollPosition >= referencePosition && scrollPosition < peoplePosition ) {
            $(".menu-item a[href='#reference']").parent().addClass('on');
        }
         // 📌 #people 활성화
         else if (scrollPosition >= peoplePosition ) {
            $(".menu-item a[href='#people']").parent().addClass('on');
        }

        // 📌 맨 아래 도달 시 #people 유지
        if (scrollPosition + windowHeight >= documentHeight - 10) {
            $(".menu-item").removeClass("on");
            $(".menu-item a[href='#people']").parent().addClass("on");
        }

        // 📌 #reference 애니메이션 적용
        if (scrollPosition + 1400 > bannerBgPosition) {
            $("#people").addClass('animated');
        } else {
            $("#people").removeClass('animated');
        }

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
    var listArray = ["HRD 컨설팅 서비스", "기업 교육 솔루션", "트렌드M"];
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

     //Swiper :: .spc-swiper
     var regularSwiper = new Swiper('.spc-swiper', {
        slidesPerView: 2,
        spaceBetween: 14, //슬라이드 사이 간격
        navigation: {
            nextEl: '.spc-swiper .navi-wrap .swiper-button-next',
            prevEl: '.spc-swiper .navi-wrap .swiper-button-prev',
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
    });

}); // End of the Document ready	

//메인슬라이드 링크 연결
function goDtlPg(index){
    var url_Main = index == 1 ? 'https://www.kma.or.kr/kr/usrs/eduRegMgnt/eduRegMgntForm.do?mkey=32&cateNm=srvCnstEdu' :
    				index == 2 ? 'https://www.kma.or.kr/kr/usrs/eduRegMgnt/eduRegMgntForm.do?mkey=35&cateNm=srvEduCmp' :
                    index == 3 ? 'https://www.kma.or.kr/kr/usrs/eduRegMgnt/eduRegMgntForm.do?mkey=10&cateNm=spcTrendM' :
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


document.addEventListener("DOMContentLoaded", () => {
    // 강사진 검색 필터
    function filter() {
        const input = document.getElementById("value");
        const filterText = input.value.toLowerCase().trim();
        const kindWraps = document.querySelectorAll(".prof-kind-wrap");

        kindWraps.forEach((kindWrap) => {
            const listItems = kindWrap.querySelectorAll(".kind li");
            const kindTitle = kindWrap.querySelector(".kind-ti");

            let hasVisibleItems = false;

            listItems.forEach((item) => {
                const name = item.querySelector(".nm").textContent.toLowerCase();
                const team = item.querySelector(".team").textContent.toLowerCase();
                const modalTeam = item.querySelector(".md-team-txt")?.textContent.toLowerCase() || "";
                const modalItem = item.querySelector(".md-item-txt")?.textContent.toLowerCase() || "";

                if (
                    name.includes(filterText) ||
                    team.includes(filterText) ||
                    modalTeam.includes(filterText) ||
                    modalItem.includes(filterText)
                ) {
                    item.style.display = "";
                    hasVisibleItems = true;
                } else {
                    item.style.display = "none";
                }
            });

            if (kindTitle) {
                kindTitle.style.display = hasVisibleItems ? "" : "none";
            }
        });

        const noResultMessage = document.getElementById("no-result-message");
        const allVisibleItems = Array.from(document.querySelectorAll(".kind li")).filter(
            (item) => item.style.display !== "none"
        );

        if (allVisibleItems.length === 0) {
            if (!noResultMessage) {
                const message = document.createElement("p");
                message.id = "no-result-message";
                message.innerHTML = "검색 결과가 없습니다.<br><span>다른 검색어를 시도해보세요</span>";
                message.style.textAlign = "center";
                document.querySelector(".prof-wrap").appendChild(message);
            }
        } else {
            if (noResultMessage) {
                noResultMessage.remove();
            }
        }
    }

     // .s-left a 클릭 시 .kind-ti로 이동
     function initSmoothScroll() {
        const links = document.querySelectorAll(".s-left a");
    
        links.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault(); // 기본 동작 방지
                const targetId = link.getAttribute("href").replace("#", ""); // href에서 ID 추출
                const targetElement = document.getElementById(targetId);
    
                if (targetElement) {
                    const offset = 160; // 상단에서 160px 떨어지도록 설정
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - offset;
    
                    // GSAP ScrollToPlugin 사용
                    if (typeof gsap !== "undefined" && gsap.to) {
                        gsap.to(window, { scrollTo: offsetPosition, duration: 0 }); // 애니메이션 없이 바로 이동
                    } else {
                        // GSAP이 없을 경우 기본 스크롤 동작
                        window.scrollTo(0, offsetPosition);
                    }
                }
            });
        });
    }


    // 모달 열기 및 닫기
    function initModals() {
        const moreButtons = document.querySelectorAll(".more");
        const kinds = document.querySelectorAll(".kind");
        const modals = document.querySelectorAll(".int-modal, .modal");
        const closeButtons = document.querySelectorAll(".close");

        // .more 버튼 클릭 시 모달 열기
        moreButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const parentLi = button.closest("li");
                const modal = parentLi.querySelector(".modal");
                const overlay = parentLi.querySelector(".modal-overlay");

                modal.style.display = "block";
                overlay.style.display = "block";

                const closeModal = () => {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                };

                const closeModalButton = modal.querySelector(".modal-close");
                closeModalButton.addEventListener("click", closeModal);
                overlay.addEventListener("click", closeModal);
            });
        });

        // .kind 클릭 시 모달 열기
        kinds.forEach(kind => {
            kind.addEventListener("click", () => {
                const target = kind.getAttribute("data-modal-target");
                const modal = document.querySelector(target);
                if (modal) {
                    modal.style.display = "block";
                }
            });
        });

        // 닫기 버튼 클릭 시 모달 닫기
        closeButtons.forEach(button => {
            button.addEventListener("click", () => {
                button.closest(".int-modal, .modal").style.display = "none";
            });
        });

        // 모달 외부 클릭 시 닫기
        window.addEventListener("click", (event) => {
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        });
    }

    // Sticky 요소 처리
    function initStickyElement() {
        const stickyElement = document.querySelector(".comm-sticky");
        const peopleSection = document.getElementById("people");
        const profWrap = document.querySelector("#people .prof-wrap");
        const stickyOffset = 100;
    
        window.addEventListener("scroll", () => {
            const peopleRect = peopleSection.getBoundingClientRect();
            const stickyRect = stickyElement.getBoundingClientRect();
    
            if (peopleRect.top <= stickyOffset && peopleRect.bottom > stickyRect.height) {
                stickyElement.style.position = "fixed";
                stickyElement.style.top = `${stickyOffset}px`;
                stickyElement.style.width = "100%";
                stickyElement.style.zIndex = "1000";
                stickyElement.classList.add("fixed");
    
                // .fixed가 추가되면 #people .prof-wrap에 margin-top: 60px 추가
                if (profWrap) {
                    profWrap.style.marginTop = "60px";
                }
            } else {
                stickyElement.style.position = "relative";
                stickyElement.style.top = "unset";
                stickyElement.style.width = "auto";
                stickyElement.classList.remove("fixed");
    
                // .fixed가 제거되면 #people .prof-wrap의 margin-top 제거
                if (profWrap) {
                    profWrap.style.marginTop = "";
                }
            }
        });
    }

    // 클릭한 링크 색상 변경
    function initLinkHighlight() {
        const links = document.querySelectorAll(".s-left a");

        links.forEach(link => {
            link.addEventListener("click", () => {
                links.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            });
        });
    }

    // 스크롤 시 intro-section 처리
    function initIntroSectionScroll() {
        const introSection = document.querySelector(".intro-section");

        window.addEventListener("scroll", () => {
            const introSectionTop = introSection.getBoundingClientRect().top;
            const introSectionHeight = introSection.offsetHeight;

            if (introSectionTop <= 0 && introSectionTop > -introSectionHeight) {
                introSection.classList.add("scrolled");
            } else {
                introSection.classList.remove("scrolled");
            }
        });
    }

    // 초기화 함수 호출
    initModals();
    initStickyElement();
    initLinkHighlight();
    initIntroSectionScroll();
    initSmoothScroll(); // 새로 추가된 스크롤 초기화 함수 호출

    // 검색 필터는 외부에서 호출 가능하도록 전역으로 설정
    window.filter = filter;
});


