$(document).ready(function () {
  let isScrolling = false;

  // 스크롤 이벤트 감지
  window.addEventListener("wheel", function (e) {
    if (isScrolling) return; // 이미 스크롤 중이면 중복 방지

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
    }, 1000);
  });

  // 현재 스크롤 위치에서 다음 섹션을 찾아 반환
  function getNextSection() {
    const sections = document.querySelectorAll("section, #visual, #footer");
    let currentSectionIndex = getCurrentSectionIndex();
    return sections[currentSectionIndex + 1] || sections[sections.length - 1]; // 마지막 섹션이면 그대로 반환
  }

  // 현재 스크롤 위치에서 이전 섹션을 찾아 반환
  function getPrevSection() {
    const sections = document.querySelectorAll("section, #visual, #footer");
    let currentSectionIndex = getCurrentSectionIndex();
    return sections[currentSectionIndex - 1] || sections[0]; // 첫 번째 섹션이면 그대로 반환
  }

  // 현재 스크롤 위치가 어느 섹션에 있는지 확인
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

  // 지정한 섹션으로 부드럽게 스크롤
  function scrollToSection(section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  }
  // 1. h2 애니메이션 설정
  const $heading = $("#visual h2");

  // 0.5초 후에 'show' 클래스를 추가해 애니메이션 시작
  setTimeout(() => {
    $heading.addClass("show");

    // 2. h2 애니메이션이 끝난 후 이미지들을 순차적으로 나타나게 설정
    setTimeout(() => {
      // 이미지들을 선택
      const $images = $(".main img");

      // 각 이미지가 순차적으로 보이게 함
      $images.each(function (index) {
        setTimeout(() => {
          $(this).addClass("appear"); // appear 클래스를 추가하여 이미지 표시
        }, index * 500); // 500ms 간격으로 순차적으로 나타나게 설정
      });
    }, 1000); // h2 애니메이션이 끝난 후 1초 뒤에 이미지 애니메이션 시작
  }, 500); // 0.5초 후에 h2 애니메이션 시작

  // 3. 'point' 요소 숨김 처리 및 마우스 이벤트 설정
  $(".point").hide(); // 처음에는 모든 point 요소 숨김

  // li 요소에 마우스를 올렸을 때
  $(".con1 ul li").on("mouseenter", function () {
    // 마우스가 li 위에 올라가면 해당 point 요소만 보이게 함
    var pointClass = $(this).find(".point"); // 해당 li의 point 요소
    $(".point").not(pointClass).hide(); // 다른 point 요소들 숨김
    pointClass.show(); // 해당 point 요소만 보이게 함
  });
  var x = 0;
  setInterval(function () {
    x -= 1;
    $(".top").css("background-position", x + "px 0");
  }, 20);

  var y = 0; // 새로운 변수 y를 사용하여 bottom 요소의 방향을 조정
  setInterval(function () {
    y += 1; // y는 1씩 증가시켜서 반대 방향으로 이동하게 설정
    $(".bottom").css("background-position", y + "px 0");
  }, 20);

  var con5 = $(".con5"); // con5 섹션
  var textElement = $(".con5 h2"); // 텍스트 요소

  var updateTextSize = function (scale) {
    // 글자 크기를 스크롤에 따라 키웁니다.
    textElement.css({
      "font-size": 20 + scale * 10 + "vw", // 스크롤에 따라 글자 크기 증가
      "line-height": 18 + scale * 10 + "vw", // line-height도 증가
    });

    // 그라데이션 배경을 글자 크기에 맞춰 키우기
    textElement.css({
      "background-size": 100 + scale * 100 + "%", // 그라데이션 배경 크기 조정
    });
  };

  $(window).scroll(function () {
    var scrollPosition = $(document).scrollTop();
    var con5Offset = con5.offset().top; // con5 섹션의 위치

    // con5 섹션이 화면에 들어올 때만 활성화
    if (
      scrollPosition + $(window).height() > con5Offset &&
      scrollPosition < con5Offset + con5.height()
    ) {
      var scale = (scrollPosition - con5Offset) / con5.height(); // 스크롤 비율

      // scale이 0.67(2/3)을 넘지 않도록 제한
      if (scale > 0.67) {
        scale = 0.67; // 2/3 지점에서 더 이상 커지지 않게 설정
      }

      updateTextSize(scale);

      // con5 섹션이 꽉 찼을 때 다음 섹션으로 넘어가도록 하기
    }
  });
});
