// ================================
// START YOUR View HERE
//
// https://developer.mozilla.org/ko/docs/Glossary/MVC
//
// ================================

// function View () {
//   this.$input = document.querySelector("input");

//   this.addEvents = addEvents.bind(this);
// }

// export default view;


// function addEvents() {
//   const $inputButton = document.querySelector("button");
//   $input.addEventListener("keypress", enter);
//   $inputButton.addEventListener("click", getInput);
// }

import controller from "./controller"
import model from './model';


const view = (function() {
  return {
    // showDate: (input) => {
    //   const year = input.getFullYear();
    //   const month = input.getMonth() + 1;
    //   const date = input.getDate();

    //   alert(`${year}년 ${month}월 ${date}일 입니다.`);
    // },

    addEvents: function() {
      const $input = document.querySelector("input");
      const $inputButton = document.querySelector("button");
      $input.addEventListener("keypress", controller.enter);
      $inputButton.addEventListener("click", controller.getInput);
    },

    createBox: function(input) {
      const $boxBoard = document.querySelector(".box-board");

      model.inputNumber[model.index] = input;
      model.$boxes[model.index] = document.createElement("div");

      const box = model.$boxes[model.index];

      $boxBoard.appendChild(box);
      box.textContent = input;
      box.classList.add("box");
      box.style.height = `${input}%`;

      model.index++;
    },
  };
})();

export default view;
