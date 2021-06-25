import controller from "./controller"
import model from './model';


const view = (function() {
  const $selector = document.querySelector(".selector");
  const $input = document.querySelector(".input");
  const $inputButton = document.querySelector(".input-button");
  const $sortButton = document.querySelector(".start-button");
  const $boxBoard = document.querySelector(".box-board");
  const MAX_PX = 450;
  const EFFECT_TIME = 200;
  const FINISH_EFFECT_TIME = 100;

  return {
    getSortMethod: function() {
      return $selector.value;
    },

    addEvents: function() {
      $input.addEventListener("keypress", controller.enter);
      $inputButton.addEventListener("click", controller.getInput);
      $sortButton.addEventListener("click", controller.sort);
    },

    createBox: function(input) {
      const index = model.index;
      model.inputNumber[index] = input;
      model.$boxes[index] = document.createElement("div");

      const box = model.$boxes[index];
      $boxBoard.appendChild(box);
      box.textContent = input;
      box.classList.add("box");

      view.adjustHeight();
    },

    disableButtons: function() {
      $input.disabled = true;
      $inputButton.disabled = true;
      $sortButton.disabled = true;
    },

    ableButtons: function() {
      $input.disabled = false;
      $inputButton.disabled = false;
      $sortButton.disabled = false;
    },

    adjustHeight: function() {
      for (const div of model.$boxes) {
        const value = Number(div.textContent);
        const maxInput = Math.max(...model.inputNumber);
        div.style.height = `${MAX_PX * value / maxInput}px`;
      }
    },

    swap: function(a, b, length) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          view.colorThingsToBeCompared(a, b, length);

          const temp = model.$boxes[a].textContent;
          model.$boxes[a].textContent = model.$boxes[b].textContent;
          model.$boxes[b].textContent = temp;

          view.adjustHeight();
          resolve();
        }, EFFECT_TIME);
      });
    },

    noSwap: function(a, b, length) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          view.colorThingsToBeCompared(a, b, length);
          resolve();
        }, EFFECT_TIME);
      });
    },

    colorTheSorted: function(length) {
      model.$boxes[length - 1].classList.add("sorted");
    },

    colorThingsToBeCompared: function(a, b, length) {
      for (let j = 0; j < length; j++) {
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

      view.ableButtons();

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
          }, FINISH_EFFECT_TIME);
        });
      }

      function removeFinishFinal() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            for (let i = 0; i < length; i++) {
              box[i].classList.remove("finished");
            }

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }
    },
  };
})();

export default view;
