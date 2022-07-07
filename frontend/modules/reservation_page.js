import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const API_URL = `${config.backendEndpoint}/reservations`;
    const response = await fetch(API_URL);
    const data = (await response.json()) || [];
    return data;
  } catch (error) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations = []) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const table = document.getElementById("reservation-table-parent");
  table.style.display = "none";
  const noReservation = document.getElementById("no-reservation-banner");
  noReservation.style.display = "none";

  if (reservations.length === 0) {
    noReservation.style.display = "block";
    return;
  }
  reservations.forEach((x) => {
    document.getElementById("reservation-table").innerHTML += `
              <tr>
                <td>${x.id}</td>
                <td>${x.name}</td>
                <td>${x.adventureName}</td>
                <td>${x.person}</td>
                <td>${formatDateOnly(new Date(x.date))}</td>
                <td>${x.price}</td>
                <td>${formatDateTimeBoth(new Date(x.time))}</td>
                <td>
                  <button
                    class="reservation-visit-button"
                    style="border: none"
                    id="${x.id}"
                  >
                  <a href="../detail/?adventure=${x.adventure}">
                    Visit Adventure
                  </a>
                  </button>
                </td>
              </tr>
    `;
  });

  table.style.display = "block";
}

/*
let date = new Date('03/05/1983');
//4 November 2020, 9:32:31 pm
console.log(date.toLocaleString('en-IN', {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: '2-digit', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric', // numeric, 2-digit
    second: 'numeric', // numeric, 2-digit
}));
*/

function formatDateOnly(date) {
  return date.toLocaleString("en-IN", {
    day: "numeric", // numeric, 2-digit
    year: "numeric", // numeric, 2-digit
    month: "numeric", // numeric, 2-digit, long, short, narrow
  });
}

function formatDateTimeBoth(date) {
  return date.toLocaleString("en-IN", {
    day: "numeric", // numeric, 2-digit
    year: "numeric", // numeric, 2-digit
    month: "long", // numeric, 2-digit, long, short, narrow
    hour: "numeric", // numeric, 2-digit
    minute: "numeric", // numeric, 2-digit
    second: "numeric", // numeric, 2-digit
  });
}

export { fetchReservations, addReservationToTable };
