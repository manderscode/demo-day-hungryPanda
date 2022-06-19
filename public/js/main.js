// THIS IS A COPY OF HOMEPAGE.JS - WHICH HAS THE ACCURATE INFORMATION ON IT
// var searchGrocery = document.getElementById("#checkGrocery");
// // var trash = document.getElementsByClassName("fa-trash-can");
// // var songDetails = document.getElementsByClassName("lyrics");

// Array.from(check).forEach(function (element) {
//   element.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log(this.parentNode);
//     const name = this.parentNode.parentNode.querySelector(".name").innerText;
//     const song = this.parentNode.parentNode.querySelector(".location").innerText;
//     console.log(song);

//     fetch("/messages", {
//       method: "put",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: name,
//         msg: song,
//         check: check,
//       }),
//     })
//       .then((response) => {
//         if (response.ok) return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         window.location.reload(true);
//       });
//   });
// });

// Array.from(trash).forEach(function (element) {
//   element.addEventListener("click", function () {
//     const email = this.parentNode.parentNode.querySelector(".email").innerText;
//     const name = this.parentNode.parentNode.querySelector(".name").innerText;
//     const song = this.parentNode.parentNode.querySelector(".song").innerText;
//     console.log(email, name, song);

//     fetch("/submitSong", {
//       method: "delete",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email, //right hand side = variable reference
//         name: name,
//         song: song,
//       }),
//     }).then(function (response) {
//       window.location.reload();
//     });
//   });

//   Array.from(songDetails).forEach(function (element) {
//     element.addEventListener("click", function (e) {
//       e.preventDefault();
//       console.log(this.parentNode);
//       const name = this.parentNode.parentNode.querySelector(".name").innerText;
//       const song = this.parentNode.parentNode.querySelector(".song").innerText;
//       // const artist = this.parentNode.parentNode.querySelector(".artist").innerText;

//       // const fetch = require("node-fetch");

//       const options = {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
//           'X-RapidAPI-Key': '4c56b1902amsha80e0bfceb31006p147e04jsnd9bbf589e1b9'
//         }
//       };
      
//       fetch('https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US', options)
//         .then(response => response.json())
//         .then((data) => {

//          let songReccs = document.getElementById('songReccs')

//           for (let i = 0; i < data.tracks.length; i++) {

//           let song = document.createElement('li')
//           song.innerText = data.tracks[i].title
//           songReccs.appendChild(song)
//         }
//       })
//         .then(response => console.log(response))
//         .catch(err => console.error(err));


// const addFavorite = document.getElementsByClassName("addFavorite")
// console.log(addFavorite)
// Array.from(addFavorite).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const _id = this.id
//     console.log('client side id', _id)
//     fetch('addFavorite', {
//       method:'PUT',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         '_id': _id 
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

// const deletePosts = document.getElementsByClassName("deletePosts")

// Array.from(deletePosts).forEach(function(element) {
//     element.addEventListener('click', function(){
//       const _id = this.id
//       console.log('client side id', _id)
//       fetch('deletePosts', {
//         method:'delete',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           '_id': _id 
//         })
//       })
//       .then(response => {
//         if (response.ok) return response.json()
//       })
//       .then(data => {
//         console.log(data)
//         // window.location.reload(true)
//       })
//     });
//   });
  
// Array.from(deletePosts).forEach(function(element) {
//   element.addEventListener('click', function(){
//     console.log("this delete is working!")
//     const _id = this.id
//     console.log('client side id', _id)
//     fetch('deletePosts', {
//       method:'post',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         '_id': _id 
//       })
//     })
//     .then(response => {
//     console.log("this is a response", response.json())
//     //   if (response.ok) return response.json()
//         //   window.location.reload()

//     })
//     // .then(data => {
//     // console.log(data)
//     // //   window.location.reload()
//     // })
//   });
// });

// function deletePost(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ _id: id }),
//     }
//     console.log(requestOptions.body)
//     fetch('/posts', requestOptions)
// }
