document.addEventListener("DOMContentLoaded", () => {
  let phoneInput = document.querySelector("input[data-tel-input]");
  
  const getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g, "");
  }

  phoneInput.addEventListener("input", (event) => {
    let input = event.target,
        inputNumbersValue = getInputNumbersValue(input),
        formattedInputValue = "",
        selectionStart = input.selectionStart;
        
    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (event.data && /\D/g.test(event.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] == "9") {
        inputNumbersValue = "7" + inputNumbersValue;
      }

      let firstSymbols = (inputNumbersValue[0] == "8") ? "8": "+7";
      formattedInputValue = firstSymbols + " ";

      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }

      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }

      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }

      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }

    } else {
      formattedInputValue = "+" + inputNumbersValue;
    }

    input.value = formattedInputValue;
  });

  phoneInput.addEventListener("keydown", (event) => {
    if (event.keyCode == 8 && getInputNumbersValue(event.target).length == 1) {
      event.target.value = "";
    }
  });

  phoneInput.addEventListener("paste", (event) => {
    let pasted = event.clipboardData || window.clipboardData,
        input = event.target,
        inputNumbersValue = getInputNumbersValue(input);
        
    if (pasted) {
      let pastedText = pasted.getData("text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  });
});
