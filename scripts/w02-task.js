/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = "Brant Barton";
const profilePicture = "images/me.jpg";
let currentYear = new Date().getFullYear();

/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
const yearElement = document.querySelector("#year");
const imageElement = document.querySelector("img");

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
imageElement.setAttribute("src", profilePicture);
imageElement.setAttribute("alt", `Profile image of ${fullName}`);
yearElement.textContent = currentYear;

/* Step 5 - Array */
let favoriteFoods = ["Steak", "Mushrooms", "Onions"];
foodElement.textContent = favoriteFoods;
// adding 2 more
favoriteFoods.push("Texas Toast", "Cheesecake");
foodElement.innerHTML += `<br>${favoriteFoods}`;
//take away first
favoriteFoods.shift();
foodElement.innerHTML += `<br>${favoriteFoods}`;
//take away last
favoriteFoods.pop();
foodElement.innerHTML += `<br>${favoriteFoods}`;
