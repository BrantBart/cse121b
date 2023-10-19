//aircraft will be displayed depending on the settings at the top from the json data

// year range setup
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
};

// get earliest date
const getEarliestServiceDate = (aircraftList) => {
  const serviceDates = aircraftList.map((plane) =>
    parseInt(plane.enteredService)
  );
  return Math.min(...serviceDates);
};

// get latest date
const getLatestServiceDate = (aircraftList) => {
  const serviceDates = aircraftList.map((plane) =>
    parseInt(plane.endOfService)
  );
  return Math.max(...serviceDates);
};

//get unique countries of origin from list
const getUniqueCountriesOfOrigin = (aircraftList) => {
  const countries = aircraftList.map((plane) => plane.countryOfOrigin);

  const uniqueCountries = [...new Set(countries)];
  return uniqueCountries;
};

//unique theatres
const getUniqueTheaters = (aircraftList) => {
  const theaters = aircraftList.flatMap((plane) => plane.theaters);
  return [...new Set(theaters)];
};

//setting up the checkboxes from the functions that created them... :*( this was out of order and broke
const setUpCheckboxes = () => {
  countryCheckboxes = document.querySelectorAll(
    '#nations input[type="checkbox"]'
  );
  theaterCheckboxes = document.querySelectorAll(
    '#theaters input[type="checkbox"]'
  );
  countryCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", sortBy)
  );
  theaterCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", sortBy)
  );
};

const nationsSection = document.querySelector("#nations");
const cardSectionElement = document.querySelector("#card-display");
const aircraftFile = "project/aircraft.json";
let aircraftList = {};
// for the checkbox events
let countryCheckboxes, theaterCheckboxes;

//determine the flag country logic
const determineFlag = (country) => {
  let src = "";
  let alt = "";
  switch (country.toLowerCase()) {
    case "united states":
      src = "usa.jpg";
      alt = "US Flag";
      break;
    case "united kingdom":
      src = "uk.png";
      alt = "UK Flag";
      break;
    case "soviet union":
      src = "su.png";
      alt = "USSR Flag";
      break;
    case "germany":
      src = "ger.png";
      alt = "Germany Flag";
      break;
    case "japan":
      src = "j.png";
      alt = "Japan Flag";
      break;
    default:
      src = "missing";
      alt = "not found";
  }
  return { src: src, alt: alt };
};

const createCard = (aircraft) => {
  aircraft.forEach((plane) => {
    const h3 = document.createElement("h3");
    h3.textContent = plane.name;

    const role = document.createElement("p");
    role.textContent = plane.type;

    const img = document.createElement("img");

    //images will be called the aircraft's designation to make it easy
    img.src = `project/pro-images/aircraft/${plane.designation}.jpg`;
    img.alt = plane.name;
    img.setAttribute("class", "aircraft-img");

    const dates = document.createElement("p");
    dates.textContent = `${plane.enteredService} - ${plane.endOfService}`;
    dates.setAttribute("class", "dates");

    const flag = document.createElement("img");
    let flagDetails = determineFlag(plane.countryOfOrigin);
    flag.src = `project/pro-images/flags/${flagDetails.src}`;
    flag.alt = flagDetails.alt;
    flag.setAttribute("class", "flag");

    const theater = document.createElement("p");
    theater.textContent = `${plane.theaters.join(", ")}`;

    const card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(h3);
    card.appendChild(role);
    card.appendChild(img);
    card.appendChild(dates);
    card.appendChild(flag);
    card.appendChild(theater);

    cardSectionElement.appendChild(card);
  });
};

const displayAircraft = (aircraft) => {
  aircraft.forEach((plane) => {
    // console.log(plane);
  });
  createCard(aircraft);
};

const getAircraft = async () => {
  try {
    const response = await fetch(aircraftFile);
    aircraftList = await response.json();
    displayAircraft(aircraftList.aircraft);
    // createCard(aircraftList.aircraft);
  } catch (error) {
    console.error("No aircraft were found!", error);
  }
  // set dates for the year slider
  const slider = document.querySelector("#myRange");
  const earliestDate = getEarliestServiceDate(aircraftList.aircraft);
  //   console.log(earliestDate);
  const latestDate = getLatestServiceDate(aircraftList.aircraft);
  //   console.log(latestDate);
  // min and max values
  slider.setAttribute("min", earliestDate);
  slider.setAttribute("max", latestDate);

  const uniqueCountries = getUniqueCountriesOfOrigin(aircraftList.aircraft);
  //   console.log(uniqueCountries);
  uniqueCountries.forEach((country) => {
    const checkCountry = document.createElement("input");
    checkCountry.type = "checkbox";
    checkCountry.value = country;
    checkCountry.id = country.replace(/\s+/g, "-").toLowerCase();
    checkCountry.checked = true;
    nationsSection.appendChild(checkCountry);
    // labels
    const label = document.createElement("label");
    label.htmlFor = checkCountry.id;
    label.textContent = country;
    nationsSection.appendChild(label);
    // put each on its own line
    nationsSection.appendChild(document.createElement("br"));
  });

  const theatersSection = document.querySelector("#theaters");
  const uniqueTheaters = getUniqueTheaters(aircraftList.aircraft);
  uniqueTheaters.forEach((theater) => {
    const checkTheater = document.createElement("input");
    checkTheater.type = "checkbox";
    checkTheater.value = theater;
    checkTheater.id = theater.replace(/\s+/g, "-").toLowerCase();
    checkTheater.checked = true;
    theatersSection.appendChild(checkTheater);

    // add labels
    const label = document.createElement("label");
    label.htmlFor = checkTheater.id;
    label.textContent = theater;
    theatersSection.appendChild(label);
    // put each on its own line
    theatersSection.appendChild(document.createElement("br"));
  });

  let year = document.querySelector(".slider").value;
  //   make the page display how many aircraft are in the data total
  //   console.log(aircraftList.aircraft.length);
  let countFill = document.querySelector("#count");
  countFill.textContent = aircraftList.aircraft.length;
  setUpCheckboxes();
  //   console.log(year);
};

const filterAircraftByYear = (year, aircraftList) => {
  return aircraftList.filter(
    (plane) =>
      parseInt(plane.enteredService) <= year &&
      parseInt(plane.endOfService) >= year
  );
};

const sortBy = () => {
  reset();
  const allCheckbox = document.querySelector("#allYearsCheckbox");

  let filteredAircraft;
  if (allCheckbox && allCheckbox.checked) {
    filteredAircraft = aircraftList.aircraft;
  } else {
    // Filter from year
    let year = parseInt(document.querySelector(".slider").value);

    // filtered list of planes based on the year
    filteredAircraft = filterAircraftByYear(year, aircraftList.aircraft);
  }
  // Filter by country:
  const selectedCountries = Array.from(countryCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  if (selectedCountries.length) {
    filteredAircraft = filteredAircraft.filter((plane) =>
      selectedCountries.includes(plane.countryOfOrigin)
    );
  }
  // filter by theater
  const selectedTheaters = Array.from(theaterCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  if (selectedTheaters.length) {
    filteredAircraft = filteredAircraft.filter((plane) =>
      plane.theaters.some((theater) => selectedTheaters.includes(theater))
    );
  }
  // Display only the filtered planes
  displayAircraft(filteredAircraft);
  //   console.log(selectedCountries, selectedTheaters);
};

/* reset Function */
const reset = () => {
  cardSectionElement.innerHTML = "";
};

/* Event Listeners */
document.querySelector(".slider").addEventListener("input", sortBy);
document.querySelector("#allYearsCheckbox").addEventListener("change", sortBy);

getAircraft();
