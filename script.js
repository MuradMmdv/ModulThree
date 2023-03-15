

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
      li.style.color = li.dataset.currency === fromCurrency ? "white" : "#C6C6C6";

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
      li.style.color = li.dataset.currency === toCurrency ? "white" : "#C6C6C6";

      // li.addEventListener("mouseenter", function() {
      //   li.style.color = "white";
      //   li.style.backgroundColor = "#833AE0";

      // });
      
      // li.addEventListener("mouseleave", function() {
      //   li.style.color = "#C6C6C6";
      //   li.style.backgroundColor = "white";

      // });
    });
    
    // dəyiş
    convertCurrency();
  }
});

// inputlarda dəyişiklik
fromCurrencyInput.addEventListener("input", convertCurrency);

// dönüşdür
function convertCurrency() {
  // 0 olsa o qəbul elə
  const fromValue = fromCurrencyInput.value ;
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
      //günün kursunu yazdır
let valueTodayElementOne = document.getElementById("value-today-one");
  valueTodayElementOne.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;

  let fromValueToday = 1 / rate
let valueTodayElementTwo = document.getElementById("value-today-two");
  valueTodayElementTwo.textContent = `1 ${toCurrency} = ${fromValueToday.toFixed(4)} ${fromCurrency}`;
console.log(data.rates);
    })
    .catch((error) => {
      console.log(error);
    });
}




