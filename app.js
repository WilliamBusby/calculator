let currentNumber = 0;
const numberVals = [];
const operationVals = [];
let outputNumber = 0;

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
    console.log(currentNumber)
  })
}


for (let i = 0; i < functionButtonsArr.length; i++) {
  functionButtonsArr[i].addEventListener("click", (event) => {
    event.preventDefault();
    numberVals.push(currentNumber);
    operationVals.push(functionButtonsArr[i]);
    currentNumber = 0;
  })
}

equalsButton.addEventListener("click", (event) => {
  event.preventDefault();
  calculate();
})

const calculate = () => {
  
}