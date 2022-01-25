// Defining global variables used within javascript functions

let currentNumber = "";
let numberVals = [];
let operationVals = [];
let outputNumber = 0;
let fullString = "";

// Getting information from HTML document

const numberButtonsArr = [...document.getElementsByClassName("numbers")];
const functionButtonsArr = [...document.getElementsByClassName("functions")];
const additionalButtons = [...document.getElementsByClassName("lightgrey")];
const allButtons = document.querySelectorAll("button");
const equalsButton = document.getElementById("equal");

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
      alert("You can't have two decimal points in one number!")
    } else {
      currentNumber += numberButtonsArr[i].innerHTML;
      fullString += numberButtonsArr[i].innerHTML;
      displayOutput(currentNumber);
      smallDisplay();
    }
  })
}

// Adds function addEventListener to all function buttons

for (let i = 0; i < functionButtonsArr.length; i++) {
  functionButtonsArr[i].addEventListener("click", (event) => {
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[i].innerHTML);
    fullString += functionButtonsArr[i].innerHTML;
    clearValues(["currentNumber"])
    smallDisplay();
    displayOutput(0);
  })
}

// Adds function addEventListener to equals button

equalsButton.addEventListener("click", (event) => {
  calculate();
  smallDisplay();
  displayOutput(outputNumber);
})

// Calculate function used within equals

const calculate = () => {
  numberVals.push(currentNumber);
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
      clearValues(["outputNumber", "currentNumber", "numberVals", "operationVals", "fullString"]);
    }
  }
  clearValues(["currentNumber", "numberVals", "operationVals", "fullString"]);
}

// Adds function to each of the additional function buttons (CE, +/-, %)

for(let i = 0; i < additionalButtons.length; i++) {
  additionalButtons[i].addEventListener("click", (event) => {
    if(additionalButtons[i].id == "remove") {
      clearValues(["currentNumber", "outputNumber", "numberVals", "operationVals", "fullString"]);
    } else if(additionalButtons[i].id == "percent") {
      outputNumber = document.getElementById("output__big").innerHTML * 0.01;
    } else if(additionalButtons[i].id == "plusMinus") {
      outputNumber = document.getElementById("output__big").innerHTML * -1;
    }
    displayOutput(outputNumber);
    smallDisplay();
  })
}