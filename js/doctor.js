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
    // #visual, .con1, .con2 섹션이 아닐 경우에만 스크롤을 적용
    if (
      section.id === "visual" ||
      section.classList.contains("con1") ||
      section.classList.contains("con2")
    ) {
      return; // #visual, .con1, .con2는 스크롤하지 않음
    }
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
  const con4 = $(".con4");
  const textElement = $(".con4 h2");

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
    const con4Offset = con4.offset().top;

    if (
      scrollPosition + $(window).height() > con4Offset &&
      scrollPosition < con4Offset + con4.height()
    ) {
      let scale = (scrollPosition - con4Offset) / con4.height();
      if (scale > 0.67) scale = 0.67; // 2/3 지점 이후 커지지 않도록 제한
      updateTextSize(scale);
    }
  });
  $(document).ready(function () {
    const $con1 = $(".con1"); // .con1 섹션
    const $flipCard = $(".flip-card"); // 뒤집힐 카드

    // 윈도우 스크롤 이벤트
    $(window).on("scroll", function () {
      const con1Top = $con1.offset().top; // .con1의 상단 위치
      const con1Bottom = con1Top + $con1.outerHeight(); // .con1의 하단 위치
      const scrollTop = $(window).scrollTop(); // 현재 스크롤 위치
      const windowHeight = $(window).height(); // 윈도우 높이

      // .con1 섹션이 화면에 보일 때마다
      if (scrollTop + windowHeight > con1Top && scrollTop < con1Bottom) {
        // hover 상태 강제 추가
        $flipCard.addClass("hover"); // 강제로 hover 클래스를 추가

        // 1.5초 후 hover 상태 해제
        setTimeout(function () {
          $flipCard.removeClass("hover"); // hover 클래스 제거
        }, 1000);
      }
    });
  });
  $(document).ready(function () {
    // 스크롤 트리거 효과 함수
    function checkScroll() {
      var scrollTop = $(window).scrollTop(); // 스크롤 위치 가져오기
      var windowHeight = $(window).height(); // 화면 높이

      // 각 요소에 대해 스크롤 위치를 확인하고 색상을 채움
      $(".trigger").each(function () {
        var elementTop = $(this).offset().top; // 각 요소의 위쪽 위치
        var elementBottom = elementTop + $(this).outerHeight(); // 각 요소의 아래쪽 위치

        // 요소가 화면에 들어오면 색상을 원래 색으로 채우기
        if (
          scrollTop + windowHeight > elementTop &&
          scrollTop < elementBottom
        ) {
          $(this).addClass("filled");
        } else {
          $(this).removeClass("filled");
        }
      });
    }

    // 스크롤 시 checkScroll 함수 호출
    $(window).on("scroll", checkScroll);

    // 페이지 로드 시 처음 한 번 실행
    checkScroll();
  });
});
