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

$(window).scroll(function () {
  const con5 = $(".con3"); // .con5 참조
  const textElement = $(".con3 h2"); // .con5 h2 참조
  const scrollPosition = $(document).scrollTop();
  const con5Offset = con5.offset().top;

  if (
    scrollPosition + $(window).height() > con5Offset &&
    scrollPosition < con5Offset + con5.height()
  ) {
    let scale = (scrollPosition - con5Offset) / con5.height();
    if (scale > 0) scale = 0.3; // 2/3 지점 이후 커지지 않도록 제한
    updateTextSize(scale);
  }

  // 5. con5 섹션 글자 크기와 배경 크기 스크롤에 맞춰 변화
  function updateTextSize(scale) {
    textElement.css({
      "font-size": 20 + scale * 5 + "vw", // 글자 크기 증가
      "line-height": 18 + scale * 10 + "vw", // line-height 증가
    });
    textElement.css({
      "background-size": 100 + scale * 50 + "%", // 그라데이션 배경 크기 증가
    });
  }
});
$(document).ready(function () {
  $(".img_direction li").click(function () {
    $(".img_direction li").css({ background: "#555", color: "#fff" }); // 초기화
    $(this).css({ background: "lightsalmon", color: "#000" }); // 클릭된 항목 스타일 변경
  });
});
$(window).on("scroll", function () {
  var scrollPosition = $(window).scrollTop(); // 현재 스크롤 위치
  var windowHeight = $(window).height(); // 화면 높이

  // .con1 섹션에 도달했을 때 애니메이션 실행
  var con1Top = $(".con1").offset().top; // .con1의 top 위치
  if (scrollPosition + windowHeight > con1Top) {
    $(".con1").css("animation-play-state", "running"); // li 애니메이션 시작
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const con2 = document.querySelector(".con2"); // 해당 섹션
  const elements = document.querySelectorAll(".con2 *"); // 자식 요소들

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("visible");
            }, index * 200); // 300ms 간격으로 요소가 나타남
          });
          observer.disconnect(); // 한 번 실행 후 중단
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(con2);
  $(window).scroll(function () {
    const scrollPosition = $(document).scrollTop();
    const con4Offset = $(".con4").offset().top;
    const con4Height = $(".con4").height();

    // con4 섹션이 화면에 들어오면 li 요소들이 하나씩 나타나도록 설정
    if (
      scrollPosition + $(window).height() > con4Offset &&
      scrollPosition < con4Offset + con4Height
    ) {
      $(".con4 ul li").each(function (index) {
        const liOffset = $(this).offset().top;
        const liHeight = $(this).height();

        // li 요소가 화면에 들어왔을 때 애니메이션 효과 적용
        if (scrollPosition + $(window).height() > liOffset + liHeight / 2) {
          $(this).addClass("visible");
        }
      });
    }
  });
});
