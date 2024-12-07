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
      $(".overlay2").toggleClass("open"); // 오버레이 열기/닫기
    });

    $(".overlay2").click(function () {
      $(".side-menu").removeClass("open"); // 메뉴 닫기
      $(".overlay2").removeClass("open"); // 오버레이 닫기
    });
  });
  $(document).ready(function () {
    $("#nav-icon2").click(function () {
      $(this).toggleClass("open");
    });
  });

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
    const con5 = $(".con5"); // .con5 참조
    const textElement = $(".con5 h2"); // .con5 h2 참조
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

    // 5. con5 섹션 글자 크기와 배경 크기 스크롤에 맞춰 변화
    function updateTextSize(scale) {
      textElement.css({
        "font-size": 20 + scale * 10 + "vw", // 글자 크기 증가
        "line-height": 18 + scale * 10 + "vw", // line-height 증가
      });
      textElement.css({
        "background-size": 100 + scale * 100 + "%", // 그라데이션 배경 크기 증가
      });
    }
    $(document).ready(function () {
      // 다른 애니메이션들이 끝난 후 2초 뒤에 배경 애니메이션을 시작하도록 설정
      setTimeout(function () {
        $(".con1 span").addClass("show-background");
      }, 500); // 2초 후에 배경 애니메이션 시작
    });
    $(document).ready(function () {
      // 스크롤 이벤트
      $(window).on("scroll", function () {
        var scrollPosition = $(window).scrollTop(); // 현재 스크롤 위치
        var windowHeight = $(window).height(); // 화면 높이

        // .con1 섹션에 도달했을 때 애니메이션 실행
        var con1Top = $(".con1").offset().top; // .con1의 top 위치
        if (scrollPosition + windowHeight > con1Top) {
          $(".con1 h2").css("animation-play-state", "running"); // h2 애니메이션 시작
          $(".con1 p").css("animation-play-state", "running"); // p 애니메이션 시작
          $(".con1 ul li:nth-child(3)").css("animation-play-state", "running"); // li 애니메이션 시작
          $(".con1 ul li:nth-child(1)").css("animation-play-state", "running"); // li 애니메이션 시작
        }

        var con1Top = $(".con2").offset().top; // .con1의 top 위치
        if (scrollPosition + windowHeight > con1Top) {
          $(
            ".con2 h2, .con2 p, .con2 .check, .con2_model, .point1, .point2, .point3, .st0 "
          ).css("animation-play-state", "running");
        }
        var con1Top = $(".con3").offset().top; // .con1의 top 위치
        if (scrollPosition + windowHeight > con1Top) {
          $(".con3 h2, .con3 h5").css("animation-play-state", "running");
        }
        var con1Top = $(".con6").offset().top; // .con1의 top 위치
        if (scrollPosition + windowHeight > con1Top) {
          $(".con6 h2, .con6 h4, .con6 p, .line, .first, .last").css(
            "animation-play-state",
            "running"
          );
        }
      });
    });
  });
});
