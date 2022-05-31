const checkGroceryButton = document.querySelector("#checkGrocery")
const searchInput = document.querySelector("#inputGrocery")
const inputLocation = document.querySelector("#inputLocation")
const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3YO2qlHgzJQ2d71ZOqzk022SboBfZmpsitnjuX49VQR4='
    }
  };
  

checkGroceryButton.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(`https://api.foursquare.com/v3/places/search?query=${searchInput.value}&categories=17069%2C17070%2C17071&near=${inputLocation.value}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

})