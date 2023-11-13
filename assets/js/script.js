function toDo() {

    const inputTask = document.querySelector('.input-task');
    const addBtn = document.querySelector('.btn-task');
    const tasks = document.querySelector('.tasks');
    
    function createLi() {
        const li = document.createElement('li');
        return li;
    }
    
    function createBtn(li) {
        const btn = document.createElement('button');
        btn.innerText = 'Apagar';
        btn.setAttribute('class', 'erase');
        li.appendChild(btn);
    }
    
    function createTask(task) {
        const li = createLi();
        li.innerText = task;
        tasks.appendChild(li);
        createBtn(li);
        saveTasks();
        clearInput();
    }
    
    function saveTasks() {
        const liTasks = tasks.querySelectorAll('li');
        const tasksList = [];
    
        for (let task of liTasks) {
            let taskText = task.innerText;
            taskText = taskText.replace('APAGAR', '').trim();
            tasksList.push(taskText);
        }
    
        const taskJSON = JSON.stringify(tasksList);
        localStorage.setItem('tasks', taskJSON);
    }
    
    function addSavedTasks() {
        const tasks = localStorage.getItem('tasks');
        const tasksList = JSON.parse(tasks);
    
        for (let task of tasksList) {
            createTask(task);
        }
    }
    
    function clearInput(){
        inputTask.value = '';
        inputTask.focus();
    }
    
    inputTask.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            if (!inputTask.value) return;
            createTask(inputTask.value); 
        }
    });
    
    addBtn.addEventListener('click', () => {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    });
    
    document.addEventListener('click', (e) => {
        const el = e.target;
    
        if (el.classList.contains('erase')) {
            el.parentElement.remove();
            saveTasks();
        }
    });
    
    addSavedTasks();
}

toDo();
