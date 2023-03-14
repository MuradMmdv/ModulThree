

const ulSectionOne = document.getElementById("ul-section-one");
const ulSectionTwo = document.getElementById("ul-section-two");
const fromCurrencyInput = document.getElementById("from-currency");
const toCurrencyInput = document.getElementById("to-currency");

// default seçimlər
let fromCurrency = "";
let toCurrency = "";

// ul-section-one üçün event listener
ulSectionOne.addEventListener("click", (event) => {
  // event.target bir li elementi kimi
  if (event.target.matches("li.money")) {
    // seçilen pul vahidi
    fromCurrency = event.target.dataset.currency;
    // background rəngini dəyiş
    ulSectionOne.querySelectorAll("li.money").forEach((li) => {
      li.style.backgroundColor = li.dataset.currency === fromCurrency ? "#833AE0" : "white";
    });
    // dönüştür
    convertCurrency();
  }
});

// ul-section-two üçün event listener
ulSectionTwo.addEventListener("click", (event) => {
  // event.target bir li elementi kimi
  if (event.target.matches("li.money")) {
    // seçilen pul vahidi
    toCurrency = event.target.dataset.currency;

    // background rengini dəyiş
    ulSectionTwo.querySelectorAll("li.money").forEach((li) => {
      li.style.backgroundColor = li.dataset.currency === toCurrency ? "#833AE0" : "white";
    });
    // dəyiş
    convertCurrency();
  }
});

// inputlarda dəyişiklik
fromCurrencyInput.addEventListener("input", convertCurrency);
toCurrencyInput.addEventListener("input", convertCurrency);

// dönüşdür
function convertCurrency() {
  // 0 olsa o qəbul elə
  const fromValue = fromCurrencyInput.value === "" ? 0 : parseFloat(fromCurrencyInput.value);
  const toValue = toCurrencyInput.value === "" ? 0 : parseFloat(toCurrencyInput.value);
  // APIdən məlumatları al
  fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.rates);
      // rate ilə dəyəri al
      let rate = data.rates[toCurrency];
      let convertedValue = fromValue * rate;
      // inputa yazdır
      toCurrencyInput.value = convertedValue.toFixed(2);
let valueTodayElementOne = document.getElementById("value-today-one");
if (valueTodayElementOne) {
  let	 toValueToday = data.rates[toCurrency];
  valueTodayElementOne.textContent = `1 ${fromCurrency} = ${toValueToday.toFixed(4)} ${toCurrency}`;
}
let valueTodayElementTwo = document.getElementById("value-today-two");
if (valueTodayElementTwo) {
  let fromValueToday =  data.rates[fromCurrency];
  valueTodayElementTwo.textContent = `1 ${toCurrency} = ${toValue.toFixed(4)} ${fromCurrency}`;
}
console.log(data.rates);
    })
    .catch((error) => {
      console.log(error);
    });
}




