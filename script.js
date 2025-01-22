import { API_KEY } from "./api.js";
const button = document.querySelector(".btn");
const input = document.getElementById("search");
const card = document.querySelector(".card");
const container = document.querySelector(".container");

const from = flatpickr("#datepickerFrom", {
  dateFormat: "Y-m-d", // Format like 2025-01-01
});
const to = flatpickr("#datepickerTo", {
  dateFormat: "Y-m-d", // Format like 2025-01-01
});

button.addEventListener("click", function () {
  let query = input.value;
  let fromdate = from.input.value;
  let todate = to.input.value;
  console.log(fromdate, todate);
  getData(query, fromdate, todate);
  input.value = from.input.value = to.input.value = "";
});

const getData = async function (query, fromdate, todate) {
  const resp = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&from=${fromdate}&to=${todate}&sortBy=popularity&apiKey=${API_KEY}`
  );
  const data = await resp.json();
  console.log(data);
  console.log(data.articles);
  generateMarkup(data);
};

const generateMarkup = function (data) {
  container.innerHTML = "";

  data.articles.forEach((news) => {
    const newNews = {
      image: news.urlToImage,
      title: news.title,
      description: news.description,
      url: news.url,
      source: news.source.name,
    };
    const html = `
    <div class="card">
            <img src=${newNews.image} alt="News" />
            <div class="card-content">
              <h3>${newNews.title}</h3>
              <p>
                ${newNews.description}
              </p>
               <p class="source">Source: ${newNews.source}</p>
              <a href=${newNews.url}>Read More</a>
            </div>
          </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
};
