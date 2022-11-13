"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Defining global variables used within javascript functions
var currentNumber = "";
var numberVals = [];
var operationVals = [];
var outputNumber = 0;
var fullString = "";
var memory = 0;
var bracketNums = [];
var bracketOps = [];
var bracketOutput = 0;
var isBracketActive = false;
var bracketNumsTemp = "";
var isBodmasUsed = false; // Getting information from HTML document

var numberButtonsArr = _toConsumableArray(document.getElementsByClassName("numbers"));

var basicFunctions = _toConsumableArray(document.getElementsByClassName("basic"));

var additionalButtons = _toConsumableArray(document.getElementsByClassName("lightgrey"));

var allButtons = document.querySelectorAll("button");
var equalsButton = document.getElementById("equal");

var additionalFunctions = _toConsumableArray(document.getElementsByClassName("extraFunctions"));

var memoryButtons = _toConsumableArray(document.getElementsByClassName("memory"));

var changeType = document.getElementById("changeToBodmas");
var whatType = document.getElementById("bodmasOrLtr"); // Function to display output to main display & run once on open page

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
    } else if (valuesToClear[i] == "bracketNums") {
      bracketNums = [];
    } else if (valuesToClear[i] == "bracketOps") {
      bracketOps = [];
    } else if (valuesToClear[i] == "bracketOutput") {
      bracketOutput = 0;
    } else if (valuesToClear[i] == "bracketNumsTemp") {
      bracketNumsTemp = "";
    }
  }
}; // Adds special operators calculation


var specialFunctionsChecker = function specialFunctionsChecker(numberArr) {
  for (var i = 0; i < numberArr.length; i++) {
    if (numberArr[i].match(/[^$.\d]/g)) {
      numberArr[i] = specialFunctionsCalculator(numberArr[i]);
    }
  }
};

var specialFunctionsCalculator = function specialFunctionsCalculator(inputNumber) {
  var outputNumber = 0;

  if (inputNumber.includes("!")) {
    inputNumberNoAlpha = inputNumber.replace("!", "");
    outputNumber = factorialCalc(inputNumberNoAlpha);
  } else if (inputNumber.includes("e^")) {
    inputNumberNoAlpha = inputNumber.replace("e^", "");
    outputNumber = Math.pow(Math.E, inputNumberNoAlpha);
  } else if (inputNumber.includes("^2")) {
    inputNumberNoAlpha = inputNumber.replace("^2", "");
    outputNumber = Math.pow(inputNumberNoAlpha, 2);
  } else if (inputNumber.includes("^3")) {
    inputNumberNoAlpha = inputNumber.replace("^3", "");
    outputNumber = Math.pow(inputNumberNoAlpha, 3);
  } else if (inputNumber.includes("1/") && inputNumber.replace("1/", "") !== 0) {
    inputNumberNoAlpha = inputNumber.replace("1/", "");
    outputNumber = 1 / inputNumberNoAlpha;
  } else if (inputNumber.includes("√") && inputNumber.replace("√", "") >= 0) {
    inputNumberNoAlpha = inputNumber.replace("√", "");
    outputNumber = Math.sqrt(inputNumberNoAlpha);
  } else if (inputNumber.includes("10^")) {
    inputNumberNoAlpha = inputNumber.replace("10^", "");
    outputNumber = Math.pow(10, inputNumberNoAlpha);
  }

  return outputNumber;
};

var factorialCalc = function factorialCalc(num) {
  if (num < 0) {
    return -1;
  } else if (num == 0) {
    return 1;
  } else {
    return num * factorialCalc(num - 1);
  }
}; // To calculate the output


var outputCalc = function outputCalc(useCurrent) {
  if (useCurrent) {
    fullString += currentNumber + " =";
  } else {
    fullString += " =";
  }

  smallDisplay();
  numberVals.push(currentNumber);
  specialFunctionsChecker(numberVals);

  if (!isBodmasUsed) {
    var _calculate = calculate(numberVals, operationVals, outputNumber, ["currentNumber", "numberVals", "operationVals", "fullString"]);

    var _calculate2 = _slicedToArray(_calculate, 3);

    numberVals = _calculate2[0];
    operationVals = _calculate2[1];
    outputNumber = _calculate2[2];
  } else {
    outputNumber = bodmasCalculator(numberVals, operationVals, ["currentNumber", "numberVals", "operationVals", "fullString"]);
  }

  displayOutput(outputNumber);
}; // To calculate within brackets


var bracketCalc = function bracketCalc() {
  bracketNums.push(bracketNumsTemp);
  smallDisplay();
  specialFunctionsChecker(bracketNums);

  if (!isBodmasUsed) {
    var _calculate3 = calculate(bracketNums, bracketOps, bracketOutput, ["bracketNumsTemp", "bracketNums", "bracketOps"]);

    var _calculate4 = _slicedToArray(_calculate3, 3);

    bracketNums = _calculate4[0];
    bracketOps = _calculate4[1];
    bracketOutput = _calculate4[2];
  } else {
    bracketOutput = bodmasCalculator(numberVals, operationVals, ["bracketNumsTemp", "bracketNums", "bracketOps"]);
  }
}; // Adds preventDefault to all buttons


for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function (event) {
    event.preventDefault();
  });
} // Adds number addEventListener to all number buttons


var _loop = function _loop(_i2) {
  numberButtonsArr[_i2].addEventListener("click", function (event) {
    if (currentNumber.includes(".") && numberButtonsArr[_i2].innerHTML == ".") {
      alert("You can't have two decimal points in one number.");
    } else if (currentNumber.match(/[^$.\d]/g)) {
      alert("You cannot put a number after a special operator.");
    } else if (isBracketActive) {
      bracketNumsTemp += numberButtonsArr[_i2].innerHTML;
      displayOutput(bracketNumsTemp);
      smallDisplay();
    } else {
      currentNumber += numberButtonsArr[_i2].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
    }
  });
};

for (var _i2 = 0; _i2 < numberButtonsArr.length; _i2++) {
  _loop(_i2);
} // Adds function addEventListener to all function buttons


var _loop2 = function _loop2(_i3) {
  basicFunctions[_i3].addEventListener("click", function (event) {
    if (isBracketActive) {
      bracketNums.push(bracketNumsTemp);
      bracketOps.push(basicFunctions[_i3].innerHTML);
      fullString += bracketNumsTemp + basicFunctions[_i3].innerHTML;
      displayOutput(bracketNumsTemp);
      smallDisplay();
      clearValues(["bracketNumsTemp"]);
    } else if (fullString.charAt(fullString.length - 1) == ")") {
      numberVals.push(currentNumber);
      operationVals.push(basicFunctions[_i3].innerHTML);
      fullString += basicFunctions[_i3].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
      clearValues(["currentNumber"]);
    } else {
      numberVals.push(currentNumber);
      operationVals.push(basicFunctions[_i3].innerHTML);
      fullString += currentNumber + basicFunctions[_i3].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
      clearValues(["currentNumber"]);
    }
  });
};

for (var _i3 = 0; _i3 < basicFunctions.length; _i3++) {
  _loop2(_i3);
}

var _loop3 = function _loop3(_i4) {
  additionalFunctions[_i4].addEventListener("click", function (event) {
    var funcsInnerHtml = additionalFunctions[_i4].innerHTML;
    var specialCharacters = ["1/", "√", "10^", "e^"];

    if (currentNumber.match(/[^$.\d(]/g)) {
      alert("You currently can't have 2 special operators on a number.");
    } else if (funcsInnerHtml === "M-") {
      memory = 0;
    } else if (funcsInnerHtml === "M") {
      currentNumber = String(memory);
      displayOutput(currentNumber);
    } else if (funcsInnerHtml === "M+") {
      outputCalc(true);
      memory = outputNumber;
    } else if (funcsInnerHtml === "Type") {
      if (isBodmasUsed) {
        isBodmasUsed = false;
        document.getElementById("bodmasOrLtr").innerHTML = "LTR";
      } else {
        isBodmasUsed = true;
        document.getElementById("bodmasOrLtr").innerHTML = "BODMAS";
      }
    } else if (funcsInnerHtml === "LTR" || funcsInnerHtml === "BODMAS") {
      alert("Please use the button above to change type.");
    } else if (funcsInnerHtml === "(" && !isBracketActive && currentNumber === "") {
      isBracketActive = true;
      bracketOutput = 0;
      fullString += "(";
    } else if (funcsInnerHtml === ")" && isBracketActive) {
      fullString += bracketNumsTemp + ")";
      bracketCalc();
      currentNumber = String(bracketOutput);
      clearValues(["bracketOutput"]);
      isBracketActive = false;
    } else if (currentNumber.length === 0 || currentNumber[0] === "." && currentNumber.length === 1) {
      alert("You have to input the number before the special operator.");
    } else if (specialCharacters.includes(funcsInnerHtml)) {
      currentNumber = funcsInnerHtml + currentNumber;
      displayOutput(currentNumber);
      smallDisplay();
    } else if (funcsInnerHtml === ")" && !isBracketActive) {
      alert("You need to put an opening bracket before a closing one.");
    } else if (funcsInnerHtml === "(" && isBracketActive) {
      alert("You cannot have brackets within each other currently.");
    } else {
      currentNumber += funcsInnerHtml;
      displayOutput(currentNumber);
      smallDisplay();
    }
  });
};

for (var _i4 = 0; _i4 < additionalFunctions.length; _i4++) {
  _loop3(_i4);
} // Adds function addEventListener to equals button


equalsButton.addEventListener("click", function (event) {
  if (currentNumber != "" && fullString[fullString.length - 1] !== ")") {
    outputCalc(true);
  } else if (currentNumber != "" && fullString[fullString.length - 1] == ")") {
    outputCalc(false);
  } else {
    alert("Please ensure the amount of operations and numbers match up!");
  }
}); // Calculate function used within equals

var calculate = function calculate(numberArr, operationsArr, outputValue, valsToClear) {
  outputValue = Number(numberArr[0]);

  for (var _i5 = 1; _i5 < numberArr.length; _i5++) {
    if (operationsArr[_i5 - 1] == "+") {
      outputValue += Number(numberArr[_i5]);
    } else if (operationsArr[_i5 - 1] == "-") {
      outputValue = outputValue - Number(numberArr[_i5]);
    } else if (operationsArr[_i5 - 1] == "/" && numberArr[_i5] != "0") {
      outputValue = outputValue / Number(numberArr[_i5]);
    } else if (operationsArr[_i5 - 1] == "*") {
      outputValue = outputValue * Number(numberArr[_i5]);
    } else if (operationsArr[_i5 - 1] == "/" && numberArr[_i5] == "0") {
      alert("Can't divide by 0!");
      clearValues(["outputNumber"]);
    }
  }

  clearValues(valsToClear);
  return [numberArr, operationsArr, outputValue];
}; // Adds function to each of the additional function buttons (CE, +/-, %)


var _loop4 = function _loop4(_i6) {
  additionalButtons[_i6].addEventListener("click", function (event) {
    if (additionalButtons[_i6].id === "remove") {
      clearValues(["currentNumber", "outputNumber", "numberVals", "operationVals", "fullString", "bracketNums", "bracketOps", "bracketOutput", "bracketNumsTemp"]);
      isBracketActive = false;
    } else if (additionalButtons[_i6].id === "percent") {
      outputNumber = document.getElementById("output__big").innerHTML * 0.01;
      currentNumber = (Number(currentNumber) / 100).toString();
    } else if (additionalButtons[_i6].id === "plusMinus") {
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

for (var _i6 = 0; _i6 < additionalButtons.length; _i6++) {
  _loop4(_i6);
} // BODMAS calculator


var bodmasCalculator = function bodmasCalculator(numberArr, operationArr, valsToClear) {
  var numberArrReduced = _toConsumableArray(numberArr);

  var operationArrReduced = _toConsumableArray(operationArr);

  var index = 0;

  while (numberArrReduced.length > 1) {
    if (operationArrReduced.includes("/")) {
      index = operationArrReduced.indexOf("/");
      numberArrReduced[index] = Number(numberArrReduced[index]) / Number(numberArrReduced[index + 1]);
    } else if (operationArrReduced.includes("*")) {
      index = operationArrReduced.indexOf("*");
      numberArrReduced[index] = Number(numberArrReduced[index]) * Number(numberArrReduced[index + 1]);
    } else if (operationArrReduced.includes("+")) {
      index = operationArrReduced.indexOf("+");
      numberArrReduced[index] = Number(numberArrReduced[index]) + Number(numberArrReduced[index + 1]);
    } else if (operationArrReduced.includes("-")) {
      index = operationArrReduced.indexOf("-");
      numberArrReduced[index] = Number(numberArrReduced[index]) - Number(numberArrReduced[index + 1]);
    }

    operationArrReduced.splice(index, 1);
    numberArrReduced.splice(index + 1, 1);
  }

  clearValues(valsToClear);
  return numberArrReduced[0];
};