/* LESSON 3 - Programming Tasks */
/* Profile Object  */
let myProfile = {
  name: "Brant Barton",
  photo: "images/me.jpg",
  favoriteFoods: ["steak", "asparagus", "mashed potatoes", "bread"],
  hobies: ["history museums", "art museums", "cooking", "programming"],
  placesLived: [],
};

/* Populate Profile Object with placesLive objects */
function addToPlacesLived(place, time) {
  myProfile.placesLived.push({
    place: place,
    length: time,
  });
}

addToPlacesLived("Detroit, MI", "2 years");
addToPlacesLived("Atlanta, GA", "11 years");
addToPlacesLived("Draper, UT", "8 Years");
addToPlacesLived("Kissimmee, FL", "4 Years");
addToPlacesLived("Hong Kong, China", "2 Months");
addToPlacesLived("Rexburg, ID", "2 Years");
addToPlacesLived("Cancun, Mexico", "2 Years");

/* DOM Manipulation - Output */

/* Name */
document.querySelector("#name").textContent = myProfile.name;
/* Photo with attributes */
let imageElement = document.querySelector("#photo");
imageElement.setAttribute("src", myProfile.photo);
imageElement.setAttribute("alt", `Profile image of ${myProfile.name}`);

/* Favorite Foods List*/
const displayFavoriteFoods = () => {
  let foodList = document.querySelector("#favorite-foods");
  myProfile.favoriteFoods.forEach((food) => {
    const listItem = document.createElement("li");
    listItem.textContent = food;
    foodList.appendChild(listItem);
  });
};

displayFavoriteFoods();
/* Hobbies List */
const displayHobbies = () => {
  let hobyList = document.querySelector("#hobbies");
  myProfile.hobies.forEach((hoby) => {
    const listItem = document.createElement("li");
    listItem.textContent = hoby;
    hobyList.appendChild(listItem);
  });
};

displayHobbies();

/* Places Lived DataList */
const displayPlacesLived = () => {
  let placesLivedList = document.querySelector("#places-lived");
  myProfile.placesLived.forEach((place) => {
    let dt = document.createElement("dt");
    let dd = document.createElement("dd");
    dt.textContent = place.place;
    placesLivedList.appendChild(dt);
    dd.textContent = place.length;
    placesLivedList.appendChild(dd);
  });
};

displayPlacesLived();
