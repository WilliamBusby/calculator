let currentNumber = "";
let numberVals = [];
let operationVals = [];
let outputNumber;

const numberButtons = document.getElementsByClassName("numbers");
const numberButtonsArr = [...numberButtons];

const functionButtons = document.getElementsByClassName("functions");
const functionButtonsArr = [...functionButtons];

const equalsButton = document.getElementById("equal");
let outputHTMLNumber = document.getElementById("output__number");
const clearButton = document.getElementById("remove");

for (let i = 0; i < numberButtonsArr.length; i++) {
  numberButtonsArr[i].addEventListener("click", (event) => {
    event.preventDefault();
    if(currentNumber.includes(".") && numberButtonsArr[i].innerHTML == ".") {
      alert("You can't have two decimal points in one number!")
    } else {
      currentNumber += numberButtonsArr[i].innerHTML;
      document.getElementById("output__number").innerHTML = currentNumber;
    }
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
  document.getElementById("output__number").innerHTML = outputNumber;
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
}

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  currentNumber = "";
  document.getElementById("output__number").innerHTML = 0;
})