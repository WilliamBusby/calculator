"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Defining global variables used within javascript functions
var currentNumber = "";
var numberVals = [];
var operationVals = [];
var outputNumber = 0;
var fullString = ""; // Getting information from HTML document

var numberButtonsArr = _toConsumableArray(document.getElementsByClassName("numbers"));

var basicFunctions = _toConsumableArray(document.getElementsByClassName("basic"));

var additionalButtons = _toConsumableArray(document.getElementsByClassName("lightgrey"));

var allButtons = document.querySelectorAll("button");
var equalsButton = document.getElementById("equal");

var additionalFunctions = _toConsumableArray(document.getElementsByClassName("extraFunctions")); // Function to display output to main display & run once on open page


var displayOutput = function displayOutput(numberToDisplay) {
  document.getElementById("output__big").innerHTML = numberToDisplay.toLocaleString();
};

displayOutput(0); // Function to display full equation

var smallDisplay = function smallDisplay() {
  document.getElementById("output__small").innerHTML = fullString;
}; // Function to clear global variables in input array


var clearValues = function clearValues(valuesToClear) {
  for (var i = 0; i < valuesToClear.length; i++) {
    if (valuesToClear[i] == "currentNumber") {
      currentNumber = "";
    } else if (valuesToClear[i] == "numberVals") {
      numberVals = [];
    } else if (valuesToClear[i] == "operationVals") {
      operationVals = [];
    } else if (valuesToClear[i] == "outputNumber") {
      outputNumber = 0;
    } else if (valuesToClear[i] == "fullString") {
      fullString = "";
    }
  }
}; // Adds preventDefault to all buttons


for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function (event) {
    event.preventDefault();
  });
} // Adds number addEventListener to all number buttons


var _loop = function _loop(_i) {
  numberButtonsArr[_i].addEventListener("click", function (event) {
    if (currentNumber.includes(".") && numberButtonsArr[_i].innerHTML == ".") {
      alert("You can't have two decimal points in one number.");
    } else if (currentNumber.match(/[^$.\d]/g)) {
      alert("You cannot put a number after a special operator.");
    } else {
      currentNumber += numberButtonsArr[_i].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
    }
  });
};

for (var _i = 0; _i < numberButtonsArr.length; _i++) {
  _loop(_i);
} // Adds function addEventListener to all function buttons


var _loop2 = function _loop2(_i2) {
  basicFunctions[_i2].addEventListener("click", function (event) {
    numberVals.push(currentNumber);
    operationVals.push(basicFunctions[_i2].innerHTML);
    fullString += currentNumber + basicFunctions[_i2].innerHTML;
    displayOutput(currentNumber);
    clearValues(["currentNumber"]);
    smallDisplay();
  });
};

for (var _i2 = 0; _i2 < basicFunctions.length; _i2++) {
  _loop2(_i2);
}

var _loop3 = function _loop3(_i3) {
  additionalFunctions[_i3].addEventListener("click", function (event) {
    if (currentNumber.match(/[^$.\d]/g)) {
      alert("You currently can't have 2 special operators on a number.");
    } else if (currentNumber.length === 0 || currentNumber[1] === ".") {
      alert("You have to input the number before the special operator.");
    } else if (additionalFunctions[_i3].innerHTML == ("1/" || "√")) {
      currentNumber = additionalFunctions[_i3].innerHTML + currentNumber;
      displayOutput(currentNumber);
      smallDisplay();
    } else {
      currentNumber += additionalFunctions[_i3].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
    }
  });
};

for (var _i3 = 0; _i3 < additionalFunctions.length; _i3++) {
  _loop3(_i3);
} // Adds function addEventListener to equals button


equalsButton.addEventListener("click", function (event) {
  if (currentNumber != "") {
    fullString += currentNumber + " =";
    smallDisplay();
    specialFunctionsChecker();
    calculate();
    displayOutput(outputNumber);
  } else {
    alert("Please ensure the amount of operations and numbers match up!");
  }
}); // Calculate function used within equals

var calculate = function calculate() {
  numberVals.push(currentNumber);
  outputNumber = Number(numberVals[0]);

  for (var _i4 = 1; _i4 < numberVals.length; _i4++) {
    if (operationVals[_i4 - 1] == "+") {
      outputNumber += Number(numberVals[_i4]);
    } else if (operationVals[_i4 - 1] == "-") {
      outputNumber = outputNumber - Number(numberVals[_i4]);
    } else if (operationVals[_i4 - 1] == "/" && numberVals[_i4] != "0") {
      outputNumber = outputNumber / Number(numberVals[_i4]);
    } else if (operationVals[_i4 - 1] == "*") {
      outputNumber = outputNumber * Number(numberVals[_i4]);
    } else if (operationVals[_i4 - 1] == "/" && numberVals[_i4] == "0") {
      alert("Can't divide by 0!");
      clearValues(["outputNumber"]);
    }
  }

  clearValues(["currentNumber", "numberVals", "operationVals", "fullString"]);
}; // Adds function to each of the additional function buttons (CE, +/-, %)


var _loop4 = function _loop4(_i5) {
  additionalButtons[_i5].addEventListener("click", function (event) {
    if (additionalButtons[_i5].id == "remove") {
      clearValues(["currentNumber", "outputNumber", "numberVals", "operationVals", "fullString"]);
    } else if (additionalButtons[_i5].id == "percent") {
      outputNumber = document.getElementById("output__big").innerHTML * 0.01;
      currentNumber = (Number(currentNumber) / 100).toString();
    } else if (additionalButtons[_i5].id == "plusMinus") {
      outputNumber = document.getElementById("output__big").innerHTML * -1;

      if (currentNumber.charAt(0) !== "-") {
        currentNumber = "-" + currentNumber;
      } else {
        currentNumber = currentNumber.substring(1);
      }
    }

    displayOutput(outputNumber);
    smallDisplay();
  });
};

for (var _i5 = 0; _i5 < additionalButtons.length; _i5++) {
  _loop4(_i5);
} // Adds special operators calculation


var specialFunctionsChecker = function specialFunctionsChecker() {
  for (var _i6 = 0; _i6 < numberVals.length; _i6++) {
    if (numberVals[_i6].match(/[^$.\d]/g)) {
      numberVals[_i6] = specialFunctionsCalculator(numberVals[_i6]);
    }
  }
};

var specialFunctionsCalculator = function specialFunctionsCalculator(inputNumber) {
  if (inputNumber.slice(-1) == "!") {
    inputNumber = factorialCalc(inputNumber);
  } else if (inputNumber.slice(-1) == "^2") {
    inputNumber = Math.pow(inputNumber, 2);
  } else if (inputNumber.slice(-1) == "^3") {
    inputNumber = Math.pow(inputNumber, 3);
  } else if (inputNumber.slice(-1) == "1/" && inputNumber !== 0) {
    inputNumber = 1 / inputNumber;
  } else if (inputNumber.slice(-1) == "√" && inputNumber >= 0) {
    inputNumber = Math.sqrt(inputNumber);
  }

  return inputNumber;
};

var factorialCalc = function factorialCalc(num) {
  if (num < 0) return -1;else if (num == 0) return 1;else {
    return num * factorialCalc(num - 1);
  }
};