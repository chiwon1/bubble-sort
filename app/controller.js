import model from "./model";
import view from "./view";

const controller = (function() {
  const MAXIMUM_NUMBER_OF_INPUT = 10;
  const MINIMUM_NUMBER_OF_INPUT = 5;
  const MAXIMUM_INPUT = 100;
  const MINIMUM_INPUT = 1;

  async function bubbleSort(items) {
    const length = items.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (items[j] > items[j + 1]) {
          const temp = items[j];
          items[j] = items[j + 1];
          items[j + 1] = temp;

          await view.swap(j, j + 1, length - i);
        } else {
          await view.noSwap(j, j + 1, length - i);
        }
      }

      view.paintSortedBar(length - i);
    }

    view.showFinishingEffect();
  }

  return {
    getInput: function() {
      const input = Number(view.$input.value);
      view.$input.value = '';

      if (input > MAXIMUM_INPUT) {
        alert(`Maximum input is ${MAXIMUM_INPUT}`);
        return;
      }

      if (input < MINIMUM_INPUT) {
        alert(`Minimum input is ${MINIMUM_INPUT}`);
        return;
      }

      if (model.index === MAXIMUM_NUMBER_OF_INPUT) {
        alert(`Maximum number of input is ${MAXIMUM_NUMBER_OF_INPUT}`);
        return;
      }

      view.createBox(input);
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
        alert("Please choose how to sort");
        return;
      }

      if (model.index < 5) {
        alert(`Minimum number of input is ${MINIMUM_NUMBER_OF_INPUT}`);
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
