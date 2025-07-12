const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const filterCompleted = document.getElementById("filter-completed");
const sortButton = document.getElementById("sort-priority");

let tasks = [];

taskForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.querySelector("input[name='priority']:checked");

    if (!title) return alert("Başlık zorunludur.");
    if (!priority) return alert("Lütfen bir öncelik seçin.");

    const task = {
        id: Date.now(),
        title,
        description,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = "";

    const filtered = filterCompleted.checked ?
        tasks.filter(task => task.completed) :
        tasks;

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
      <strong>${task.title}</strong> - ${task.description || ''} 
      <em>(${task.priority})</em>
      <button data-id="${task.id}" class="toggle">${task.completed ? "Geri Al" : "Tamamlandı"}</button>
      <button data-id="${task.id}" class="delete">Sil</button>
    `;
        li.className = task.completed ? "completed" : "";
        taskList.appendChild(li);
    });
}


taskList.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
        const id = Number(e.target.dataset.id);
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    if (e.target.classList.contains("toggle")) {
        const id = Number(e.target.dataset.id);
        tasks = tasks.map(task => {
            if (task.id === id) task.completed = !task.completed;
            return task;
        });
        renderTasks();
    }
});

filterCompleted.addEventListener("change", renderTasks);

sortButton.addEventListener("click", function() {
    const priorityOrder = { "Düşük": 1, "Orta": 2, "Yüksek": 3 };
    tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    renderTasks();
});