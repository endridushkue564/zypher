/* 
   File: complex_code.js
   Description: This code demonstrates a sophisticated JavaScript program that manipulates and displays data from an array of objects.
*/

// Create an array of objects representing different countries
var countries = [
  { name: "USA", capital: "Washington, D.C.", population: 328.2 },
  { name: "China", capital: "Beijing", population: 1439 },
  { name: "India", capital: "New Delhi", population: 1380 },
  { name: "Brazil", capital: "Brasília", population: 211 },
  // ... more countries
];

// Function to display country details on the console
function displayCountryDetails(country) {
  console.log("Country: " + country.name);
  console.log("Capital: " + country.capital);
  console.log("Population (in millions): " + country.population);
  console.log("------------------------");
}

// Function to calculate the total population of all countries
function calculateTotalPopulation(countries) {
  var totalPopulation = 0;
  for (var i = 0; i < countries.length; i++) {
    totalPopulation += countries[i].population;
  }
  return totalPopulation;
}

// Function to find the country with the largest population
function findLargestPopulationCountry(countries) {
  var largestPopulationCountry = countries[0];
  for (var i = 1; i < countries.length; i++) {
    if (countries[i].population > largestPopulationCountry.population) {
      largestPopulationCountry = countries[i];
    }
  }
  return largestPopulationCountry;
}

// Display introduction and total population
console.log("Welcome to the Country Information System!");
console.log("==========================================");
console.log("Total population of all countries (in millions): " + calculateTotalPopulation(countries));

// Display details of each country
console.log("\nCountry Details:");
console.log("-----------------");
for (var i = 0; i < countries.length; i++) {
  displayCountryDetails(countries[i]);
}

// Find and display the country with the largest population
var largestPopulationCountry = findLargestPopulationCountry(countries);
console.log("\nCountry with the Largest Population:");
console.log("-----------------------------------");
displayCountryDetails(largestPopulationCountry);

// ... more complex code goes here
// ... more functions and data manipulations

// Example of a complex function that combines multiple operations
function complexFunction() {
  // ... complex operations here
}

// Call the complexFunction
complexFunction();