let amount = document.querySelector("#amount");
let amountDiv = document.querySelector(".amount div");
let term = document.querySelector("#term");
let termDiv = document.querySelector(".term div");
let rate = document.querySelector("#rate");
let rateDiv = document.querySelector(".rate div");
let repayment = document.querySelector("#Repayment");
let interest = document.querySelector("#Interest");
let form = document.querySelector("form");
let msg = document.querySelectorAll(".msg");
let clear = document.querySelector(".clear");
let empty = document.querySelector(".empty");
let result = document.querySelector(".result");
let resultH1 = document.querySelector(".result h1");
let resultH2 = document.querySelector(".result h2");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  amountValidator(amount.value);
  termValidator(term.value);
  rateValidator(rate.value);
  typeValidator(repayment.checked, interest.checked);

  if (
    amount.value > 0 &&
    term.value > 0 &&
    rate.value > 0 &&
    repayment.checked + interest.checked > 0
  ) {
    empty.style.display = "none";
    result.style.display = "flex";
    calculate(
      amount.value,
      term.value,
      rate.value,
      repayment.checked,
      interest.checked
    );
  }
});

function amountValidator(amountvalue) {
  if (amountvalue <= 0) {
    msg[0].style.display = "block";
    amountDiv.classList.toggle("red");
  }
}

function termValidator(termvalue) {
  if (termvalue <= 0) {
    msg[1].style.display = "block";
    termDiv.classList.toggle("red");
  }
}

function rateValidator(ratevalue) {
  if (ratevalue <= 0) {
    msg[2].style.display = "block";
    rateDiv.classList.toggle("red");
  }
}

function typeValidator(repaymentchecked, interestChecked) {
  if (repaymentchecked + interestChecked == 0) {
    msg[3].style.display = "block";
  }
}

function calculate(amount, term, rate, repaymentchecked, interestChecked) {
  let monthlyPayment = 0;
  let totalRepayment = 0;
  if (repaymentchecked == 1) {
    rate = rate / 100;
    let monthlyRate = rate / 12;
    let n = term * 12;
    monthlyPayment =
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    totalRepayment = monthlyPayment * n;
  } else {
    let monthlyRate = rate / 12;
    monthlyPayment = (amount * monthlyRate) / 12;
    totalRepayment = monthlyPayment * term * 12;
  }
  resultH1.innerHTML = "&#163;" + monthlyPayment.toFixed(2);
  resultH2.innerHTML = "&#163;" + totalRepayment.toFixed(2);
}

function clearData() {
  amount.value = "";
  term.value = "";
  rate.value = "";
  msg.forEach(function (m) {
    m.style.display = "none";
  });
  amountDiv.classList.remove("red");
  termDiv.classList.remove("red");
  rateDiv.classList.remove("red");
  empty.style.display = "flex";  
  result.style.display = "none";
}

clear.addEventListener("click", clearData);
