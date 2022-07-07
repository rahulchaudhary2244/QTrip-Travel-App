import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  // Place holder for functionality to work in the Stubs
  const params = new URLSearchParams(search);
  const adventure = params.get("adventure");
  return adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  // Place holder for functionality to work in the Stubs
  try {
    const API_URL = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
    const res = await fetch(API_URL);
    const adventureData = (await res.json()) || [];
    return adventureData;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  const photoElem = document.getElementById("photo-gallery");
  adventure.images.forEach((x) => {
    photoElem.innerHTML += `
    <img src="${x}" alt="image" class="activity-card-image"/>
    `;
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const elemId = "photo-gallery";
  const photoElem = document.getElementById(elemId);
  photoElem.innerHTML = "";
  photoElem.setAttribute("class", "carousel slide");
  photoElem.setAttribute("data-bs-ride", "carousel");

  const carouselIndicators = document.createElement("div");
  carouselIndicators.setAttribute("class", "carousel-indicators");

  const carouselInner = document.createElement("div");
  carouselInner.setAttribute("class", "carousel-inner");

  images.forEach((src, idx) => {
    if (idx === 0) {
      carouselIndicators.innerHTML += `<button type="button" data-bs-target="#${elemId}" data-bs-slide-to="${idx}" class="active" aria-current="true" aria-label="Slide ${
        idx + 1
      }"></button>`;
      carouselInner.innerHTML += `<div class="carousel-item active">
      <img src="${src}" class="activity-card-image d-block w-100" alt="image">
    </div>`;
    } else {
      carouselIndicators.innerHTML += ` <button type="button" data-bs-target="#${elemId}" data-bs-slide-to="${idx}" aria-label="Slide ${
        idx + 1
      }"></button>`;
      carouselInner.innerHTML += `<div class="carousel-item">
      <img src="${src}" class="activity-card-image d-block w-100" alt="image">
    </div>`;
    }
  });

  photoElem.appendChild(carouselIndicators);
  photoElem.appendChild(carouselInner);
  photoElem.innerHTML += `
  <button class="carousel-control-prev" type="button" data-bs-target="#${elemId}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${elemId}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  `;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOutElem = document.getElementById("reservation-panel-sold-out");
  const availableElem = document.getElementById("reservation-panel-available");
  soldOutElem.style.display = "none";
  availableElem.style.display = "none";
  if (!adventure.available) {
    soldOutElem.style.display = "block";
    return;
  }
  availableElem.style.display = "block";
  document.getElementById("reservation-person-cost").innerHTML =
    adventure.costPerHead;
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const API_URL = `${config.backendEndpoint}/reservations/new`;
  const formElem = document.getElementById("myForm");
  const [name, date, person] = Array.from(formElem.elements);
  const payload = {
    name: name.value,
    date: date.value,
    person: parseInt(person.value),
    adventure: adventure.id,
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) alert("Success!");
      else throw "Failed!";
    })
    .catch((error) => {
      alert("Failed!");
    });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedElem = document.getElementById("reserved-banner");
  if (adventure.reserved) reservedElem.style.display = "block";
  else reservedElem.style.display = "none";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
