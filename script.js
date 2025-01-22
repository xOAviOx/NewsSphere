import { API_KEY } from "./api.js";
const from = flatpickr("#datepickerFrom", {
  dateFormat: "Y-m-d", // Format like 2025-01-01
});
const to = flatpickr("#datepickerTo", {
  dateFormat: "Y-m-d", // Format like 2025-01-01
});

const fromdate = from.input.value;
const todate = to.input.value;
console.log(fromdate, todate);
const getData = async function (query) {
  const resp = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&from=2025-01-21&to=2025-01-21&sortBy=popularity&apiKey=${API_KEY}`
  );
  const data = await resp.json();
  console.log(data);
  console.log(data.articles);
};
getData("trump");
