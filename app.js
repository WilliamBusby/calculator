let currentNumber;
let numberVals = [];
let operationVals = [];
let outputNumber;

const numberButtons = document.getElementsByClassName("numbers");
const numberButtonsArr = [...numberButtons];

const functionButtons = document.getElementsByClassName("functions");
const functionButtonsArr = [...functionButtons];

const equalsButton = document.getElementById("equal");

const clearButton = document.getElementById("remove");

for (let i = 0; i < numberButtonsArr.length; i++) {
  numberButtonsArr[i].addEventListener("click", (event) => {
    event.preventDefault();
    currentNumber += numberButtonsArr[i].innerHTML;
    // console.log(currentNumber)
  })
}


for (let i = 0; i < functionButtonsArr.length; i++) {
  functionButtonsArr[i].addEventListener("click", (event) => {
    event.preventDefault();
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[i].innerHTML);
    currentNumber = "";
  })
}

equalsButton.addEventListener("click", (event) => {
  event.preventDefault();
  calculate();
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
    }
  }
  currentNumber = "";
  numberVals = [];
  operationVals = [];
  console.log(outputNumber)
  return outputNumber;
}

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  currentNumber = "";
})