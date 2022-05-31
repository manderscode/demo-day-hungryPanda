
// This is the longitude and lattitude: 
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

        const options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'fsq3YO2qlHgzJQ2d71ZOqzk022SboBfZmpsitnjuX49VQR4='
            }
          };
          
          fetch('https://api.foursquare.com/v3/places/search?categories=17069%2C17070%2C17071&near=Boston%2C%20MA', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));