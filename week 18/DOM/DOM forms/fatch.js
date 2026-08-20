const API = "https://jsonplaceholder.typicode.com/todos?_limit=5"

const loadingMsg = document.querySelector('#titleError')

async function getData() {
    const data = await fetch(API)
    const mission = await data.json()
    if (!mission) {
        loadingMsg.textContent = "אין נתונים להצגה"
        return
    }
    else {
        const todoList = document.querySelector('#todoList');
        loadingMsg.style.display = 'none';
        todoList.innerHTML = mission.map(task => 
            `<li>
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                ${task.title}
            </li>`
        ).join('');
    }
}

document.addEventListener("DOMContentLoaded", getData);
