document.addEventListener('DOMContentLoaded', () => {
  const baseURL = `http:localhost:3000/monsters`
  let container = document.getElementById('monster-container')

  let pageNum = 1
  fetchMonsters(pageNum)


// --- NEW MONSTER FORM --- //

  const createMonsterDiv = document.getElementById('create-monster')
  const monsterForm = document.createElement('form')
  monsterForm.id = 'monster-form'
  monsterForm.addEventListener('submit', handleSubmitMonster)

  const nameInput = document.createElement('input')
  nameInput.id = 'name'
  nameInput.placeholder = 'name...'

  const ageInput = document.createElement('input')
  ageInput.id = 'age'
  ageInput.placeholder = 'age...'

  const descriptionInput = document.createElement('input')
  descriptionInput.id = 'description'
  descriptionInput.placeholder = 'description...'

  const submitMonsterBtn = document.createElement('button')
  submitMonsterBtn.type = 'submit'
  submitMonsterBtn.name = 'submit'
  submitMonsterBtn.innerText = 'Create'
  submitMonsterBtn.id = 'submit-new-monster'

  createMonsterDiv.append(monsterForm)
  monsterForm.append(nameInput, ageInput, descriptionInput, submitMonsterBtn)


// --- FETCH MONSTERS --- //

  function fetchMonsters(a) {
    fetch(`${baseURL}/?_limit=500&_page=${a}`)
    .then(resp => resp.json())
    .then(json => json.forEach(showMonsters))
  }


// --- SHOW MONSTERS --- //

  function showMonsters(monster) {
    let div = document.createElement('div')
    div.dataset.id = monster.id

    let h2 = document.createElement('h2')
    h2.innerText = monster.name

    let h4 = document.createElement('h4')
    h4.innerText = `Age: ${monster.age}`

    let p = document.createElement('p')
    p.innerText = `Bio: ${monster.description}`

    container.append(div)
    div.append(h2, h4, p)
  }


// --- HANDLE SUBMIT MONSTER --- //

  function handleSubmitMonster(e) {
    e.preventDefault()
    // console.log(e.target.id.value)

    if (e.target.id === 'monster-form') {
      let newMonster = {
        'name': e.target.name.value,
        'age': e.target.age.value,
        'description': e.target.description.value,
      }

      fetch(baseURL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newMonster)
      })
      .then(resp => resp.json())
      .then(json => showMonsters(json))
      .then(e.target.reset())
    }
  }


// --- NEXT BUTTON --- //

  const nextButton = document.getElementById('forward')
  nextButton.addEventListener('click', () => {
    container.innerHTML = ''

    pageNum++
    fetchMonsters(pageNum)
    console.log(pageNum)
  })


// --- BACK BUTTON --- //

  const backButton = document.getElementById('back')
  backButton.addEventListener('click', () => {
    container.innerHTML = ''

    if (pageNum === 1) {
      fetchMonsters(1)
      alert("You've reached the beginning of the list!")
      // console.log(pageNum)
    }
    else {
      pageNum--
      fetchMonsters(pageNum)
      // console.log(pageNum)
    }
  })


// --- END --- //

})