import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const params = new URLSearchParams();
    params.append("city", city.toLowerCase());
    const API_URL = `${config.backendEndpoint}/adventures?${params}`;
    const res = await fetch(API_URL);
    const data = (await res.json()) || [];
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures = []) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataElem = document.getElementById("data");
  adventures.forEach((x) => {
    const params = new URLSearchParams();
    params.append("adventure", x.id);
    dataElem.innerHTML += `
    <a class="col-6 col-lg-3 p-3" id="${x.id}" href="detail/?${params}">
            <div class="adventure-detail-card" >
              <div class="adventure-detail-card-image">
                <img src="${x.image}" alt="image" width="100%" height="100%">
              </div>
              <div class="adventure-detail-card-text">
                <div class="d-flex justify-content-between align-items-center flex-wrap mb-2">
                  <div class="fs-5 fw-bold">${x.name}</div>
                  <div class="fs-6 fw-bold">&#8377;${x.costPerHead}</div>
                </div>
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                  <div class="fs-5 fw-bold">Duration</div>
                  <div class="fs-6 fw-bold">${x.duration} Hours</div>
                </div>
              </div>
              <div class="category-banner fs-5">${x.category}</div>
            </div>
          </a>
    `;
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((x) => x.duration >= low && x.duration <= high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if (categoryList.length > 0)
    list = list.filter((x) => categoryList.includes(x.category));
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  const limit = getDurationParameters(filters.duration);
  list = filterByDuration(list, limit[0], limit[1]);
  list = filterByCategory(list, filters.category);
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  try {
    localStorage.setItem("filters", JSON.stringify(filters));
    return true;
  } catch (error) {
    return false;
  }
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  try {
    const filters = localStorage.getItem("filters");
    return JSON.parse(filters);
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryListElem = document.getElementById("category-list");
  let categoryPills = filters.category.map((x) => {
    const pill = document.createElement("div");
    pill.setAttribute("class", "category-filter");
    pill.setAttribute("id", x);
    pill.innerHTML = `
      ${x}
      <div class="category-filter-cancel">x</div>`;
    return pill;
  });
  categoryPills.forEach((x) => categoryListElem.appendChild(x));

  //updating value for duration filter
  document.getElementById("duration-select").value = filters.duration;
}

async function addNewAdventure(event) {
  let city = await getCityFromURL(window.location.search);
  const params = { city: city.toLowerCase() };
  const res = await fetch(`${config.backendEndpoint}/adventures/new`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = (await res.json()) || [];
  event.stopPropagation();
}

function getDurationParameters(duration) {
  let limit = duration.split("-");
  limit = limit.filter((x) => x.length > 0 && !isNaN(x));
  if (limit.length !== 2) return [-Infinity, Infinity];
  return limit.map((x) => parseInt(x));
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  addNewAdventure,
  getDurationParameters,
};
