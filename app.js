// Defining global variables used within javascript functions

let currentNumber = "";
let numberVals = [];
let operationVals = [];
let outputNumber = 0;
let fullString = "";
let memory = 0;

// Getting information from HTML document

const numberButtonsArr = [...document.getElementsByClassName("numbers")];
const basicFunctions = [...document.getElementsByClassName("basic")];
const additionalButtons = [...document.getElementsByClassName("lightgrey")];
const allButtons = document.querySelectorAll("button");
const equalsButton = document.getElementById("equal");
const additionalFunctions = [...document.getElementsByClassName("extraFunctions")];
const memoryButtons = [...document.getElementsByClassName("memory")];

// Function to display output to main display & run once on open page

const displayOutput = (numberToDisplay) => {
  document.getElementById("output__big").innerHTML = numberToDisplay.toLocaleString();
}

displayOutput(0);

// Function to display full equation

const smallDisplay = () => {
  document.getElementById("output__small").innerHTML = fullString;
}

// Function to clear global variables in input array

const clearValues = (valuesToClear) => {
  for(let i = 0; i < valuesToClear.length; i++) {
    if((valuesToClear[i]) == "currentNumber") {
      currentNumber = "";
    } else if((valuesToClear[i]) == "numberVals") {
      numberVals = [];
    } else if((valuesToClear[i]) == "operationVals") {
      operationVals = [];
    } else if ((valuesToClear[i]) == "outputNumber") {
      outputNumber = 0;
    } else if((valuesToClear[i]) == "fullString") {
      fullString = "";
    }
  }
}

// Adds special operators calculation

const specialFunctionsChecker = () => {
  for(let i = 0; i < numberVals.length; i++) {
    if(numberVals[i].match(/[^$.\d]/g)) {
      numberVals[i] = specialFunctionsCalculator(numberVals[i]);
    }
  }
}

const specialFunctionsCalculator = (inputNumber) => {
  let outputNumber = 0;
  if(inputNumber.includes("!")) {
    inputNumberNoAlpha = inputNumber.replace("!","");
    outputNumber = factorialCalc(inputNumberNoAlpha);
  } else if(inputNumber.includes("^2")) {
    inputNumberNoAlpha = inputNumber.replace("^2","");
    outputNumber = (inputNumberNoAlpha) ** 2;
  } else if(inputNumber.includes("^3")) {
    inputNumberNoAlpha = inputNumber.replace("^3","");
    outputNumber = (inputNumberNoAlpha) ** 3;
  } else if(inputNumber.includes("1/") && inputNumber.replace("1/","") !== 0) {
    inputNumberNoAlpha = inputNumber.replace("1/","");
    outputNumber = 1/(inputNumberNoAlpha);
  } else if(inputNumber.includes("√") && inputNumber.replace("√","") >= 0) {
    inputNumberNoAlpha = inputNumber.replace("√","");
    outputNumber = Math.sqrt((inputNumberNoAlpha));
  } else if(inputNumber.includes("10^")) {
    inputNumberNoAlpha = inputNumber.replace("10^","");
    outputNumber = 10 ** (inputNumberNoAlpha);
  } else if(inputNumber.includes("e^")) {
    inputNumberNoAlpha = inputNumber.replace("e^","");
    outputNumber = Math.E ** (inputNumberNoAlpha);
  }
  return outputNumber;
}

const factorialCalc = (num) => {
  if (num < 0) 
    return -1;
  else if (num == 0) 
    return 1;
  else {
    return (num * factorialCalc(num - 1));
  }
}

// To calculate the output

const outputCalc = () => {
  fullString += currentNumber + " =";
  smallDisplay();
  numberVals.push(currentNumber);
  specialFunctionsChecker();
  calculate();
  displayOutput(outputNumber);
}

// Adds preventDefault to all buttons

for(let i= 0; i< allButtons.length; i++) {
  allButtons[i].addEventListener("click", (event) => {
    event.preventDefault();
  })
}

// Adds number addEventListener to all number buttons

for (let i = 0; i < numberButtonsArr.length; i++) {
  numberButtonsArr[i].addEventListener("click", (event) => {
    if(currentNumber.includes(".") && numberButtonsArr[i].innerHTML == ".") {
      alert("You can't have two decimal points in one number.");
    } else if(currentNumber.match(/[^$.\d]/g)) {
      alert("You cannot put a number after a special operator.")
    } else {
      currentNumber += numberButtonsArr[i].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
    }
  })
}

// Adds function addEventListener to all function buttons

for (let i = 0; i < basicFunctions.length; i++) {
  basicFunctions[i].addEventListener("click", (event) => {
    numberVals.push(currentNumber);
    operationVals.push(basicFunctions[i].innerHTML);
    fullString += currentNumber + basicFunctions[i].innerHTML;
    displayOutput(currentNumber);
    smallDisplay();
    clearValues(["currentNumber"]);
  })
}

for (let i = 0; i < additionalFunctions.length; i++) {
  additionalFunctions[i].addEventListener("click", (event) => {
    let funcsInnerHtml = additionalFunctions[i].innerHTML;
    const specialCharacters = ["1/", "√", "10^", "e^"]
    if(currentNumber.match(/[^$.\d]/g)) {
      alert("You currently can't have 2 special operators on a number.")
    } else if(funcsInnerHtml === "M-") {
      memory = 0;
    } else if(funcsInnerHtml === "M") {
      currentNumber = String(memory);
      displayOutput(currentNumber);
    } else if(funcsInnerHtml === "M+") {
      outputCalc();
      memory = outputNumber;
    } else if(currentNumber.length === 0 || (currentNumber[0] === "." && currentNumber.length === 1)){
      alert("You have to input the number before the special operator.")
    } else if(specialCharacters.includes(funcsInnerHtml)) {
      currentNumber = funcsInnerHtml + currentNumber;
      displayOutput(currentNumber);
      smallDisplay();
    } else {
      currentNumber += funcsInnerHtml;
      displayOutput(currentNumber);
      smallDisplay();
    }
  })
}

// Adds function addEventListener to equals button

equalsButton.addEventListener("click", (event) => {
  if(currentNumber != "") {
    outputCalc();
  } else {
    alert("Please ensure the amount of operations and numbers match up!");
  }

})

// Calculate function used within equals

const calculate = () => {
  outputNumber = Number(numberVals[0]);
  for(let i = 1; i < numberVals.length; i++) {
    if(operationVals[i-1] == "+") {
      outputNumber += Number(numberVals[i]);
    } else if(operationVals[i-1] == "-") {
      outputNumber = outputNumber - Number(numberVals[i]);
    } else if(operationVals[i-1] == "/" && numberVals[i] != "0") {
      outputNumber = outputNumber / Number(numberVals[i]);
    } else if(operationVals[i-1] == "*") {
      outputNumber = outputNumber * Number(numberVals[i]);
    } else if(operationVals[i-1] == "/" && numberVals[i] == "0") {
      alert("Can't divide by 0!");
      clearValues(["outputNumber"]);
    }
  }
  clearValues(["currentNumber","numberVals", "operationVals", "fullString"]);
}

// Adds function to each of the additional function buttons (CE, +/-, %)

for(let i = 0; i < additionalButtons.length; i++) {
  additionalButtons[i].addEventListener("click", (event) => {
    if(additionalButtons[i].id === "remove") {
      clearValues(["currentNumber", "outputNumber", "numberVals", "operationVals", "fullString"]);
    } else if(additionalButtons[i].id === "percent") {
      outputNumber = document.getElementById("output__big").innerHTML * 0.01;
      currentNumber = (Number(currentNumber)/100).toString();
    } else if(additionalButtons[i].id === "plusMinus") {
      outputNumber = document.getElementById("output__big").innerHTML * -1;
        if(currentNumber.charAt(0) !== "-"){
          currentNumber = "-" + currentNumber;
        } else {
          currentNumber = currentNumber.substring(1);
        }
    }
    displayOutput(outputNumber);
    smallDisplay();
  })
}

// for(let i = 0; i< memoryButtons.length; i++) {
//   memoryButtons[i].addEventListener("click", (event) => {
//     if(memoryButtons[i].id === "memoryPlus") {
//       outputCalc();
//       memory = outputNumber;
//     } else if(memoryButtons[i].id === "memoryMinus") {
//       memory = 0;
//     } else if(memoryButtons[i].id === "memory") {
//       currentNumber = String(memory);
//     }
//   })
// }