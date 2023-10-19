// get earliest date
export const getEarliestServiceDate = (aircraftList) => {
  const serviceDates = aircraftList.map((plane) =>
    parseInt(plane.enteredService)
  );
  return Math.min(...serviceDates);
};

// get latest date
export const getLatestServiceDate = (aircraftList) => {
  const serviceDates = aircraftList.map((plane) =>
    parseInt(plane.endOfService)
  );
  return Math.max(...serviceDates);
};

//get unique countries of origin from list
export const getUniqueCountriesOfOrigin = (aircraftList) => {
  const countries = aircraftList.map((plane) => plane.countryOfOrigin);

  const uniqueCountries = [...new Set(countries)];
  return uniqueCountries;
};

//unique theatres
export const getUniqueTheaters = (aircraftList) => {
  const theaters = aircraftList.flatMap((plane) => plane.theaters);
  return [...new Set(theaters)];
};
