// ================================
// START YOUR View HERE
//
// https://developer.mozilla.org/ko/docs/Glossary/MVC
//
// ================================


import { max } from 'lodash';
import controller from "./controller"
import model from './model';


const view = (function() {
  const $boxBoard = document.querySelector(".box-board");
  const EFFECT_TIME = 200;
  const FINISH_EFFECT_TIME = 100;
  const MAX_PX = 450;
  const $input = document.querySelector("input");
  const $inputButton = document.querySelector("button");
  const $sortButton = document.querySelector(".sort-button");

  return {
    addEvents: function() {
      $input.addEventListener("keypress", controller.enter);
      $inputButton.addEventListener("click", controller.getInput);
      $sortButton.addEventListener("click", controller.sort);
    },

    createBox: function(input) {
      model.inputNumber[model.index] = input;
      model.$boxes[model.index] = document.createElement("div");

      const box = model.$boxes[model.index];

      $boxBoard.appendChild(box);
      box.textContent = input;
      box.classList.add("box");

      view.adjustHeight();

      model.index++;
    },

    hideButtons: function() {
      $input.classList.add("hide");
      $inputButton.classList.add("hide");
      $sortButton.classList.add("hide");
    },

    unhideButtons: function() {
      $input.classList.remove("hide");
      $inputButton.classList.remove("hide");
      $sortButton.classList.remove("hide");
    },

    adjustHeight: function() {
      for (let i = 0; i < model.inputNumber.length; i++) {
        const box = model.$boxes;
        const value = Number(box[i].textContent);
        const div = box[i];
        const maxInput = Math.max(...model.inputNumber);

        div.style.height = `${MAX_PX * value / maxInput }px`;
      }

    },

    swap: function(a, b, length, i) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          view.colorThingsToBeCompared(a, b, length, i);

          const temp = model.$boxes[a].textContent;
          model.$boxes[a].textContent = model.$boxes[b].textContent;
          model.$boxes[b].textContent = temp;

          view.adjustHeight();

          resolve();
        }, EFFECT_TIME);
      });
    },

    noSwap: function(a, b, length, i) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          view.colorThingsToBeCompared(a, b, length, i);

          resolve();
        }, EFFECT_TIME);
      });
    },

    colorTheSorted: function(length, i) {
      model.$boxes[length - i - 1].classList.add("sorted");
    },

    colorThingsToBeCompared: function(a, b, length, i) {
      for (let j = 0; j < length - i; j++) {
        model.$boxes[j].classList.remove("comparing");
      }

      model.$boxes[a].classList.add("comparing");
      model.$boxes[b].classList.add("comparing");
    },


    finishingEffect: async function() {
      const length = model.$boxes.length;
      const box = model.$boxes;

      for (let i = 0; i < length; i++) {
        await finish(i);
      }

      for (let i = length - 1; i >= 0; i--) {
        await finishReverse(i);
      }

      box[0].classList.remove("finished");

      for (let i = 0; i < 3; i++) {
        await finishFinal();
        await removeFinishFinal();
      }

      view.unhideButtons();

      function finish(index) {
        return new Promise(function(resolve) {
          setTimeout(function() {
            if (index !== 0) {
              box[index - 1].classList.remove("finished");
            }
            box[index].classList.add("finished");

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }

      function finishReverse(index) {
        return new Promise(function(resolve) {
          setTimeout(function() {
            if (index !== length - 1) {
              box[index + 1].classList.remove("finished");
            }
            box[index].classList.add("finished");

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }

      function finishFinal() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            for (let i = 0; i < length; i++) {
              box[i].classList.add("finished");
            }

            resolve();
          }, 100);
        });
      }

      function removeFinishFinal() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            for (let i = 0; i < length; i++) {
              box[i].classList.remove("finished");
            }

            resolve();
          }, 100);
        });
      }
    },
  };
})();

export default view;
