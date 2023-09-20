"use strict";

/*------------------------------------DATA----------------------------------------
 */
const account1 = {
  owner: "Divyank Manjarwar",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2023-01-18T21:31:17.178Z",
    "2023-02-23T07:42:02.383Z",
    "2023-03-28T09:15:04.904Z",
    "2023-03-01T10:17:24.185Z",
    "2023-04-08T14:11:59.604Z",
    "2023-04-26T17:01:17.194Z",
    "2023-05-28T23:36:17.929Z",
    "2023-08-25T10:51:36.790Z",
  ],
  currency: "INR",
  local: "hi-IN",
};

const account2 = {
  owner: "Priyanshu Raj",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2023-01-01T13:15:33.035Z",
    "2023-02-30T09:48:16.867Z",
    "2023-03-25T06:04:23.907Z",
    "2023-04-25T14:18:46.235Z",
    "2023-06-05T16:33:06.386Z",
    "2023-07-10T14:43:26.374Z",
    "2023-08-25T18:49:59.371Z",
    "2023-08-26T12:01:20.894Z",
  ],
  currency: "USD",
  local: "en-US",
};

const account3 = {
  owner: "Satyam Singh",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2023-01-18T21:31:17.178Z",
    "2023-02-23T07:42:02.383Z",
    "2023-03-28T09:15:04.904Z",
    "2023-03-01T10:17:24.185Z",
    "2023-04-08T14:11:59.604Z",
    "2023-04-26T17:01:17.194Z",
    "2023-05-28T23:36:17.929Z",
    "2023-06-01T10:51:36.790Z",
  ],
  currency: "GBP",
  local: "en-GB",
};

const account4 = {
  owner: "Priyansh Manjarwar",
  movements: [430, 1000, 700, -50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2023-01-18T21:31:17.178Z",
    "2023-02-23T07:42:02.383Z",
    "2023-03-28T09:15:04.904Z",
    "2023-03-01T10:17:24.185Z",
    "2023-04-08T14:11:59.604Z",
  ],
  currency: "EUR",
  local: "fr-FR",
};
const account5 = {
  owner: "Osama Abdul Bin Laden",
  movements: [430, 1000, -700, -50, -690],
  interestRate: 1,
  pin: 5555,
  movementsDates: [
    "2023-01-18T21:31:17.178Z",
    "2023-02-23T07:42:02.383Z",
    "2023-03-28T09:15:04.904Z",
    "2023-03-01T10:17:24.185Z",
    "2023-04-08T14:11:59.604Z",
  ],
  currency: "PKR",
  local: "ur-PK",
};
const accounts = [account1, account2, account3, account4, account5];
/*------------------------------------ELEMENTS-----------------------------------
 */
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const btnLogin = document.querySelector(".login__btn");
const labelWelcome = document.querySelector(".welcome");
const containerApp = document.querySelector(".app");
const containerMovement = document.querySelector(".movements");
const labelBalance = document.querySelector(".balance__value");
const labelDate = document.querySelector(".balance__date");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const btnTransfer = document.querySelector(".form__btn--transfer");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const btnClose = document.querySelector(".form__btn--close");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const btnLoan = document.querySelector(".form__btn--loan");
const inputLoan = document.querySelector(".form__input--loan-amount");
const btnSort = document.querySelector(".btn--sort");
const labelTimer = document.querySelector(".timer");

/*--------------------------------------------------------FUNCTIONS-----------------------------------
 */
//Function for changing the currency
const formatCurr = function (value, currency, local) {
  return new Intl.NumberFormat(local, {
    style: "currency",
    currency: currency,
  }).format(value);
};
//----------------------------------------LOGIN----------------------------------------
//button
//Matching the username input with database
let currentAccount, timer;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("LOGIN");

    //Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Display UI and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;

    //Experimenting with API
    const currDate = new Date();
    const option = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      //weekday: "long",
    };
    //   const local = navigator.language;
    //   console.log(local);
    labelDate.textContent = `As of ${new Intl.DateTimeFormat(
      currentAccount.local,
      option
    ).format(currDate)}`;

    //Timer,checking whether already a timer is running or not,in case running clear it before logging in to
    //another account
    if (timer) clearInterval(timer);
    //then calling a fresh timer function
    timer = setLogOutTimer();
    updateUI();
  }
});
//----------------Calculating and printing the number of days passed
const formatMovementsDates = function (date, local) {
  const calcDaysPassed = (date1, date2) =>
    Math.trunc(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(local).format(date);
};
//-------------------------------------displayMovements--------------------------------------------------------
const displayMovements = function (acc, sort = false) {
  //Clearing out all the default elements
  containerMovement.innerHTML = "";
  console.log(acc.move);
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDates(date, acc.local);
    const formatted = formatCurr(mov, acc.currency, acc.local);
    const html = ` <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatted}</div>
        </div>`;

    containerMovement.insertAdjacentHTML("afterbegin", html);
  });
};
//-----------------------------------------------------------------------------------------------------------
//Adding the total sum in the account and displaying it in UI.
const calcDisplayBalance = function (accs) {
  accs.balance = accs.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = formatCurr(
    accs.balance,
    accs.currency,
    accs.local
  );
};

//-----------------------------------------------SUMMARY--------------------------------------------------------
//----------------------------------------------Credited--------------------------------------------------------
const calcDisplaySummary = function (accs) {
  //TOTAL CREDITED
  const incomes = accs.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${formatCurr(incomes, accs.currency, accs.local)}`;
  ///-----------------------------------------------TOTAL DEBITED-------------------------------------------------
  const out = Math.abs(
    accs.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov)
  );
  labelSumOut.textContent = `${formatCurr(out, accs.currency, accs.local)}`;
  //-----------------------------------------------TOTAL INTEREST-----------------------------------------------
  const interest = accs.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * accs.interestRate) / 100)
    //bank introduces new rule,interest lower than 1 will not be considered.
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${formatCurr(
    interest,
    accs.currency,
    accs.local
  )}`;
};

//---------------------------Creating UserNames for USERS.----------------------------
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

//--------------------------------------UI UPDATE-------------------------------------
const updateUI = function (acc) {
  //Display Movements
  displayMovements(currentAccount);
  //Display Balance
  calcDisplayBalance(currentAccount);
  //Display Summary
  calcDisplaySummary(currentAccount);
};
//--------------------------------------Transfer--------------------------------------
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    // Reflecting the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transaction date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Resetting the Timer
    //clearing the already running timer
    clearInterval(timer);
    //starting it again
    timer = setLogOutTimer();

    //Updating the UI
    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
});
//--------------------------------------------LOAN-----------------------------------
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoan.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov > amount * 0.1)
  ) {
    setTimeout(function () {
      //Updating the movement array
      currentAccount.movements.push(amount);

      //Adding the date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Updating the UI
      updateUI(currentAccount);
      //Resetting the Timer
      //clearing the already running timer
      clearInterval(timer);
      //starting it again
      timer = setLogOutTimer();
    }, 2500);
  }
  inputLoan.value = "";
});
//----------------------------------------CLOSING ACCOUNT--------------------------------
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
});

//---------------------------------------------SORTING----------------------------------------------------------
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//---------------------------------------TIMEOUT FUNCTION------------------------------------------------------
const setLogOutTimer = function () {
  //set a starting timer value
  let time = 300;
  //putting the function in order to start the timer right from the start and not after delay of 1 sec.
  const tick = function () {
    let minute = String(Math.trunc(time / 60)).padStart(2, "0");
    let second = String(Math.trunc(time % 60)).padStart(2, "0");
    labelTimer.textContent = `${minute}:${second}`;

    //Logging out after time === 0
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }
    //Decreasing 1 second
    time--;
  };

  //calling the function imediately.
  tick();
  //call the tick second every second
  const timer = setInterval(tick, 1000);
  return timer;
};
//------------------------------------------------------------------------------------------------------------
//USING Array.from() on querySelectorAll() to convert it into an array inorder to use
//array methods on it
labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => el.textContent.replace("€", "")
  );
  console.log(movementsUI);
});

//--------------------------------DATE AND TIME---------------------------
// labelDate.textContent = `As of ${`${currDate.getDate()}`.padStart(2, 0)}/${`${
//   currDate.getMonth() + 1
// }`.padStart(
//   2,
//   0
// )}/${currDate.getFullYear()}, ${`${currDate.getHours()}`.padStart(
//   2,
//   0
// )}:${`${currDate.getMinutes()}`.padStart(2, 0)}`;

/*We can convert 'querySelectorAll' into an array by spread operator too*/

//---------------------------------ARRAY PRACTICE------------------------------------

//1.)Checking the final amount depsited in bank
const deposited = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, dep) => acc + dep, 0);
console.log(deposited);

//2.) Checking no. of deposits above 1000
const dep1000 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .filter((mov) => mov > 1000);
console.log(dep1000);

//using reduce

const dep1000r = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((count, mov) => (mov >= 1000 ? count + 1 : count), 0);
console.log(dep1000r);

//3.) Getting an object with 'deposit' and 'withdrawal'
const { deposit, withdrawal } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, curr) => {
      //curr > 0 ? (sums.deposit += curr) : (sums.withdrawal += curr);
      sums[curr > 0 ? "deposit" : "withdrawal"] += curr;
      return sums;
    },
    { deposit: 0, withdrawal: 0 }
  );
console.log(deposit, withdrawal);

//4.} Creating a string into a title string
const Capitalize = function (str) {
  const capitalise = (str) => str[0].toUpperCase() + str.slice(1);
  const exceptions = ["a", "an", "the", "and", "but", "on", "or", "in", "with"];
  const titleCase = str
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalise(word)))
    .join(" ");
  return capitalise(titleCase);
};
console.log(Capitalize("story of the great leader"));
console.log(Capitalize("the greAT WalL oF cHINA"));
