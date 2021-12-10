let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



  // urls
allToysURL = 'http://localhost:3000/toys'

  // grab stuff
const toyContainer = document.querySelector('#toy-collection')
const newToyForm = document.querySelector('form')
const input = document.querySelectorAll('.input-text')

  // convert node list
const inputArray = Array.from(input)

  // helpers
const create = el => document.createElement(el)

  // event listener
newToyForm.addEventListener('submit', handleSubmit)


  // submit callback
function handleSubmit(e) {
  e.preventDefault()
  let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
  }
  renderToyCard(toyObj)
  postNewToy(toyObj)
}



  // renderCard
function renderToyCard(toy) {
    // make stuff
  const card = create('div')
  const toyName = create('h2')
  const img = create('img')
  const likesNum = create('likes')
  const likesBtn = create('button')

    // assign attributes
  card.className = 'card'
  toyName.innerText = toy.name
  img.className = 'toy-avatar'
  img.src = toy.image
  likesNum.innerText = toy.likes + ' likes'
  likesBtn.className = 'like-btn'
  likesBtn.id = toy.id
  likesBtn.innerText = 'Like'

    // addEventListeners
  likesBtn.addEventListener('click', (toys) => {
    toy.likes += 1
    likesNum.textContent = toy.likes + ' likes'
    updateLikes(toy)
  })


    // append stuff
  card.append(toyName, img, likesNum, likesBtn)
  toyContainer.append(card)
}



  // CRUD
  fetch(allToysURL)
    .then(r => r.json())
    .then(toysArray => toysArray.forEach(toy => renderToyCard(toy)))

function postNewToy(toyObj) {
  fetch(allToysURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(r => r.json())
  .then(toy => console.log(toy))
}

function updateLikes(toy) {
  fetch(`${allToysURL}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(r => r.json())
  .then(toy => console.log(toy))
}