// ================================
// START YOUR Model HERE
//
// https://developer.mozilla.org/ko/docs/Glossary/MVC
//
// ================================

const model = (function () {
  const queue = [];

  return {
    addTask: (task) => {},
    getCurrentTask: () => {},
  };
})();

export default model;


const $input = document.querySelector("input");
const $inputButton = document.querySelector("button");

$inputButton.addEventListener("click", function () {
  foo();
});

let inputNumber = 0;

async function foo() {
  console.log("awaiting for click");

  await click();

  console.log("clicked");


}

function click() {
  return new Promise(function(resolve, reject) {

  });
}


event.preventDefault();
inputNumber = $input.value.split('');




// 1. HTML 구조만들기 (박스 10개)
// 2. HTML 입력값 JS에서 받을 수 있도록 연동
// 3. 입력받은 값을 배열화하여 숫자박스에 넣기 (innerText)
// 4. bubbleSort() 함수 이용하여 계산하며 과정을 html에 반영