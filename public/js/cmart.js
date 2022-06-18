
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

function addActivityItem(e){
let params = new URLSearchParams(location.search);
const id = params.get('id')
const path = window.location.pathname.split("/")
const groceryStoreName=path[2]
// let name = params.get("name"); 
// is the string "Jonathan"
	// const requestOptions = {

	// 	method: 'GET',
	// 	headers: { 'Content-Type': 'application/json' },
	// }
	// fetch(`/cmart?snackCategories=${e.target.value}`, requestOptions)
  // console.log("test")
  window.location.href=`/groceryStores/${groceryStoreName}?snackCategories=${e.target.value}&id=${id}`
}

// write a post fetch 
// url should have a query parameter or a path param of store ID
// get that by using the window.location search code
// then store id with a payload 

  document.getElementById("categoriesFeed").addEventListener("change", addActivityItem);
  




