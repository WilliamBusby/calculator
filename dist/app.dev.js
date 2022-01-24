"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var currentNumber = 0;
var numberVals = [];
var operationVals = [];
var outputNumber = 0;
var numberButtons = document.getElementsByClassName("numbers");

var numberButtonsArr = _toConsumableArray(numberButtons);

var functionButtons = document.getElementsByClassName("functions");

var functionButtonsArr = _toConsumableArray(functionButtons);

var equalsButton = document.getElementById("equal");
var clearButton = document.getElementById("remove");

var _loop = function _loop(i) {
  numberButtonsArr[i].addEventListener("click", function (event) {
    event.preventDefault();
    currentNumber += numberButtonsArr[i].innerHTML;
    console.log(currentNumber);
  });
};

for (var i = 0; i < numberButtonsArr.length; i++) {
  _loop(i);
}

var _loop2 = function _loop2(_i) {
  functionButtonsArr[_i].addEventListener("click", function (event) {
    event.preventDefault();
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[_i]);
    currentNumber = 0;
  });
};

for (var _i = 0; _i < functionButtonsArr.length; _i++) {
  _loop2(_i);
}

equalsButton.addEventListener("click", function (event) {
  event.preventDefault();
  calculate();
});

var calculate = function calculate() {};