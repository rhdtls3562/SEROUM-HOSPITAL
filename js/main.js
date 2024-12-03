$(document).ready(function () {
  let isScrolling = false;

  // 1. 스크롤 이벤트 감지
  window.addEventListener("wheel", function (e) {
    if (isScrolling) return; // 중복 스크롤 방지
    isScrolling = true;

    if (e.deltaY > 0) {
      // 아래로 스크롤 시
      let nextSection = getNextSection();
      scrollToSection(nextSection);
    } else {
      // 위로 스크롤 시
      let prevSection = getPrevSection();
      scrollToSection(prevSection);
    }

    // 스크롤이 끝난 후 1초 뒤에 다시 스크롤 가능
    setTimeout(() => {
      isScrolling = false;
    }, 500);
  });

  // 현재 섹션의 인덱스를 반환
  function getCurrentSectionIndex() {
    const sections = document.querySelectorAll("section, #visual, #footer");
    let scrollPosition = window.scrollY;
    let currentSectionIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollPosition) {
        currentSectionIndex = i;
      }
    }
    return currentSectionIndex;
  }

  // 다음 섹션으로 이동
  function getNextSection() {
    const sections = document.querySelectorAll("section, #visual, #footer");
    let currentSectionIndex = getCurrentSectionIndex();
    return sections[currentSectionIndex + 1] || sections[sections.length - 1];
  }

  // 이전 섹션으로 이동
  function getPrevSection() {
    const sections = document.querySelectorAll("section, #visual, #footer");
    let currentSectionIndex = getCurrentSectionIndex();
    return sections[currentSectionIndex - 1] || sections[0];
  }

  // 부드럽게 스크롤
  function scrollToSection(section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  }

  // 2. h2 애니메이션
  const $heading = $("#visual h2");
  setTimeout(() => {
    $heading.addClass("show");

    // h2 애니메이션 후 이미지 순차적으로 나타나기
    setTimeout(() => {
      const $images = $(".main img");
      $images.each(function (index) {
        setTimeout(() => {
          $(this).addClass("appear");
        }, index * 500); // 500ms 간격으로 이미지 표시
      });
    }, 1000); // h2 애니메이션이 끝난 후 1초 뒤 이미지 애니메이션 시작
  }, 500); // 0.5초 후에 h2 애니메이션 시작

  // 3. point 요소 마우스 이벤트 설정
  $(".point").hide(); // 처음에는 point 숨기기
  $(".con1 ul li").on("mouseenter", function () {
    const pointClass = $(this).find(".point");
    $(".point").not(pointClass).hide(); // 다른 point 숨기기
    pointClass.show(); // 해당 point만 보이게 하기
  });

  // 4. 배경 이동 애니메이션 (top, bottom)
  let x = 0;
  setInterval(() => {
    x -= 1;
    $(".top").css("background-position", x + "px 0");
  }, 20);

  let y = 0;
  setInterval(() => {
    y += 1;
    $(".bottom").css("background-position", y + "px 0");
  }, 20);

  // 5. con5 섹션 글자 크기와 배경 크기 스크롤에 맞춰 변화
  const con5 = $(".con5");
  const textElement = $(".con5 h2");

  function updateTextSize(scale) {
    textElement.css({
      "font-size": 20 + scale * 10 + "vw", // 글자 크기 증가
      "line-height": 18 + scale * 10 + "vw", // line-height 증가
    });
    textElement.css({
      "background-size": 100 + scale * 100 + "%", // 그라데이션 배경 크기 증가
    });
  }

  $(window).scroll(function () {
    const scrollPosition = $(document).scrollTop();
    const con5Offset = con5.offset().top;

    if (
      scrollPosition + $(window).height() > con5Offset &&
      scrollPosition < con5Offset + con5.height()
    ) {
      let scale = (scrollPosition - con5Offset) / con5.height();
      if (scale > 0.67) scale = 0.67; // 2/3 지점 이후 커지지 않도록 제한
      updateTextSize(scale);
    }
  });

  // 6. 자동 호버 효과 적용 (view 섹션 내)
  const liItems = $(".view li");
  let currentIndex = 0;
  let isInView = false;
  let hoverInterval;

  function startHoverEffect() {
    if (!isInView) return; // 뷰포트에 없으면 실행하지 않음
    liItems.removeClass("hovered");
    const currentItem = liItems.eq(currentIndex);
    currentItem.addClass("hovered");
    currentItem.trigger("mouseenter");
    currentIndex = (currentIndex + 1) % liItems.length;
  }

  function checkInView() {
    const section = $(".view");
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const sectionTop = section.offset().top;
    const sectionBottom = sectionTop + section.outerHeight();

    isInView =
      scrollTop + windowHeight > sectionTop && scrollTop < sectionBottom;

    if (isInView && !hoverInterval) {
      hoverInterval = setInterval(startHoverEffect, 1000);
    } else if (!isInView && hoverInterval) {
      clearInterval(hoverInterval);
      hoverInterval = null;
    }
  }

  $(window).on("scroll", checkInView);
  checkInView();

  // 7. con3 애니메이션
  let isAnimated = false;
  function checkInViewCon3() {
    const section = $(".con3");
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const sectionTop = section.offset().top;
    const sectionBottom = sectionTop + section.outerHeight();

    if (
      scrollTop + windowHeight > sectionTop &&
      scrollTop < sectionBottom &&
      !isAnimated
    ) {
      section.addClass("visible");
      isAnimated = true;
    }
  }

  $(window).on("scroll", checkInViewCon3);
  checkInViewCon3();

  // 8. 예약 섹션 호버 효과
  let hoverIntervalReservation;
  let isInViewReservation = false;

  function triggerHoverEffectReservation() {
    if (!isInViewReservation) return;
    const reservation = $(".reservation");
    reservation.addClass("hovered");

    setTimeout(() => {
      reservation.removeClass("hovered");
    }, 500);
  }

  function checkInViewReservation() {
    const reservation = $(".reservation");
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const sectionTop = reservation.offset().top;
    const sectionBottom = sectionTop + reservation.outerHeight();

    isInViewReservation =
      scrollTop + windowHeight > sectionTop && scrollTop < sectionBottom;

    if (isInViewReservation && !hoverIntervalReservation) {
      hoverIntervalReservation = setInterval(
        triggerHoverEffectReservation,
        2000
      );
    } else if (!isInViewReservation && hoverIntervalReservation) {
      clearInterval(hoverIntervalReservation);
      hoverIntervalReservation = null;
    }
  }

  $(window).on("scroll", checkInViewReservation);
  checkInViewReservation();

  $(document).ready(function () {
    let isAnimated = false;

    function checkInViewCon4() {
      const section = $(".con4");
      const windowHeight = $(window).height();
      const scrollTop = $(window).scrollTop();
      const sectionTop = section.offset().top;
      const sectionBottom = sectionTop + section.outerHeight();

      // con4가 화면에 보이면 애니메이션 시작
      if (
        scrollTop + windowHeight > sectionTop &&
        scrollTop < sectionBottom &&
        !isAnimated
      ) {
        $(".con4 h2").addClass("showElement");
        $(".con4 p").addClass("showElement");
        isAnimated = true; // 한번만 애니메이션이 실행되도록 설정
      }
    }

    $(window).on("scroll", checkInViewCon4);
    checkInViewCon4(); // 페이지 로드 시 한번 실행
  });
  // 각 요소를 순차적으로 등장하게 하기 위한 지연 시간 (ms)
  const delayInterval = 100; // 0.2초 간격으로 순차적으로 나타나게 설정

  // 스크롤 시 .fadeInUp 클래스 추가
  window.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(
      '.con6_wrap h2, .con6_wrap2, .form-list, .form-item, input[type="text"], input[type="email"], select, textarea, label, .how_to_come h2, .how_to_come p, .how_to_come h5, .con6 h3, .day, .day_day h3, .time h3, .gradient-button,.come'
    );

    elements.forEach(function (element, index) {
      if (isElementInViewport(element)) {
        setTimeout(() => {
          element.classList.add("fadeInUp");
        }, delayInterval * index); // 각 요소마다 순차적으로 지연 시간 추가
      }
    });
  });

  // 요소가 화면에 보이는지 확인하는 함수
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  $(document).ready(function () {
    // Show or hide the sticky footer button
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        $(".go-top").fadeIn(200);
      } else {
        $(".go-top").fadeOut(200);
      }
    });

    // Animate the scroll to top
    $(".go-top").click(function (event) {
      event.preventDefault();

      $("html, body").animate({ scrollTop: 0 }, 300);
    });
  });
  $(document).ready(function () {
    $(".menu-button").click(function () {
      $(".side-menu").toggleClass("open"); // 사이드 메뉴 열기/닫기
      $(".overlay").toggleClass("open"); // 오버레이 열기/닫기
    });

    $(".overlay").click(function () {
      $(".side-menu").removeClass("open"); // 메뉴 닫기
      $(".overlay").removeClass("open"); // 오버레이 닫기
    });
  });
  $(document).ready(function () {
    $("#nav-icon2").click(function () {
      $(this).toggleClass("open");
    });
  });
});
