const filterButton = document.querySelector('#filter')
const category = document.querySelector('#categoriesPosts')

const savory = Array.from(document.querySelectorAll(".savory"))
const sweet = Array.from(document.querySelectorAll(".sweet"))


filterButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    let snackValue = category.options[category.selectedIndex].value;

    console.log(snackValue)
    console.log("savory", savory)
    console.log("sweet", sweet)

if (snackValue === 'savory') { 
    //for each post that has the class of "savory", we're going to
    sweet.forEach(post => post.classList.add('hidden'))
    savory.forEach(post => post.classList.remove('hidden'))
} else if (snackValue === 'sweet') {
    savory.forEach(post => post.classList.add('hidden'))
    sweet.forEach(post => post.classList.remove('hidden'))
} else {
    savory.forEach(post => post.classList.remove('hidden'))
    sweet.forEach(post => post.classList.remove('hidden'))
}


})






