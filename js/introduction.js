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
    $(".con3_ul2 li:nth-child(2)").hover(
      function () {
        // hover가 시작될 때, 첫 번째 li의 h2와 h6 요소를 1.1배로 키움
        $(this).siblings("li:nth-child(1)").find("h2, h6").css({
          transform: "scale(1.3)", // 크기 증가
          transition: "transform 0.5s ease", // 부드러운 애니메이션
        });
      },
      function () {
        // hover가 끝날 때, 첫 번째 li의 h2와 h6 요소를 원래 크기로 돌림
        $(this).siblings("li:nth-child(1)").find("h2, h6").css({
          transform: "scale(1)", // 크기 원래대로
        });
      }
    );
  });
  $(document).ready(function () {
    $(".con3_ul2 li:nth-child(4)").hover(
      function () {
        // hover가 시작될 때, 첫 번째 li의 h2와 h6 요소를 1.1배로 키움
        $(this).siblings("li:nth-child(3)").find("h2, h6").css({
          transform: "scale(1.3)", // 크기 증가
          transition: "transform 0.5s ease", // 부드러운 애니메이션
        });
      },
      function () {
        // hover가 끝날 때, 첫 번째 li의 h2와 h6 요소를 원래 크기로 돌림
        $(this).siblings("li:nth-child(3)").find("h2, h6").css({
          transform: "scale(1)", // 크기 원래대로
        });
      }
    );
  });
  $(document).ready(function () {
    $(".con3_ul3 li:nth-child(1)").hover(
      function () {
        // hover가 시작될 때, 첫 번째 li의 h2와 h6 요소를 1.1배로 키움
        $(this).siblings("li:nth-child(2)").find("h2, h6").css({
          transform: "scale(1.3)", // 크기 증가
          transition: "transform 0.5s ease", // 부드러운 애니메이션
        });
      },
      function () {
        // hover가 끝날 때, 첫 번째 li의 h2와 h6 요소를 원래 크기로 돌림
        $(this).siblings("li:nth-child(2)").find("h2, h6").css({
          transform: "scale(1)", // 크기 원래대로
        });
      }
    );
  });
  $(document).ready(function () {
    $(".con3_ul3 li:nth-child(3)").hover(
      function () {
        // hover가 시작될 때, 첫 번째 li의 h2와 h6 요소를 1.1배로 키움
        $(this).siblings("li:nth-child(4)").find("h2, h6").css({
          transform: "scale(1.3)", // 크기 증가
          transition: "transform 0.5s ease", // 부드러운 애니메이션
        });
      },
      function () {
        // hover가 끝날 때, 첫 번째 li의 h2와 h6 요소를 원래 크기로 돌림
        $(this).siblings("li:nth-child(4)").find("h2, h6").css({
          transform: "scale(1)", // 크기 원래대로
        });
      }
    );
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
  function slidesPlugin() {
    const slides = document.querySelectorAll(".slide");

    // 처음에 모든 슬라이드를 접힌 상태로 설정
    slides.forEach((slide) => {
      slide.classList.remove("active", "active2"); // 모든 슬라이드에서 'active'와 'active2' 클래스 제거
    });

    // 클릭 이벤트 추가
    for (const slide of slides) {
      slide.addEventListener("click", () => {
        // 이미 active가 있는 슬라이드를 클릭하면 active2로 변경하고, active는 제거
        if (slide.classList.contains("active")) {
          slide.classList.remove("active");
          slide.classList.add("active2");
        } else {
          // active2가 있으면 active로 변경하고, active2는 제거
          slide.classList.remove("active2");
          slide.classList.add("active");
        }

        // 클릭 시 다른 슬라이드에서 'active'와 'active2' 클래스 제거
        slides.forEach((s) => {
          if (s !== slide) {
            s.classList.remove("active", "active2");
          }
        });
      });
    }
  }

  slidesPlugin();
});
