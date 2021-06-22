/*

 기본으로 주어진 코드는 모두 수정해도 됩니다. 다만, 수정해야 하는 이유에 대해 잘 고민해보세요.

 */

import { max } from 'lodash';
import "./controller";

const inputNumber = [];
const $boxes = [];
const $boxBoard = document.querySelector(".box-board");
let index = 0;

function input() {
  const $input = document.querySelector("input");
  const $inputButton = document.querySelector("button");

  $input.addEventListener("keypress", enter);
  $inputButton.addEventListener("click", getInput
  );

  function getInput() {
    const input = $input.value;
    $input.value = '';

    if (input > 99 || input < 0 || input.length === 0) {
      console.log("wrong number");
      return;
    }

    if (index > 9) {
      console.log("Maximum number of input is 10");
      return;
    }

    function createBox(input) {
      inputNumber[index] = input;
      $boxes[index] = document.createElement("div");

      const box = $boxes[index];

      $boxBoard.appendChild(box);
      box.textContent = input;
      box.classList.add("box");
      box.style.height = `${input}%`;

      index++;
    }

    createBox(input);
  }

  function enter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getInput();
    }
  }
}

input();

const $sortButton = document.querySelector(".sort-button");

$sortButton.addEventListener("click", sort);

function sort() {
  bubbleSort(inputNumber);

  async function bubbleSort(items) {
    const length = items.length;
    let indexOfThesorted = items.length - 1;

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
                for (let k = 0; k < $boxes.length; k++) {
                  $boxes[k].classList.remove("comparing");
                }

                $boxes[j].classList.add("comparing");
                $boxes[j + 1].classList.add("comparing");

                const temp = $boxes[j].textContent;
                $boxes[j].textContent = $boxes[j + 1].textContent;
                $boxes[j + 1].textContent = temp;
                $boxes[j].style.height = `${$boxes[j].textContent}%`;
                $boxes[j + 1].style.height = `${$boxes[j + 1].textContent}%`;

                resolve();
              }, 200);
            });
          }
        }
      }
    }

    for (let i = 0; i < $boxes.length; i++) {
      $boxes[i].classList.remove("comparing");
    }
  }
}
