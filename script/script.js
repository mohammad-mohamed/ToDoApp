const form = document.getElementById('form');
const taskInput = document.getElementById('taskAdded'); 
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

    sorted.forEach(task => {
        tasks.appendChild(task);
    });

    taskTLS();
}

function addTask(e) {
    e.preventDefault();
    if (taskInput.value.trim() === '') {
        return;
    }

    const task = {
        id: Date.now(),
        name: taskInput.value,
        createdDate: new Date().toISOString(),
        completed: false
    };

    const taskElement = document.createElement('li');
    taskElement.dataset.id = task.id;
    taskElement.innerHTML = `
        <input type="checkbox">
        <p>${task.name}</p>
        <button type="button">X</button>
    `;

    taskElement.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);
    taskElement.querySelector('button').addEventListener('click', removeTask);

    tasks.appendChild(taskElement);
    taskInput.value = '';

    taskTLS();
    sortTasks();
}

function toggleDone(e) {
    const taskElement = e.target.parentNode;
    const taskId = taskElement.dataset.id;
    const taskList = getTasks();

    const task = taskList.find(task => task.id == taskId);
    task.completed = e.target.checked;

    taskElement.querySelector('p').classList.toggle('done', task.completed);
    saveTasks(taskList);
}

function removeTask(e) {
    const taskElement = e.target.parentNode;
    const taskId = taskElement.dataset.id;
    const taskList = getTasks();

    const updatedTaskList = taskList.filter(task => task.id != taskId);
    tasks.removeChild(taskElement);

    saveTasks(updatedTaskList);
}

function taskTLS() {
    const taskList = Array.from(tasks.children).map(taskElement => {
        return {
            id: taskElement.dataset.id,
            name: taskElement.querySelector('p').innerText,
            createdDate: new Date().toISOString(),
            completed: taskElement.querySelector('input[type="checkbox"]').checked
        };
    });
    saveTasks(taskList);
}

function saveTasks(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function getTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function loadTasks() {
    const storedTasks = getTasks();

    tasks.innerHTML = '';

    storedTasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.dataset.id = task.id;
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <p>${task.name}</p>
            <button type="button">X</button>
        `;

        taskElement.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);
        taskElement.querySelector('button').addEventListener('click', removeTask);

        tasks.appendChild(taskElement);
    });
}
