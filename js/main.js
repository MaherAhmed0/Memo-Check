import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://memocheck-51216-default-rtdb.europe-west1.firebasedatabase.app/"
}
const App = initializeApp(appSettings)
const database = getDatabase(App)
const listInDb = ref(database, "Items")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listEl = document.getElementById("list")

let clearInput = () => {
    inputFieldEl.value = ""
}

let clearList = () => {
    listEl.innerHTML = ""
}

let addItemToListEl = (item) => {
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function () {
        remove(ref(database, `Items/${itemId}`))
    })

    listEl.append(newEl)
}
addButtonEl.addEventListener("click", function () {
    let inputVal = inputFieldEl.value

    push(listInDb, inputVal)

    clearInput()
})

onValue(listInDb, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArr = Object.entries(snapshot.val())
        clearList()
        for (let i = 0; i < itemsArr.length; i++) {
            addItemToListEl(itemsArr[i])
        }
    }
    else {
        listEl.innerHTML = ""
    }
})