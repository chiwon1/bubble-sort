// ================================
// START YOUR Controller HERE
//
// https://developer.mozilla.org/ko/docs/Glossary/MVC
//
// ================================


import model from "./model";
import view from "./view";


const controller = (function() {
  return {
    getInput: function() {
      const $input = document.querySelector("input");
      const input = Number($input.value);

      $input.value = '';

      if (input > 100 || input < 1 || input.length === 0) {
        alert("Maximum input is 100");
        return;
      }

      if (model.index > 9) {
        alert("Maximum number of input is 10");
        return;
      }

      view.createBox(input);
    },

    enter: function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        controller.getInput();
      }
    },

    sort: function() {
      view.hideButtons();

      bubbleSort(model.inputNumber);

      async function bubbleSort(items) {
        const length = items.length;

        for (let i = 0; i < length; i++) {
          for (let j = 0; j < length - i - 1; j++) {
            if (items[j] > items[j + 1]) {
              const temp = items[j];
              items[j] = items[j + 1];
              items[j + 1] = temp;

              await view.swap(j, j + 1, length, i);
            } else {
              await view.noSwap(j, j + 1, length, i);
            }
          }
          view.colorTheSorted(length, i);
        }

        view.finishingEffect();
      }
    },
  };
})();

export default controller;
