/*

 기본으로 주어진 코드는 모두 수정해도 됩니다. 다만, 수정해야 하는 이유에 대해 잘 고민해보세요.

 */

import model from "./model";
import view from "./view";
import "./controller";

// const model.$boxes = [];
// let model.index = 0;

// function addEvents () {
//   const $input = document.querySelector("input");
//   const $inputButton = document.querySelector("button");
//   $input.addEventListener("keypress", enter);
//   $inputButton.addEventListener("click", getInput);
// }

view.addEvents();

// const model.inputNumber = [];


// function getInput() {
//   const $input = document.querySelector("input");

//   const input = Number($input.value);
//   $input.value = '';

//   if (input > 100 || input < 1 || input.length === 0) {
//     console.log("wrong number");
//     return;
//   }

//   if (index > 9) {
//     console.log("Maximum number of input is 10");
//     return;
//   }

//   createBox(input);

// }


// function createBox(input) {
//   const $boxBoard = document.querySelector(".box-board");

//   model.inputNumber[index] = input;
//   $boxes[index] = document.createElement("div");

//   const box = $boxes[index];

//   $boxBoard.appendChild(box);
//   box.textContent = input;
//   box.classList.add("box");
//   box.style.height = `${input}%`;

//   index++;
// }

// function enter(event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     getInput();
//   }
// }


const $sortButton = document.querySelector(".sort-button");

$sortButton.addEventListener("click", sort);

function sort() {
  bubbleSort(model.inputNumber);

  async function bubbleSort(items) {
    const length = items.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (items[j] > items[j + 1]) {
          const temp = items[j];
          items[j] = items[j + 1];
          items[j + 1] = temp;

          await swap();

          function swap() {
            return new Promise(function(resolve, reject) {
              setTimeout(function() {
                for (let k = 0; k < length - i; k++) {
                  model.$boxes[k].classList.remove("comparing");
                }

                model.$boxes[j].classList.add("comparing");
                model.$boxes[j + 1].classList.add("comparing");

                const temp = model.$boxes[j].textContent;

                model.$boxes[j].textContent = model.$boxes[j + 1].textContent;
                model.$boxes[j + 1].textContent = temp;

                model.$boxes[j].style.height = `${model.$boxes[j].textContent}%`;
                model.$boxes[j + 1].style.height = `${model.$boxes[j + 1].textContent}%`;

                resolve();
              }, 200);
            });
          }
        }
      }

      model.$boxes[length - i - 1].classList.add("sorted");
    }
  }
}
