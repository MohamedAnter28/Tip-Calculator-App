const billAmount = document.querySelector('#billAmount');
const options = Array.from(document.querySelectorAll('.options input'));
let selectStatus = false;
const personNums = document.querySelector('#personNums');
const customTip = document.querySelector('#customTip');
const tipAmountDisplay = document.querySelector('.amount');
const totalDisplay = document.querySelector('.total');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mainInput').forEach((input) => {
    input.addEventListener('focus', (e) => {
      e.currentTarget.parentElement.classList.add('active');
    });
  });

  document.querySelectorAll('.mainInput').forEach((input) => {
    input.addEventListener('blur', (e) => {
      e.currentTarget.parentElement.classList.remove('active');
      if (e.currentTarget.value.trim() === '') {
        e.currentTarget.parentElement.classList.add('error');
      }else if (e.currentTarget.value.trim() === 0){
        e.currentTarget.parentElement.classList.add('error');
      } else {
        e.currentTarget.parentElement.classList.remove('error');
      }

    });
  });

  options.forEach((input) => {
    input.addEventListener('click', (e) => {
      options.forEach((input) => {
        input.classList.remove('active');
      });
      e.target.classList.add('active');
      checkSelection();
    });
  });

  customTip.addEventListener('blur', (e) => {
    if (customTip.value.trim() === '') {
      e.target.classList.remove('active');
    } else {
      e.target.classList.add('active');
    }
  });

  function checkSelection() {
    const activeOptions = options.filter((input) =>
      input.classList.contains('active')
    );
    selectStatus = activeOptions.length === 1;
  }

  function validateInputs() {
    if (billAmount.value.trim() && personNums.value.trim() > 0 && selectStatus) {
      calculateTip();
    }
  }

  [billAmount, personNums, customTip].forEach((input) => {
    input.addEventListener('input', validateInputs);
  });
});

function calculateTip() {
  document.querySelector('.btn').classList.remove('disabled');
  const bill = parseFloat(billAmount.value.trim()) || 0;
  const people = parseInt(personNums.value.trim()) || 1;
  let tipPercentage = 0;

  options.forEach((input) => {
    if (input.classList.contains('active')) {
      tipPercentage = parseFloat(input.value) / 100;
    }
  });

  if (customTip.value.trim() !== '') {
    tipPercentage = parseFloat(customTip.value) / 100;
  }

  function updateDisplay() {
    const tipAmount = (bill * tipPercentage) / people;
    const total = bill / people + tipAmount;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalDisplay.textContent = `$${total.toFixed(2)}`;
  }

  updateDisplay();
}

document.querySelector('.btn').addEventListener("click",(e) => {
  resetForm()
})

function resetForm() {

  billAmount.value = '';
  personNums.value = '';
  customTip.value = '';

  
  options.forEach((input) => {
    input.classList.remove('active');
  });

  
  tipAmountDisplay.textContent = '$0.00';
  totalDisplay.textContent = '$0.00';

  
  document.querySelector('.btn').classList.add('disabled');
}
