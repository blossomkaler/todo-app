/*``````````````````````````ADDING TODOs````````````````````````````````*/
const addTodo = document.querySelector('.add-todo');
const todoList = document.querySelector('.list-preview');
const todos = JSON.parse(localStorage.getItem('TASKS')) || [];   // check for TASKS in local storage or start with empty array or no todos


addTodo.addEventListener('keyup',function(e){
    let newTask = document.querySelector('[name = todo]').value;
    if(e.keyCode === 13 && newTask != '' ){
        e.preventDefault;
        const todo = {
            newTask,
            done: false
          };

          todos.push(todo);
          populateList(todos, todoList);
          localStorage.setItem('TASKS', JSON.stringify(todos));  // adding todos array to local storage under title-TASKS
          document.querySelector('[name = todo]').value = '';
    }
});

function populateList(tasks, taskList) {   //tasks is an array of objects
    taskList.innerHTML = tasks.map((task, i) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id= "item${i}" ${task.done ? 'checked' : ''} />
        <label for = "item${i}">${task.newTask}</label>
        </li>   
        `;
    }).join('');
}

populateList(todos, todoList);    //ensures thats TASKS from local storage are retrieved first


/*````````````````````Handling check on page refresh``````````````````````
itemsList.addEventListener('click', toggleDone);

function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }
  
  
``````````````````````````CHANGE THEME````````````````````````````````*/
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const bgImg = document.querySelector('.bg');

moonIcon.addEventListener('click',function(){    
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block' ;
    bgImg.style.backgroundImage = 'url("/images/bg-desktop-dark.jpg")';
    document.body.style.backgroundColor = 'black';
    addTodo.classList.add('dark');
    todoList.classList.add('dark');
    document.querySelector('.todo-list').classList.add('dark');
    document.querySelector('.todo-status-mobile').classList.add('dark');
});

sunIcon.addEventListener('click',function(){    
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none' ;
    bgImg.style.backgroundImage = 'url("/images/bg-desktop-light.jpg")';
    document.body.style.backgroundColor = 'white';
    addTodo.classList.remove('dark');
    todoList.classList.remove('dark');
    document.querySelector('.todo-list').classList.remove('dark');
    document.querySelector('.todo-status-mobile').classList.remove('dark');

});