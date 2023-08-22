"use strict";

/*------------------------------------DATA----------------------------------------
 */
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];
/*------------------------------------ELEMENTS-----------------------------------
 */
const inputLoginUsername = document.querySelector(".form__input--user");
const inputLoginPin = document.querySelector(".form__input--pin");
const btnLogin = document.querySelector(".login__btn");
const containerMovement = document.querySelector(".movements");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");

/*------------------------------------FUNCTIONS-----------------------------------
 */

const displayMovements = function (movements) {
  //Clearing out all the default elements
  containerMovement.innerHTML = "";

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = ` <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } deposit</div>
          <div class="movements__value">${Math.abs(mov)}</div>
        </div>`;

    containerMovement.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

//Adding the total sum in the account and displaying it in UI.
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${balance}EURO`;
};
calcDisplayBalance(account1.movements);

//Summary
//Credited
const calcDisplaySummary = function (movements) {
  //TOTAL CREDITED
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;
  //TOTAL DEBITED
  const out = Math.abs(
    movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov)
  );
  labelSumOut.textContent = `${out}€`;
  //TOTAL INTEREST
  const interest = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * 1.2) / 100)
    //bank introduces new rule,interest lower than 1€ will not be considered.
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);

//Creating UserNames for USERS.
//Shobit Raj = sr
const createUsernames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
console.log(account1.username);
console.log(accounts);
// createUsernames();
//-----------LOGIN---------------
//button
//Matching the username input with database
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log("LOGIN");
  console.log(currentAccount);
  // if (currentAccount.pin === Number(inputLoginPin.value)) console.log("LOGIN");
});
