$(function () {
  // 대상을 변수에 저장
  const $window = $(window);
  const $objWrap = $('.obj-wrap');
  const $obj1 = $objWrap.find('.obj1');
  const $obj2 = $objWrap.find('.obj2');
  const $obj3 = $objWrap.find('.obj3');
  const $obj4 = $objWrap.find('.obj4');

  // 마우스의 좌표값
  let x = 0;
  let y = 0;

  // 보정되는 마우스 좌표값
  let mx = 0;
  let my = 0;
  let speed = 0.008;

  // 함수를 3개 만들기
  // 1. 마우스 좌표값 받아오는 함수
  // 2.오브젝트를 움직이게 하는 함수
  // 3.1번과 2번을 실행시키는 함수

  // 마우스가 움직일 때 좌표값 받아오기
  $window.on('mousemove', function (e) {
    // 마우스 좌표의 시작지점을 화면의 정중아으로 이동
    // 마우스가 중앙에 있을 걸 고려하여 그만큼 빨강원의 거리를 더 띄워주기
    x = e.pageX - $window.outerWidth() / 2;
    y = e.pageY - $window.outerHeight() / 2;
  });

  let movingObj;
  moving();

  // 마우스의 기본 좌표값을 기준으로 어떤 값을 만들어 내자
  function moving() {
    // A += B ---> A = A + B
    mx += (x - mx) * speed;
    my += (y - my) * speed;

    // 오브젝트에 좌표값 적용
    $obj1.css({
      transform: `translate(${mx}px,${my}px) rotate(${my}deg)`,
    });
    $obj2.css({
      transform: `translate3d(${-mx}px,${-my}px,${mx}px)`,
    });
    $obj3.css({
      transform: `translate3d(${-mx * 0.5}px,${my * 0.7}px,${mx * 0.05}px) rotateY(${mx}deg)`,
    });
    $obj4.css({
      transform: `translate3d(${mx / 0.5}px,${-my / 0.7}px,${-mx / 0.05}px)`,
      filter: `blur(${mx * 0.05}px)`,
    });

    // 부드럽게 반복
    movingObj = requestAnimationFrame(moving); /* 재귀함수 */
  }

  $objWrap.on('click', function () {
    cancelAnimationFrame(movingObj);
    setTimeout(moving, 2000);
  });
});
