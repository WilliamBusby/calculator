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

var allButtons = document.getElementById("buttons");
var equalsButton = document.getElementById("equal");
var clearButton = document.getElementById("remove");
var plusMinus = document.getElementById("plusMinus");
var percent = document.getElementById("percent");

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
}; // allButtons.addEventListener("click", (event) => {
//   const eachButton = event.target;
//   eachButton.preventDefault();
// })


var _loop = function _loop(i) {
  numberButtonsArr[i].addEventListener("click", function (event) {
    if (currentNumber.includes(".") && numberButtonsArr[i].innerHTML == ".") {
      alert("You can't have two decimal points in one number!");
    } else {
      currentNumber += numberButtonsArr[i].innerHTML;
      displayOutput(currentNumber);
    }
  });
};

for (var i = 0; i < numberButtonsArr.length; i++) {
  _loop(i);
}

var _loop2 = function _loop2(_i) {
  functionButtonsArr[_i].addEventListener("click", function (event) {
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[_i].innerHTML);
    currentNumber = "";
  });
};

for (var _i = 0; _i < functionButtonsArr.length; _i++) {
  _loop2(_i);
}

equalsButton.addEventListener("click", function (event) {
  calculate();
  displayOutput(outputNumber);
});

var calculate = function calculate() {
  numberVals.push(currentNumber);
  outputNumber = Number(numberVals[0]);

  for (var _i2 = 1; _i2 < numberVals.length; _i2++) {
    if (operationVals[_i2 - 1] == "+") {
      outputNumber += Number(numberVals[_i2]);
    } else if (operationVals[_i2 - 1] == "-") {
      outputNumber = outputNumber - Number(numberVals[_i2]);
    } else if (operationVals[_i2 - 1] == "/" && numberVals[_i2] != "0") {
      outputNumber = outputNumber / Number(numberVals[_i2]);
    } else if (operationVals[_i2 - 1] == "*") {
      outputNumber = outputNumber * Number(numberVals[_i2]);
    } else if (operationVals[_i2 - 1] == "/" && numberVals[_i2] == "0") {
      alert("Can't divide by 0!");
      clearValues([outputNumber, currentNumber, numberVals, operationVals]);
      return outputNumber;
    }
  }

  clearValues([currentNumber, numberVals, operationVals]); // return outputNumber;
};

clearButton.addEventListener("click", function (event) {
  clearValues([currentNumber, outputNumber, numberVals, operationVals]);
  displayOutput(0);
});
percent.addEventListener("click", function (event) {
  outputNumber = document.getElementById("output__number").innerHTML * 0.01;
  displayOutput(outputNumber);
});
plusMinus.addEventListener("click", function (event) {
  outputNumber = document.getElementById("output__number").innerHTML * -1;
  displayOutput(outputNumber);
});