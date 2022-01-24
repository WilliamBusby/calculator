"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var currentNumber = "";
var numberVals = [];
var operationVals = [];
var outputNumber;
var numberButtons = document.getElementsByClassName("numbers");

var numberButtonsArr = _toConsumableArray(numberButtons);

var functionButtons = document.getElementsByClassName("functions");

var functionButtonsArr = _toConsumableArray(functionButtons);

var equalsButton = document.getElementById("equal");
var outputHTMLNumber = document.getElementById("output__number");
var clearButton = document.getElementById("remove");

var _loop = function _loop(i) {
  numberButtonsArr[i].addEventListener("click", function (event) {
    event.preventDefault();

    if (currentNumber.includes(".") && numberButtonsArr[i].innerHTML == ".") {
      alert("You can't have two decimal points in one number!");
    } else {
      currentNumber += numberButtonsArr[i].innerHTML;
      document.getElementById("output__number").innerHTML = currentNumber;
    }
  });
};

for (var i = 0; i < numberButtonsArr.length; i++) {
  _loop(i);
}

var _loop2 = function _loop2(_i) {
  functionButtonsArr[_i].addEventListener("click", function (event) {
    event.preventDefault();
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[_i].innerHTML);
    currentNumber = "";
  });
};

for (var _i = 0; _i < functionButtonsArr.length; _i++) {
  _loop2(_i);
}

equalsButton.addEventListener("click", function (event) {
  event.preventDefault();
  calculate();
  document.getElementById("output__number").innerHTML = outputNumber;
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
      outputNumber = 0;
      currentNumber = "";
      numberVals = [];
      operationVals = [];
      return outputNumber;
    }
  }

  currentNumber = "";
  numberVals = [];
  operationVals = [];
  return outputNumber;
};

clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  currentNumber = "";
  document.getElementById("output__number").innerHTML = 0;
});