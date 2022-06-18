// THIS IS THE FOURSQUARE API'S TEST W/ DIFF PARAMETERS
//This is the longitude and lattitude:
// const options = {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'fsq3YO2qlHgzJQ2d71ZOqzk022SboBfZmpsitnjuX49VQR4='
//     }
//   };

//   fetch('https://api.foursquare.com/v3/places/search?query=Cmart&ll=42.35%2C-71.05', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// this is just for CMart:
// const options = {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'fsq3YO2qlHgzJQ2d71ZOqzk022SboBfZmpsitnjuX49VQR4='
//     }
//   };

//   fetch('https://api.foursquare.com/v3/places/search?query=Cmart&near=Boston%2C%20MA', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


//COPIED FROM SAVAGE AUTH / PERSONAL FULL-STACK TWO PROJECTS: 

// const searchGrocery = document.getElementById("#checkGrocery");

// Array.from(searchGrocery).forEach(function (element) {
//   element.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log(this.parentNode);
//     const name = this.parentNode.parentNode.querySelector(".name").innerText;
//     const song = this.parentNode.parentNode.querySelector(".song").innerText;
//     console.log(song);

//     const options = {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: "fsq3YO2qlHgzJQ2d71ZOqzk022SboBfZmpsitnjuX49VQR4=",
//       },
//     };

//     fetch(
//       "https://api.foursquare.com/v3/places/search?categories=17069%2C17070%2C17071&near=Boston%2C%20MA",
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
//   });
// });

const checkGroceryButton = document.querySelector("#checkGrocery");
const searchInput = document.querySelector("#inputGrocery");
const inputLocation = document.querySelector("#inputLocation");
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: "fsq3YO2qlHgzJQ2d71ZOqzk022SboBfZmpsitnjuX49VQR4=",
  },
};


checkGroceryButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(
    `https://api.foursquare.com/v3/places/search?query=${searchInput.value}&categories=17069%2C17070%2C17071&near=${inputLocation.value}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      let groceryResults = document.getElementById("groceryStoreResults");
      for (let i = 0; i < response.results.length; i++) {
        let groceryLocation = document.createElement("li");
        let groceryLink = document.createElement("a");
        groceryLink.href = `/groceryStores/${response.results[i].name}?id=${response.results[i].fsq_id}`
        groceryLink.innerText += " " + response.results[i].location.formatted_address;
        let clickedGroceryResult = groceryLocation.appendChild(groceryLink)

        groceryResults.appendChild(groceryLocation);
      }
    })

    .catch((err) => console.error(err));
});


