import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("Executed init()");

  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const API_URL = `${config.backendEndpoint}/cities`;
    const res = await fetch(API_URL);
    const data = (await res.json()) || [];
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const data = document.getElementById("data");
  const cardHtml = `<div class="col-12 col-sm-6 col-lg-3 mb-4" id="${id}">
                      <a href="pages/adventures/?city=${city}" class="tile">
                        <img loading="lazy" src="${image}" />
                        <div class="tile-text text-center">
                          <div class="fs-5">${city}</div>
                          <div class="fs-6">${description}</div>
                        </div>
                      </a>
                    </div>`;
  data.innerHTML += cardHtml;
}

export { init, fetchCities, addCityToDOM };
