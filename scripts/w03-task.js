/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2) {
  return number1 + number2;
}

function addNumbers() {
  let addNumber1 = Number(document.querySelector("#add1").value);
  let addNumber2 = Number(document.querySelector("#add2").value);
  let sum = add(addNumber1, addNumber2);
  let answerField = document.querySelector("#sum");
  answerField.value = sum;
}

document.querySelector("#addNumbers").addEventListener("click", addNumbers);

/* Function Expression - Subtract Numbers */
function sub(number1, number2) {
  return number1 - number2;
}

function subNumbers() {
  let subNumber1 = Number(document.querySelector("#subtract1").value);
  let subNumber2 = Number(document.querySelector("#subtract2").value);
  let dif = sub(subNumber1, subNumber2);
  let answerField = document.querySelector("#difference");
  answerField.value = dif;
}

document
  .querySelector("#subtractNumbers")
  .addEventListener("click", subNumbers);

/* Arrow Function - Multiply Numbers */

let multiply = (number1, number2) => number1 * number2;

const multiplyNumbs = () => {
  let mulNumber1 = Number(document.querySelector("#factor1").value);
  let mulNumber2 = Number(document.querySelector("#factor2").value);
  let prod = multiply(mulNumber1, mulNumber2);
  let answerField = document.querySelector("#product");
  answerField.value = prod;
};

document
  .querySelector("#multiplyNumbers")
  .addEventListener("click", multiplyNumbs);
/* Open Function Use - Divide Numbers */

let divide = (number1, number2) => number1 / number2;

const divideNumbs = () => {
  let divNumber1 = Number(document.querySelector("#dividend").value);
  let divNumber2 = Number(document.querySelector("#divisor").value);
  let quot = divide(divNumber1, divNumber2);
  let answerField = document.querySelector("#quotient");
  answerField.value = quot;
};

document.querySelector("#divideNumbers").addEventListener("click", divideNumbs);
/* Decision Structure */

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
document.querySelector("#year").textContent = currentYear;

/* ARRAY METHODS - Functional Programming */

let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

/* Output Source Array */
document.querySelector("#array").textContent = numbersArray;
/* Output Odds Only Array */
let numbersArrayOdd = numbersArray.filter((val) => val % 2 !== 0);
document.querySelector("#odds").textContent = numbersArrayOdd;
/* Output Evens Only Array */
let numbersArrayEven = numbersArray.filter((val) => val % 2 === 0);
document.querySelector("#evens").textContent = numbersArrayEven;
/* Output Sum of Org. Array */
let sum = numbersArray.reduce((sum, numb) => sum + numb);
document.querySelector("#sumOfArray").textContent = sum;
/* Output Multiplied by 2 Array */
let prod = numbersArray.map((numb) => numb * 2);
document.querySelector("#multiplied").textContent = prod;
/* Output Sum of Multiplied by 2 Array */
let sumOfMult = prod.reduce((sum, numb) => sum + numb);
document.querySelector("#sumOfMultiplied").textContent = sumOfMult;

//Selection Structures? Didn't see this in the assignment but it exists so I could use this later?

// set up with a 25% discout for members
let total = (subtotal, status) => {
  if (subtotal) {
    console.log("pass");
    if (status) {
      return `$${(subtotal - subtotal * 0.25).toFixed(2)}`;
    } else {
      return `$${subtotal.toFixed(2)}`;
    }
  } else {
    return `$ --.--`;
  }
};

let totalCalc = () => {
  let subTotalValue = document.querySelector("#subtotal").value;
  let subTotal = parseFloat(subTotalValue); // Convert string to float
  let clubMember = document.querySelector("#member").checked;
  document.querySelector("#total").textContent = total(subTotal, clubMember);
};

document.querySelector("#getTotal").addEventListener("click", totalCalc);
