import model from "./model";
import view from "./view";

const controller = (function() {
  const LIMIT_NUMBER_OF_INPUT = 10;
  const MINIMUM_NUMBER_OF_INPUT = 5;
  const MAXIMUM_INPUT = 100;
  const MINIMUM_INPUT = 1;
  const WRONG_INPUT_MESSAGE = "Wrong input";
  const CHOOSE_HOW_TO_SORT_MESSAGE = "Please choose how to sort";

  async function bubbleSort(items) {
    const numberOfInput = items.length;

    for (let i = 0; i < numberOfInput; i++) {
      for (let j = 0; j < numberOfInput - i - 1; j++) {
        if (items[j] > items[j + 1]) {
          const temp = items[j];
          items[j] = items[j + 1];
          items[j + 1] = temp;

          await view.swap(j, j + 1, numberOfInput - i);
        } else {
          await view.noSwap(j, j + 1, numberOfInput - i);
        }
      }

      view.paintSortedBar(numberOfInput - i);
    }

    view.showFinishingEffect();
  }

  return {
    getInput: function() {
      const input = view.getInput();
      view.emptyInputBox();

      if (input > MAXIMUM_INPUT) {
        alert(WRONG_INPUT_MESSAGE);
        return;
      }

      if (input < MINIMUM_INPUT) {
        alert(WRONG_INPUT_MESSAGE);
        return;
      }

      if (model.index === LIMIT_NUMBER_OF_INPUT) {
        alert(WRONG_INPUT_MESSAGE);
        return;
      }

      view.createBar(input);
      model.index++;
    },

    enter: function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        controller.getInput();
      }
    },

    sort: function() {
      const sortType = view.getSortType();

      if (sortType === "how to sort") {
        alert(CHOOSE_HOW_TO_SORT_MESSAGE);
        return;
      }

      if (model.index < MINIMUM_NUMBER_OF_INPUT) {
        alert(WRONG_INPUT_MESSAGE);
        return;
      }

      view.disableButtons();

      if (sortType === "bubble") {
        bubbleSort(model.inputNumber);
      }
    },
  };
})();

export default controller;
