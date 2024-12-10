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
const con5 = $(".con3");
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
  const con5 = $(".con3"); // .con5 참조
  const textElement = $(".con3 h2"); // .con5 h2 참조
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
    // .con2_menu li 클릭 시 .all의 스타일 변경
    $(".con2_menu li").click(function () {
      // 클릭된 li의 인덱스를 기억
      var index = $(this).index();

      // 다른 li 클릭시 반응
      $(".con2_menu li").removeClass("selected"); // 모든 li에서 'selected' 클래스 제거
      $(this).addClass("selected"); // 클릭된 li에 'selected' 클래스 추가
    });
  });
  $(document).ready(function () {
    $(".img_direction li").click(function () {
      $(".img_direction li").css({ background: "#555", color: "#fff" }); // 초기화
      $(this).css({ background: "lightsalmon", color: "#000" }); // 클릭된 항목 스타일 변경
    });
  });
});
