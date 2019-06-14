
let page = 1
const mainMonsterDiv = document.getElementById("monster-container")
        document.addEventListener("DOMContentLoaded", function (){
            const createForm = document.getElementById("monster-form")
            const nextButton = document.getElementById("forward")
            const backButton = document.getElementById("back")
            backButton.addEventListener("click", backPage)
            nextButton.addEventListener("click", nextPage)
            createForm.addEventListener("submit", createMonster)
            fetchMonsters()
        })

        function fetchMonsters(){
            fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(res => res.json())
            .then(data => populateMonsters(data))
        }

        function populateMonsters(monsters){
            monsters.forEach(monster => {populateMonster(monster)
            })
        }

        function populateMonster(monster){
            const monsterDiv = document.createElement("div")
            const h2 = document.createElement("h2")
            h2.innerText = monster.name
            const h4 = document.createElement("h4")
            h4.innerText = `Age: ${monster.age}`
            const p = document.createElement("p")
            p.innerText = `Bio: ${monster.description}`

            monsterDiv.append(h2, h4, p)
            mainMonsterDiv.append(monsterDiv)

        }

        function createMonster(e){
            e.preventDefault()
            const nameInput = document.getElementById("name")
            const ageInput = document.getElementById("age")
            const descriptionInput = document.getElementById("description")
            let newMonster = {"name": nameInput.value, "age": ageInput.value, "description": descriptionInput.value}
            postNewMonster(newMonster)
        }

        function postNewMonster(newMonster){
            const createForm = document.getElementById("monster-form")
            fetch("http://localhost:3000/monsters", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newMonster)
            }).then(resp => resp.json())
            .then(populateMonster)
            .then(createForm.reset())
        }

        function nextPage(e){
            if (mainMonsterDiv.children.length < 50) {
                alert("Thats all folks")
                console.log(page)
            } else {
            page = page + 1
            mainMonsterDiv.innerHTML = ""
            fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(res => res.json())
            .then(data => populateMonsters(data))
            console.log(page)
            }
        }

        function backPage(e){
            if(page === 1){
                alert("Nah dog no mo monsters that way")
                mainMonsterDiv.innerHTML = ""
                fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)
                .then(res => res.json())
                .then(data => populateMonsters(data))
                console.log(page)

            }else{
                mainMonsterDiv.innerHTML = ""
                page = page -1
                fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
                .then(res => res.json())
                .then(data => populateMonsters(data))
                console.log(page)
            }
            
        }