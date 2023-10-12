/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
const templeFile =
  "https://byui-cse.github.io/cse121b-ww-course/resources/temples.json";
let templeList = [];
const title = document.querySelector("h2");

// added a function to do the date
function parseDedicatedDate(dateStr) {
  let [year, month, day] = dateStr.split(", ").map((str, index) => {
    if (index === 1) {
      // month conversion here had to look up how to do this stuff
      return new Date(Date.parse(str + " 1, 2012")).getMonth();
    }
    return parseInt(str, 10);
  });
  return new Date(year, month, day);
}

// function to update Fetch(): display
function changeTitle(filter) {
  switch (filter) {
    case "utah":
      title.innerHTML = "Fetch(): Utah Temples";
      break;
    case "notutah":
      title.innerHTML = "Fetch(): Non Utah Temples";
      break;
    case "older":
      title.innerHTML = "Fetch(): Older Utah Temples";
      break;
    case "all":
    default:
      title.innerHTML = "Fetch(): No Filter Temples";
      break;
  }
}
/* async displayTemples Function */

const displayTemples = (temples) => {
  temples.forEach((temple) => {
    let h3 = document.createElement("h3");
    h3.textContent = temple.templeName;
    let img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.location;
    let div = document.createElement("div");
    div.appendChild(img);
    let article = document.createElement("article");
    article.appendChild(h3);
    article.appendChild(div);
    templesElement.appendChild(article);
  });
};

/* async getTemples Function using fetch()*/
const getTemples = async () => {
  try {
    const response = await fetch(templeFile);
    templeList = await response.json();
    displayTemples(templeList); // Display the temples after fetching them
  } catch (error) {
    console.error("No temples were found!", error);
  }
};

/* reset Function */
const reset = () => {
  templesElement.innerHTML = "";
};

/* sortBy Function */
const sortBy = () => {
  reset();
  let filter = document.querySelector("#sortBy").value;
  switch (filter) {
    case "utah":
      displayTemples(
        templeList.filter((temple) => temple.location.includes("Utah"))
      );
      changeTitle("utah");
      break;
    case "notutah":
      displayTemples(
        templeList.filter((temple) => !temple.location.includes("Utah"))
      );
      changeTitle("notutah");
      break;
    case "older":
      displayTemples(
        templeList.filter(
          (temple) =>
            parseDedicatedDate(temple.dedicated) < new Date(1950, 0, 1)
        )
      );
      changeTitle("older");
      break;
    case "all":
    default:
      displayTemples(templeList);
      changeTitle("all");
      break;
  }
};

getTemples();

/* Event Listener */
document.querySelector("#sortBy").addEventListener("change", sortBy);
