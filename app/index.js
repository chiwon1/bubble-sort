/*

 기본으로 주어진 코드는 모두 수정해도 됩니다. 다만, 수정해야 하는 이유에 대해 잘 고민해보세요.

 */

import "./controller";


const $inputButton = document.querySelector("button");

$inputButton.addEventListener("click", getInput);

function getInput(e) {
  e.preventDefault();
  let $input = document.querySelector("input").value;
  console.log($input);
}

// 1.HTML 구조만들기
// 2.HTML 입력값 JS에서 받을 수 있도록 연동
// 숫자가 담긴 그림
// 데이터 저장