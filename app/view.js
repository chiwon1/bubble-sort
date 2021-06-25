import controller from "./controller";
import model from './model';

const view = (function() {
  const $selector = document.querySelector(".selector");
  const $inputButton = document.querySelector(".input-button");
  const $sortButton = document.querySelector(".start-button");
  const $boxBoard = document.querySelector(".box-board");

  const MAX_PX = 450;
  const EFFECT_TIME = 200;
  const FINISH_EFFECT_TIME = 100;

  return {
    $input: document.querySelector(".input"),

    getSortType: function() {
      return $selector.value;
    },

    addEvents: function() {
      view.$input.addEventListener("keypress", controller.enter);
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
      view.$input.disabled = true;
      $inputButton.disabled = true;
      $sortButton.disabled = true;
    },

    reactivateButtons: function() {
      view.$input.disabled = false;
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
          view.paintBarsComparing(a, b, length);

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
          view.paintBarsComparing(a, b, length);

          resolve();
        }, EFFECT_TIME);
      });
    },

    paintSortedBar: function(length) {
      model.$boxes[length - 1].classList.add("sorted");
    },

    paintBarsComparing: function(a, b, length) {
      for (let j = 0; j < length; j++) {
        model.$boxes[j].classList.remove("comparing");
      }

      model.$boxes[a].classList.add("comparing");
      model.$boxes[b].classList.add("comparing");
    },

    showFinishingEffect: async function() {
      const length = model.$boxes.length;
      const boxes = model.$boxes;

      for (let i = 0; i < length; i++) {
        await showEffectToRight(i);
      }

      for (let i = length - 1; i >= 0; i--) {
        await showEffectToLeft(i);

        if (i === 0) {
          boxes[0].classList.remove("finished");
        }
      }

      for (let i = 0; i < 3; i++) {
        await paintAllBars();
        await removePaintfromAllbars();
      }

      view.reactivateButtons();

      function showEffectToRight(index) {
        return new Promise(function(resolve) {
          setTimeout(function() {
            if (index !== 0) {
              boxes[index - 1].classList.remove("finished");
            }

            boxes[index].classList.add("finished");

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }

      function showEffectToLeft(index) {
        return new Promise(function(resolve) {
          setTimeout(function() {
            if (index !== length - 1) {
              boxes[index + 1].classList.remove("finished");
            }

            boxes[index].classList.add("finished");

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }

      function paintAllBars() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            for (let i = 0; i < length; i++) {
              boxes[i].classList.add("finished");
            }

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }

      function removePaintfromAllbars() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            for (let i = 0; i < length; i++) {
              boxes[i].classList.remove("finished");
            }

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }
    },
  };
})();

export default view;
