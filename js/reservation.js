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
  const con3 = $(".con3");
  const textElement = $(".con3 h2");

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
    const con3Offset = con3.offset().top;

    if (
      scrollPosition + $(window).height() > con3Offset &&
      scrollPosition < con3Offset + con3.height()
    ) {
      let scale = (scrollPosition - con3Offset) / con3.height();
      if (scale > 0.67) scale = 0.67; // 2/3 지점 이후 커지지 않도록 제한
      updateTextSize(scale);
    }
  });

  function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, ""); // 숫자만 남기기
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,})/, "($1) $2");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,})/, "($1) $2-$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,})/, "($1) $2");
    }
    input.value = value;
  }
  $(document).ready(function () {
    // 처음 .one에 강제로 호버 상태 적용
    $(".one").addClass("hovered");

    // 다른 li 클릭 시 .one의 호버 상태 해제
    $(".num li").click(function () {
      if (!$(this).hasClass("one")) {
        $(".one").removeClass("hovered");
      } else {
        // 클릭된 li가 .one이면 호버 상태 유지
        $(".one").addClass("hovered");
      }
    });
    $(document).ready(function () {
      // 스크롤 이벤트
      $(window).scroll(function () {
        // 각 섹션에 대해
        $(".con1, .con2, .con4").each(function () {
          var section = $(this);
          var sectionTop = section.offset().top; // 섹션의 상단 위치
          var sectionHeight = section.outerHeight(); // 섹션의 높이
          var windowScroll = $(window).scrollTop(); // 현재 스크롤 위치
          var windowHeight = $(window).height(); // 창의 높이

          // 섹션이 화면에 보일 때만 애니메이션 실행
          if (
            windowScroll + windowHeight >= sectionTop &&
            windowScroll <= sectionTop + sectionHeight
          ) {
            // 해당 섹션 내의 자식 요소들에 대해 순차적으로 나타나게 설정
            section.find("*").each(function (index) {
              var element = $(this);

              // 이미 visible 클래스가 있으면 실행되지 않도록 방지
              if (
                !element.hasClass("visible") &&
                !element.hasClass("visible2") &&
                !element.hasClass("visible3")
              ) {
                var className =
                  "visible" +
                  (section.hasClass("con1")
                    ? ""
                    : section.hasClass("con2")
                    ? "2"
                    : "3");
                setTimeout(function () {
                  element.addClass(className);
                }, index * 100); // 150ms 간격으로 나타나도록 설정
              }
            });
          }
        });
      });
    });
  });
});
