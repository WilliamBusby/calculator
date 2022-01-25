let currentNumber = "";
let numberVals = [];
let operationVals = [];
let outputNumber;

const numberButtonsArr = [...document.getElementsByClassName("numbers")];
const functionButtonsArr = [...document.getElementsByClassName("functions")];

const allButtons = document.getElementById("buttons");
const equalsButton = document.getElementById("equal");
const clearButton = document.getElementById("remove");
const plusMinus = document.getElementById("plusMinus");
const percent = document.getElementById("percent");

const displayOutput = (numberToDisplay) => {
  document.getElementById("output__number").innerHTML = numberToDisplay.toLocaleString();
}

displayOutput(0);

const clearValues = (valuesToClear) => {
  for(let i = 0; i < valuesToClear.length; i++) {
    if((valuesToClear[i]) === currentNumber) {
      currentNumber = "";
    } else if((valuesToClear[i]) === numberVals) {
      numberVals = [];
    } else if((valuesToClear[i]) === operationVals) {
      operationVals = [];
    } else if ((valuesToClear[i]) === outputNumber) {
      outputNumber = 0;
    }
  }
}

// allButtons.addEventListener("click", (event) => {
//   const eachButton = event.target;
//   eachButton.preventDefault();
// })

for (let i = 0; i < numberButtonsArr.length; i++) {
  numberButtonsArr[i].addEventListener("click", (event) => {
    if(currentNumber.includes(".") && numberButtonsArr[i].innerHTML == ".") {
      alert("You can't have two decimal points in one number!")
    } else {
      currentNumber += numberButtonsArr[i].innerHTML;
      displayOutput(currentNumber);
    }
  })
}

for (let i = 0; i < functionButtonsArr.length; i++) {
  functionButtonsArr[i].addEventListener("click", (event) => {
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[i].innerHTML);
    currentNumber = "";
  })
}

equalsButton.addEventListener("click", (event) => {
  calculate();
  displayOutput(outputNumber);
})

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
      clearValues([outputNumber, currentNumber, numberVals, operationVals]);
      return outputNumber;
    }
  }
  clearValues([currentNumber, numberVals, operationVals]);
  // return outputNumber;
}

clearButton.addEventListener("click", (event) => {
  clearValues([currentNumber,outputNumber,numberVals,operationVals]);
  displayOutput(0);
})

percent.addEventListener("click", (event) => {
  outputNumber = document.getElementById("output__number").innerHTML * 0.01;
  displayOutput(outputNumber);
})

plusMinus.addEventListener("click", (event) => {
  outputNumber = document.getElementById("output__number").innerHTML * -1;
  displayOutput(outputNumber);
})