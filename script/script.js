const form = document.getElementById('form');
const taskInput = document.getElementById('task');
const tasks = document.getElementById('tasks');

form.addEventListener('submit', addTask);

function addTask(e){
    e.preventDefault();
    if(taskInput.value == '')
    {
        return;
    }

    const task = document.createElement('li');
    task.innerHTML = `
            <input type="checkbox">
            <p>${taskInput.value}</p>
            <button type="buttton">Delete</button>
            `;

            task.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);

            task.querySelector('button').addEventListener('click', removeTask);

            tasks.appendChild(task);
            taskInput.value = '';
}

function toggleDone(e){
    const task = e.target.parentNode;
    task.querySelector('p').classLit.toggle('done')
}

function removeTask(e){
    const task = e.target.parentNode;
    tasks.removeChild(task);
}