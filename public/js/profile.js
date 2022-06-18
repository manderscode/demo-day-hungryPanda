// const deletePost = document.getElementsByClassName("deletePost");

// Array.from(deletePost).forEach(function (element) {
//     element.addEventListener("click", function () {
//     //   const email = this.parentNode.parentNode.querySelector(".email").innerText;
//     //   const name = this.parentNode.parentNode.querySelector(".name").innerText;
//     //   const song = this.parentNode.parentNode.querySelector(".song").innerText;
//     console.log("clicked")
//       console.log("this is element", element);
//         let id = element.getAttribute("id")
//         console.log(id)
//       fetch("profile", {
//         method: "delete",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ postId: id }),
//       }).then(function (response) {
//         // window.location.reload();
//     });
//     });
// })
  

function deletePost(id) {
      const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: id }),
      }
      console.log(requestOptions.body)
      fetch('/posts', requestOptions)
  }
  
  function addActivityItem(e){
    // const requestOptions = {
  
      // 	method: 'GET',
      // 	headers: { 'Content-Type': 'application/json' },
      // }
      // fetch(`/cmart?snackCategories=${e.target.value}`, requestOptions)
    // console.log("test")
    window.location.href=`/profile?categoriesPosts=${e.target.value}`
  }
  
    document.getElementById("categoriesPosts").addEventListener("change", addActivityItem);
    
  