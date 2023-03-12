

const ulSectionOne = document.getElementById("ul-section-one");
const ulSectionTwo = document.getElementById("ul-section-two");
const fromCurrencyInput = document.getElementById("from-currency");
const toCurrencyInput = document.getElementById("to-currency");

// varsayılan para birimleri
let fromCurrency = "USD";
let toCurrency = "RUB";

// ul-section-one için event listener
ulSectionOne.addEventListener("click", (event) => {
  // event.target bir li elementi olduğundan emin olun
  if (event.target.matches("li.money")) {
    // seçilen para birimini al
    fromCurrency = event.target.dataset.currency;
    // background rengini değiştir
    ulSectionOne.querySelectorAll("li.money").forEach((li) => {
      li.style.backgroundColor = li.dataset.currency === fromCurrency ? "#833AE0" : "white";
    });
    // para birimi dönüştürme işlemini yap
    convertCurrency();
  }
});

// ul-section-two için event listener
ulSectionTwo.addEventListener("click", (event) => {
  // event.target bir li elementi olduğundan emin olun
  if (event.target.matches("li.money")) {
    // seçilen para birimini al
    toCurrency = event.target.dataset.currency;
    // background rengini değiştir
    ulSectionTwo.querySelectorAll("li.money").forEach((li) => {
      li.style.backgroundColor = li.dataset.currency === toCurrency ? "#833AE0" : "white";
    });
    // para birimi dönüştürme işlemini yap
    convertCurrency();
  }
});

// inputlarda değer değiştiğinde otomatik çevirme işlemi yap
fromCurrencyInput.addEventListener("input", convertCurrency);
toCurrencyInput.addEventListener("input", convertCurrency);

// para birimi dönüştürme işlemini yap
function convertCurrency() {
  // eğer girdi boş ise 0 kabul et
  const fromValue = fromCurrencyInput.value === "" ? 0 : parseFloat(fromCurrencyInput.value);
  const toValue = toCurrencyInput.value === "" ? 0 : parseFloat(toCurrencyInput.value);
  // API'den oranı al
  fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      // oranı kullanarak para birimini dönüştür
      const rate = data.rates[toCurrency];
      const convertedValue = fromValue * rate;
      // dönüştürülmüş değeri diğer inputa yaz
      toCurrencyInput.value = convertedValue.toFixed(2);
const valueTodayElement = document.getElementById("value-today");
if (valueTodayElement) {
  const fromValueToday = data.rates[fromCurrency];
  const toValueToday = data.rates[toCurrency];
  valueTodayElement.textContent = `1 ${fromCurrency} = ${toValueToday.toFixed(4)} ${toCurrency}, 1 ${toCurrency} = ${fromValueToday.toFixed(4)} ${fromCurrency}`;
}
    })
    .catch((error) => {
      console.log(error);
    });
}




// const valueTodayElements = document.querySelectorAll('#value-today');
// valueTodayElements.forEach(element => {
//   element.innerText = `1 ${document.querySelector('#ul-section-one .active').dataset.currency} = ${await getExchangeRates(document.querySelector('#ul-section-one .active').dataset.currency, document.querySelector('#ul-section-two .active').dataset.currency).toFixed(4)} ${document.querySelector('#

