import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js"
//Your web app firebase configruation
const appSettings = {
    databaseURL: "https://add2cart-203cd-default-rtdb.firebaseio.com/"
}
//Initialize App
const app = initializeApp(appSettings)
//reference to database services
const db = getDatabase(app)
const cart = ref(db, "ShoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add")
const data = document.getElementById("item")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value 
    push(cart, inputValue)
    clearInputFieldEl()
})

inputFieldEl.addEventListener('keypress', function(e) {
    if (e.key == "Enter"){
    let inputValue = inputFieldEl.value 
    push(cart, inputValue)
    clearInputFieldEl()
}
})
onValue(cart, function(snapshot)
{
    //Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database 
    //and if there are not displays the text 'No items here... yet'.
    if(snapshot.exists()){
        let itemarray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i=0;i<itemarray.length;i++)
        {
            let currentitem = itemarray[i]
            additem(currentitem)
        }
}
else{
    data.innerHTML = "No ITEMS are added yet.."
}
})
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function additem (value) {
    //data.innerHTML += `<li>${value}</li>`
    //now innerHTML is not going to work because we need to add a EventListener everytime when a user add a item on each item
    //The purpose of doing this so we can delete specific item when user doubles click on the item
    
    //For this we are going to use "createElement"
    let itemId = value[0]
    let itemvalue = value[1]
    let listitemval = document.createElement("li")
    listitemval.textContent = itemvalue 
    data.append(listitemval)
    //Deleting a specific item from database when user doucle click on the item
    listitemval.addEventListener("dblclick", function()
    {
        let deletingitemID = ref(db, `ShoppingList/${itemId}`)
        remove(deletingitemID)
    })
}
function clearShoppingListEl() {
    data.innerHTML = ""
}