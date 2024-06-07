const form = document.getElementById('form');
const taskInput = document.getElementById('task');
const tasks = document.getElementById('tasks');

document.addEventListener('DOMContentLoaded', loadTasks);
form.addEventListener('submit', addTask);

function sortTasks() {
    const list = Array.from(tasks.children);
    const sorted = list.sort((a, b) => {
        const aText = a.querySelector('p').innerText.toLowerCase();
        const bText = b.querySelector('p').innerText.toLowerCase();
        return aText.localeCompare(bText);
    });
    tasks.innerHTML = '';

    // Append the sorted task elements
    sorted.forEach(task => {
        tasks.appendChild(task);
    });

    // Save the sorted tasks to local storage
    taskTLS();
}
//Add a new task
function addTask(e) {
    e.preventDefault();
    if(taskInput.value == '')
    {
        return;
    }

    const task = document.createElement('li');
    task.innerHTML = `
            <input type="checkbox">
            <p>${taskInput.value}</p>
            <button type="buttton">X</button>
            `;

            task.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);

            task.querySelector('button').addEventListener('click', removeTask);

            tasks.appendChild(task);
            taskInput.value = '';

            taskTLS();

            sortTasks()
}

function toggleDone(e){
    const task = e.target.parentNode;
    task.querySelector('p').classLit.toggle('done');

    taskTLS();

}

function removeTask(e){
    const task = e.target.parentNode;
    tasks.removeChild(task);

    taskTLS();

}

function taskTLS() {
    const taskList = Array.from(tasks.children);

    const taskTexts = taskList.map(task => task.querySelector('p').innerText);
    localStorage.setItem('tasks', JSON.stringify(taskTexts));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        const taskTexts = JSON.parse(storedTasks);

        tasks.innerHTML = '';

        taskTexts.forEach(taskText => {
            const task = document.createElement('li');
            task.innerHTML = `
                <input type="checkbox">
                <p>${taskText}</p>
                <button type="button">Delete</button>
            `;

            task.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);
            task.querySelector('button').addEventListener('click', removeTask);

            tasks.appendChild(task);
        });
    }
}