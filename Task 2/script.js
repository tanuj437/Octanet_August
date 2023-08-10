const taskForm = document.getElementById("task-form");
const list = document.getElementById("list");

let tasks = [];

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskTitle = document.getElementById("task-title").value;
    const taskPriority = document.getElementById("task-priority").value;
    
    const task = {
        title: taskTitle,
        priority: taskPriority,
        completed: false
    };
    
    tasks.push(task);
    tasks = sortTasksByPriority(tasks);
    
    displayTasks();
    taskForm.reset();
});

list.addEventListener("click", function(event) {
    const target = event.target;
    
    if (target.classList.contains("complete")) {
        const index = parseInt(target.getAttribute("data-index"));
        tasks[index].completed = !tasks[index].completed;
        displayTasks();
    }
    
    if (target.classList.contains("delete")) {
        const index = parseInt(target.getAttribute("data-index"));
        tasks.splice(index, 1);
        displayTasks();
    }
});

function sortTasksByPriority(taskList) {
    const priorityOrder = {
        "urgent": 1,
        "important": 2,
        "not-important": 3
    };
    
    return taskList.sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}

function displayTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="complete${task.completed ? " completed" : ""}" data-index="${index}">✓</span>
            <span class="task-title${task.completed ? " completed" : ""}">${task.title}</span>
            <span class="priority ${task.priority}">${task.priority}</span>
            <span class="delete" data-index="${index}">Delete</span>
        `;
        list.appendChild(listItem);
    });
}

displayTasks();
