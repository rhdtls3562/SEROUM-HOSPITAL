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
function updateTextSize(scale) {
  textElement.css({
    "font-size": 20 + scale * 10 + "vw", // 글자 크기 증가
    "line-height": 18 + scale * 10 + "vw", // line-height 증가
  });
  textElement.css({
    "background-size": 100 + scale * 100 + "%", // 그라데이션 배경 크기 증가
  });
}
