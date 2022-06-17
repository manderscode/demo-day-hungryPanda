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
      let groceryResults = document.getElementById("groceryStoreResults");
      for (let i = 0; i < response.results.length; i++) {
        let groceryLocation = document.createElement("li");
        let groceryLink = document.createElement("a");
        groceryLink.href = "/cmart"
        groceryLink.innerText += " " + response.results[i].location.formatted_address;
        let clickedGroceryResult = groceryLocation.appendChild(groceryLink)

        groceryResults.appendChild(groceryLocation);
      }
    })

    .catch((err) => console.error(err));
});

//making a fetch request to the put request "addFavorite"

function addFavorite(id) {
  console.log('addFavorite', id)
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ postId: id }),
	}
	fetch('/addFavorite', requestOptions)
}

