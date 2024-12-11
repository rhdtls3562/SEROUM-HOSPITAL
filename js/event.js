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

    // 스크롤이 끝난 후 0.5초 뒤에 다시 스크롤 가능
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

  // 스크롤 버튼 애니메이션
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".go-top").fadeIn(200);
    } else {
      $(".go-top").fadeOut(200);
    }
  });

  $(".go-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  // 메뉴 버튼 클릭
  $(".menu-button").click(function () {
    $(".side-menu").toggleClass("open");
    $(".overlay2").toggleClass("open");
  });

  $(".overlay2").click(function () {
    $(".side-menu").removeClass("open");
    $(".overlay2").removeClass("open");
  });

  // 아이콘 클릭 애니메이션
  $("#nav-icon2").click(function () {
    $(this).toggleClass("open");
  });

  // 배경 이동 애니메이션 (top, bottom)
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

  // con5 섹션 글자 크기와 배경 크기 스크롤에 맞춰 변화
  const con5 = $(".con5");
  const textElement = $(".con5 h2");

  function updateTextSize(scale) {
    textElement.css({
      "font-size": 20 + scale * 10 + "vw", // 글자 크기 증가
      "line-height": 18 + scale * 10 + "vw", // line-height 증가
      "background-size": 100 + scale * 100 + "%", // 배경 크기 증가
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
      scale = Math.min(scale, 0.67); // 2/3 지점 이후 커지지 않도록 제한
      updateTextSize(scale);
    }
  });

  // con1~con6 애니메이션 실행
  $(window).on("scroll", function () {
    const scrollPosition = $(window).scrollTop();
    const windowHeight = $(window).height();

    function triggerAnimation(section, elements) {
      const sectionTop = $(section).offset().top;
      if (scrollPosition + windowHeight > sectionTop) {
        $(elements).css("animation-play-state", "running");
      }
    }

    triggerAnimation(
      ".con1",
      ".con1 h2, .con1 p, .con1 ul li:nth-child(3), .con1 ul li:nth-child(1)"
    );
    triggerAnimation(
      ".con2",
      ".con2 h2, .con2 p, .con2 .check, .con2_model, .point1, .point2, .point3, .st0"
    );
    triggerAnimation(".con3", ".con3 h2, .con3 h5");
    triggerAnimation(
      ".con6",
      ".con6 h2, .con6 h4, .con6 p, .line, .first, .last"
    );
  });

  // 초기 애니메이션 실행
  setTimeout(function () {
    $(".con1 span").addClass("show-background");
  }, 500);
});
