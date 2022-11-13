// Defining global variables used within javascript functions

let currentNumber = "";
let numberVals = [];
let operationVals = [];
let outputNumber = 0;
let fullString = "";
let memory = 0;
let bracketNums = [];
let bracketOps = [];
let bracketOutput = 0;
let isBracketActive = false;
let bracketNumsTemp = "";
let isBodmasUsed = false;

// Getting information from HTML document

const numberButtonsArr = [...document.getElementsByClassName("numbers")];
const basicFunctions = [...document.getElementsByClassName("basic")];
const additionalButtons = [...document.getElementsByClassName("lightgrey")];
const allButtons = document.querySelectorAll("button");
const equalsButton = document.getElementById("equal");
const additionalFunctions = [...document.getElementsByClassName("extraFunctions")];
const memoryButtons = [...document.getElementsByClassName("memory")];
const changeType = document.getElementById("changeToBodmas");
const whatType = document.getElementById("bodmasOrLtr");

// Function to display output to main display & run once on open page

const displayOutput = (numberToDisplay) => {
  document.getElementById("output__big").innerHTML = numberToDisplay.toLocaleString();
};

displayOutput(0);

// Function to display full equation

const smallDisplay = () => {
  document.getElementById("output__small").innerHTML = fullString;
};

// Function to clear global variables in input array

const clearValues = (valuesToClear) => {
  for (let i = 0; i < valuesToClear.length; i++) {
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
};

// Adds special operators calculation

const specialFunctionsChecker = (numberArr) => {
  for (let i = 0; i < numberArr.length; i++) {
    if (numberArr[i].match(/[^$.\d]/g)) {
      numberArr[i] = specialFunctionsCalculator(numberArr[i]);
    }
  }
};

const specialFunctionsCalculator = (inputNumber) => {
  let outputNumber = 0;
  if (inputNumber.includes("!")) {
    inputNumberNoAlpha = inputNumber.replace("!", "");
    outputNumber = factorialCalc(inputNumberNoAlpha);
  } else if (inputNumber.includes("e^")) {
    inputNumberNoAlpha = inputNumber.replace("e^", "");
    outputNumber = Math.E ** inputNumberNoAlpha;
  } else if (inputNumber.includes("^2")) {
    inputNumberNoAlpha = inputNumber.replace("^2", "");
    outputNumber = inputNumberNoAlpha ** 2;
  } else if (inputNumber.includes("^3")) {
    inputNumberNoAlpha = inputNumber.replace("^3", "");
    outputNumber = inputNumberNoAlpha ** 3;
  } else if (inputNumber.includes("1/") && inputNumber.replace("1/", "") !== 0) {
    inputNumberNoAlpha = inputNumber.replace("1/", "");
    outputNumber = 1 / inputNumberNoAlpha;
  } else if (inputNumber.includes("√") && inputNumber.replace("√", "") >= 0) {
    inputNumberNoAlpha = inputNumber.replace("√", "");
    outputNumber = Math.sqrt(inputNumberNoAlpha);
  } else if (inputNumber.includes("10^")) {
    inputNumberNoAlpha = inputNumber.replace("10^", "");
    outputNumber = 10 ** inputNumberNoAlpha;
  } 
  return outputNumber;
};

const factorialCalc = (num) => {
  if (num < 0) {
    return -1; 
  } else if (num == 0) {
    return 1;
  } else {
    return num * factorialCalc(num - 1);
  }
};

// To calculate the output

const outputCalc = (useCurrent) => {
  if(useCurrent) {
    fullString += currentNumber + " =";
  } else {
    fullString += " =";
  }
  smallDisplay();
  numberVals.push(currentNumber);
  specialFunctionsChecker(numberVals);
  if(!isBodmasUsed) {
    [numberVals, operationVals, outputNumber] = calculate(
      numberVals,
      operationVals,
      outputNumber,
      ["currentNumber", "numberVals", "operationVals", "fullString"]
    );
  } else {
    outputNumber = bodmasCalculator(numberVals, operationVals, ["currentNumber", "numberVals", "operationVals", "fullString"])
  }
  displayOutput(outputNumber);
};

// To calculate within brackets

const bracketCalc = () => {
  bracketNums.push(bracketNumsTemp);
  smallDisplay();
  specialFunctionsChecker(bracketNums);
  if(!isBodmasUsed) {
    [bracketNums, bracketOps, bracketOutput] = calculate(
      bracketNums,
      bracketOps,
      bracketOutput,
      ["bracketNumsTemp", "bracketNums", "bracketOps"]
    );
  } else {
    bracketOutput = bodmasCalculator(numberVals, operationVals, ["bracketNumsTemp", "bracketNums", "bracketOps"])
  }
};

// Adds preventDefault to all buttons

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", (event) => {
    event.preventDefault();
  });
}

// Adds number addEventListener to all number buttons

for (let i = 0; i < numberButtonsArr.length; i++) {
  numberButtonsArr[i].addEventListener("click", (event) => {
    if (currentNumber.includes(".") && numberButtonsArr[i].innerHTML == ".") {
      alert("You can't have two decimal points in one number.");
    } else if (currentNumber.match(/[^$.\d]/g)) {
      alert("You cannot put a number after a special operator.");
    } else if (isBracketActive) {
      bracketNumsTemp += numberButtonsArr[i].innerHTML;
      displayOutput(bracketNumsTemp);
      smallDisplay();
    } else {
      currentNumber += numberButtonsArr[i].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
    }
  });
}

// Adds function addEventListener to all function buttons

for (let i = 0; i < basicFunctions.length; i++) {
  basicFunctions[i].addEventListener("click", (event) => {
    if (isBracketActive) {
      bracketNums.push(bracketNumsTemp);
      bracketOps.push(basicFunctions[i].innerHTML);
      fullString += bracketNumsTemp + basicFunctions[i].innerHTML;
      displayOutput(bracketNumsTemp);
      smallDisplay();
      clearValues(["bracketNumsTemp"]);
    } else if(fullString.charAt(fullString.length-1) == ")"){
      numberVals.push(currentNumber);
      operationVals.push(basicFunctions[i].innerHTML);
      fullString += basicFunctions[i].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
      clearValues(["currentNumber"]);
    } else {
      numberVals.push(currentNumber);
      operationVals.push(basicFunctions[i].innerHTML);
      fullString += currentNumber + basicFunctions[i].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
      clearValues(["currentNumber"]);
    }
  });
}

for (let i = 0; i < additionalFunctions.length; i++) {
  additionalFunctions[i].addEventListener("click", (event) => {
    let funcsInnerHtml = additionalFunctions[i].innerHTML;
    const specialCharacters = ["1/", "√", "10^", "e^"];
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
    } else if(funcsInnerHtml === "Type"){
        if(isBodmasUsed) {
          isBodmasUsed = false;
          document.getElementById("bodmasOrLtr").innerHTML = "LTR";
        } else {
          isBodmasUsed = true;
          document.getElementById("bodmasOrLtr").innerHTML = "BODMAS";
        }
    } else if(funcsInnerHtml === "LTR" || funcsInnerHtml === "BODMAS") {
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
    } else if (
      currentNumber.length === 0 ||
      (currentNumber[0] === "." && currentNumber.length === 1)
    ) {
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
}

// Adds function addEventListener to equals button

equalsButton.addEventListener("click", (event) => {
  if (currentNumber != "" && fullString[fullString.length-1] !== ")") {
    outputCalc(true);
  } else if(currentNumber != "" && fullString[fullString.length-1] == ")") {
    outputCalc(false);
  }
  else {
    alert("Please ensure the amount of operations and numbers match up!");
  }
});

// Calculate function used within equals

const calculate = (numberArr, operationsArr, outputValue, valsToClear) => {
  outputValue = Number(numberArr[0]);
  for (let i = 1; i < numberArr.length; i++) {
    if (operationsArr[i - 1] == "+") {
      outputValue += Number(numberArr[i]);
    } else if (operationsArr[i - 1] == "-") {
      outputValue = outputValue - Number(numberArr[i]);
    } else if (operationsArr[i - 1] == "/" && numberArr[i] != "0") {
      outputValue = outputValue / Number(numberArr[i]);
    } else if (operationsArr[i - 1] == "*") {
      outputValue = outputValue * Number(numberArr[i]);
    } else if (operationsArr[i - 1] == "/" && numberArr[i] == "0") {
      alert("Can't divide by 0!");
      clearValues(["outputNumber"]);
    }
  }
  clearValues(valsToClear);
  return [numberArr, operationsArr, outputValue];
};

// Adds function to each of the additional function buttons (CE, +/-, %)

for (let i = 0; i < additionalButtons.length; i++) {
  additionalButtons[i].addEventListener("click", (event) => {
    if (additionalButtons[i].id === "remove") {
      clearValues([
        "currentNumber",
        "outputNumber",
        "numberVals",
        "operationVals",
        "fullString",
        "bracketNums",
        "bracketOps",
        "bracketOutput",
        "bracketNumsTemp",
      ]);
      isBracketActive = false;
    } else if (additionalButtons[i].id === "percent") {
      outputNumber = document.getElementById("output__big").innerHTML * 0.01;
      currentNumber = (Number(currentNumber) / 100).toString();
    } else if (additionalButtons[i].id === "plusMinus") {
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
}

// BODMAS calculator

const bodmasCalculator = (numberArr, operationArr, valsToClear) => {
  const numberArrReduced = [...numberArr];
  const operationArrReduced = [...operationArr];
  let index = 0;
  while(numberArrReduced.length > 1) {
    if(operationArrReduced.includes("/")) {
      index = operationArrReduced.indexOf("/");
      numberArrReduced[index] = Number(numberArrReduced[index]) / Number(numberArrReduced[index + 1]);
    } else if(operationArrReduced.includes("*")) {
      index = operationArrReduced.indexOf("*");
      numberArrReduced[index] = Number(numberArrReduced[index]) * Number(numberArrReduced[index + 1]);
    } else if(operationArrReduced.includes("+")) {
      index = operationArrReduced.indexOf("+");
      numberArrReduced[index] = Number(numberArrReduced[index]) + Number(numberArrReduced[index + 1]);
    } else if(operationArrReduced.includes("-")) {
      index = operationArrReduced.indexOf("-");
      numberArrReduced[index] = Number(numberArrReduced[index]) - Number(numberArrReduced[index + 1]);
    }
    operationArrReduced.splice(index, 1);
    numberArrReduced.splice(index + 1, 1);
  } 
  clearValues(valsToClear);
  return numberArrReduced[0];
}