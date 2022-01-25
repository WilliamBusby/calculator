"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var currentNumber = "";
var numberVals = [];
var operationVals = [];
var outputNumber;

var numberButtonsArr = _toConsumableArray(document.getElementsByClassName("numbers"));

var functionButtonsArr = _toConsumableArray(document.getElementsByClassName("functions"));

var allButtons = document.querySelectorAll("button");
var equalsButton = document.getElementById("equal");
var clearButton = document.getElementById("remove");
var plusMinus = document.getElementById("plusMinus");
var percent = document.getElementById("percent");

var additionalButtons = _toConsumableArray(document.getElementsByClassName("lightgrey"));

var displayOutput = function displayOutput(numberToDisplay) {
  document.getElementById("output__number").innerHTML = numberToDisplay.toLocaleString();
};

displayOutput(0);

var clearValues = function clearValues(valuesToClear) {
  for (var i = 0; i < valuesToClear.length; i++) {
    if (valuesToClear[i] === currentNumber) {
      currentNumber = "";
    } else if (valuesToClear[i] === numberVals) {
      numberVals = [];
    } else if (valuesToClear[i] === operationVals) {
      operationVals = [];
    } else if (valuesToClear[i] === outputNumber) {
      outputNumber = 0;
    }
  }
};

for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function (event) {
    event.preventDefault();
  });
}

var _loop = function _loop(_i) {
  numberButtonsArr[_i].addEventListener("click", function (event) {
    if (currentNumber.includes(".") && numberButtonsArr[_i].innerHTML == ".") {
      alert("You can't have two decimal points in one number!");
    } else {
      currentNumber += numberButtonsArr[_i].innerHTML;
      displayOutput(currentNumber);
    }
  });
};

for (var _i = 0; _i < numberButtonsArr.length; _i++) {
  _loop(_i);
}

var _loop2 = function _loop2(_i2) {
  functionButtonsArr[_i2].addEventListener("click", function (event) {
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[_i2].innerHTML);
    clearValues(currentNumber);
  });
};

for (var _i2 = 0; _i2 < functionButtonsArr.length; _i2++) {
  _loop2(_i2);
}

equalsButton.addEventListener("click", function (event) {
  calculate();
  displayOutput(outputNumber);
});

var calculate = function calculate() {
  numberVals.push(currentNumber);
  outputNumber = Number(numberVals[0]);

  for (var _i3 = 1; _i3 < numberVals.length; _i3++) {
    if (operationVals[_i3 - 1] == "+") {
      outputNumber += Number(numberVals[_i3]);
    } else if (operationVals[_i3 - 1] == "-") {
      outputNumber = outputNumber - Number(numberVals[_i3]);
    } else if (operationVals[_i3 - 1] == "/" && numberVals[_i3] != "0") {
      outputNumber = outputNumber / Number(numberVals[_i3]);
    } else if (operationVals[_i3 - 1] == "*") {
      outputNumber = outputNumber * Number(numberVals[_i3]);
    } else if (operationVals[_i3 - 1] == "/" && numberVals[_i3] == "0") {
      alert("Can't divide by 0!");
      clearValues([outputNumber, currentNumber, numberVals, operationVals]);
    }
  }

  clearValues([currentNumber, numberVals, operationVals]);
};

var _loop3 = function _loop3(_i4) {
  additionalButtons[_i4].addEventListener("click", function (event) {
    if (additionalButtons[_i4] == clearButton) {
      clearValues([currentNumber, outputNumber, numberVals, operationVals]);
    } else if (additionalButtons[_i4] == percent) {
      outputNumber = document.getElementById("output__number").innerHTML * 0.01;
    } else if (additionalButtons[_i4] == plusMinus) {
      outputNumber = document.getElementById("output__number").innerHTML * -1;
    }

    displayOutput(outputNumber);
  });
};

for (var _i4 = 0; _i4 < additionalButtons.length; _i4++) {
  _loop3(_i4);
}