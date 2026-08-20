const API = "https://jsonplaceholder.typicode.com/users";

const from = document.querySelector("#userForm")

const nameInput = document.querySelector("#name")
const emaliInput = document.querySelector("#email")
const roleSelector = document.querySelector("#role")
const agree = document.querySelector("#agree")
const userlist = document.querySelector("#userList")
const message = document.querySelector("#msg")

async function loadUsers(API) {
    const result = await fetch(API)
    const users = await result.json()
    users.forEach((user) => addUsersRow(user));
}

function addUsersRow(user) {
    const li = document.createElement("li")
    li.textContent = `${user.name} -- ${user.email}`
    userlist.prepend(li)
}

from.addEventListener("submit", async(e) => {
    e.preventDefault()
    const name = nameInput.value
    const email = emaliInput.value
    const role = roleSelector.value
    const agreeBox = agree.checked

    if (!email.includes("@"))
        message.textContent = "חייב להיות לך @"
        message.classList.add("bad")
        return
    })

    if (!agree) {
        message.textContent = "חייב להיות לך @"
        message.classList.add("bad")
        return
    }

    const result = await fetch(API, {
        method: 'POST',
        
    })

document.addEventListener("DOMContentLoaded", loadUsers);

