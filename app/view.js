import controller from "./controller";
import model from './model';

const view = (function() {
  const $selector = document.querySelector(".selector");
  const $inputButton = document.querySelector(".input-button");
  const $sortButton = document.querySelector(".start-button");
  const $barBoard = document.querySelector(".box-board");
  const $input = document.querySelector(".input");

  const SORTED = "sorted";
  const COMPARING = "comparing";
  const FINISHED = "finished";
  const LEFT = "left";
  const RIGHT = "right";
  const BAR = "bar";

  const MAXIMUM_BAR_HEIGHT_PIXEL = 450;
  const EFFECT_TIME = 200;
  const FINISH_EFFECT_TIME = 100;

  return {
    emptyInputBox: function() {
      $input.value = '';
    },

    getInput: function() {
      return Number($input.value);
    },

    getSortType: function() {
      return $selector.value;
    },

    addEvents: function() {
      $input.addEventListener("keypress", controller.enter);
      $inputButton.addEventListener("click", controller.getInput);
      $sortButton.addEventListener("click", controller.sort);
    },

    createBar: function(input) {
      const index = model.index;

      model.inputNumber[index] = input;
      model.$bars[index] = document.createElement("div");

      const bar = model.$bars[index];

      $barBoard.appendChild(bar);

      bar.textContent = input;
      bar.classList.add(BAR);

      view.adjustHeight();
    },

    disableButtons: function() {
      $input.disabled = true;
      $inputButton.disabled = true;
      $sortButton.disabled = true;
    },

    reactivateButtons: function() {
      $input.disabled = false;
      $inputButton.disabled = false;
      $sortButton.disabled = false;
    },

    adjustHeight: function() {
      for (const div of model.$bars) {
        const value = Number(div.textContent);
        const maxInput = Math.max(...model.inputNumber);

        div.style.height = `${MAXIMUM_BAR_HEIGHT_PIXEL * value / maxInput}px`;
      }
    },

    swap: function(left, right, length) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          view.paintBarsComparing(left, right, length);

          const temp = model.$bars[left].textContent;
          model.$bars[left].textContent = model.$bars[right].textContent;
          model.$bars[right].textContent = temp;

          view.adjustHeight();

          resolve();
        }, EFFECT_TIME);
      });
    },

    noSwap: function(left, right, length) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          view.paintBarsComparing(left, right, length);

          resolve();
        }, EFFECT_TIME);
      });
    },

    paintSortedBar: function(length) {
      model.$bars[length - 1].classList.add(SORTED);
    },

    paintBarsComparing: function(left, right, length) {
      for (let j = 0; j < length; j++) {
        model.$bars[j].classList.remove(COMPARING);
      }

      model.$bars[left].classList.add(COMPARING);
      model.$bars[right].classList.add(COMPARING);
    },

    showFinishingEffect: async function() {
      const length = model.$bars.length;
      const bars = model.$bars;

      for (let i = 0; i < length; i++) {
        await showEffectToDirection(i, RIGHT);
      }

      for (let i = length - 1; i >= 0; i--) {
        await showEffectToDirection(i, LEFT);

        if (i === 0) {
          bars[0].classList.remove(FINISHED);
        }
      }

      for (let i = 0; i < 3; i++) {
        await paintAllBars();
        await removePaintfromAllbars();
      }

      view.reactivateButtons();

      function showEffectToDirection(index, direction) {
        if (direction === "right") {
          return new Promise(function(resolve) {
            setTimeout(function() {
              if (index !== 0) {
                bars[index - 1].classList.remove(FINISHED);
              }

              bars[index].classList.add(FINISHED);

              resolve();
            }, FINISH_EFFECT_TIME);
          });
        }

        if (direction === "left") {
          return new Promise(function(resolve) {
            setTimeout(function() {
              if (index !== length - 1) {
                bars[index + 1].classList.remove(FINISHED);
              }

              bars[index].classList.add(FINISHED);

              resolve();
            }, FINISH_EFFECT_TIME);
          });
        }
      }

      function paintAllBars() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            for (let i = 0; i < length; i++) {
              bars[i].classList.add(FINISHED);
            }

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }

      function removePaintfromAllbars() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            for (let i = 0; i < length; i++) {
              bars[i].classList.remove(FINISHED);
            }

            resolve();
          }, FINISH_EFFECT_TIME);
        });
      }
    },
  };
})();

export default view;
