/*``````````````````````````ADDING TODOs````````````````````````````````*/
const addTodo = document.querySelector('.add-todo');
const todoList = document.querySelector('.list-preview');
let todos = JSON.parse(localStorage.getItem('TASKS')) || [];   // check for TASKS in local storage or start with empty array or no todos

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

          location.reload();
    }
});

function populateList(tasks, taskList) {   //tasks will be an array of objects (todos)
    taskList.innerHTML = tasks.map((task, i) => {
        return `
        <li>
        <input type="checkbox" class="cboxes" data-index=${i} id= "item${i}" ${task.done ? 'checked' : ''} />
        <label for = "item${i}"
        >${task.newTask}</label>
        </li>   
        `;
    }).join('');

}

populateList(todos, todoList);    //ensures thats TASKS from local storage(if any) are retrieved first

/*````````````````````Handling check on page refresh``````````````````````*/
todoList.addEventListener('click', toggleDone);   

function toggleDone(e) {
    if (!e.target.matches('input')) return;    // skip this unless it's input

    const el = e.target;
    const index = el.dataset.index;
    let checkedElement =document.querySelector("label[for='" + el.id + "']");
    const nextSibling = e.target.nextElementSibling;

    todos[index].done = !todos[index].done;

    if(el.checked) nextSibling.style.textDecoration = "underline";

/*     if(todos[index].done) {checkedElement.classList.add('checked-item');}
    else {checkedElement.classList.remove('checked-item');}
   */      
    localStorage.setItem('TASKS', JSON.stringify(todos));
    populateList(todos, todoList);
    location.reload();
    e.preventDefault();
}
/*```````````````````````````````````````````````````````````````````````` */
/* const cBoxesArray = [...document.querySelectorAll('.cboxes')] ;

console.log(cBoxesArray);

cBoxesArray.forEach(box =>{
    console.log(box.nextElementSibling);
    const nextSibling = box.nextElementSibling;
    if(box.checked) nextSibling.classList.add('checked-item') ;
})
  */
/*`````````````````````````````````````````````````````````````````*/
const checkboxes = [...document.querySelectorAll('.cboxes')];

const allTodos = document.querySelector('.all');
allTodos.addEventListener('click', showAll);

function showAll(){
    checkboxes.forEach(box =>{
        const parentNode = box.parentNode;
        parentNode.style.display= 'flex';
    });
}    

/*````````````````````````````SHOW ACTIVE``````````````````````````````````*/
const activeTodos = document.querySelector('.active-todo');
activeTodos.addEventListener('click',showActive); 

function showActive(){
    checkboxes.forEach(box =>{
        const parentNode = box.parentNode;
        if(box.defaultChecked) parentNode.style.display= 'none';
        else parentNode.style.display= 'flex';
    }); 
}

/*``````````````````````````SHOW COMPLETED````````````````````````````````*/
const compTodos = document.querySelector('.complete');
compTodos.addEventListener('click',showComp);

function showComp(){
    checkboxes.forEach(box =>{
        const parentNode = box.parentNode;
        if(!box.defaultChecked) parentNode.style.display= 'none';
        else parentNode.style.display= 'flex';
    }); 
}

/*``````````````````````````CLEAR COMPLETED````````````````````````````````*/
const clearComp = document.querySelector('.clear');
clearComp.addEventListener('click',clearAll);

function clearAll(){
    todos = todos.filter(todo =>  todo.done == false);
    localStorage.setItem('TASKS', JSON.stringify(todos));
    populateList(todos, todoList);
}

/*``````````````````````````CHANGE THEME````````````````````````````````*/
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
    document.querySelector('.todo-status').classList.add('dark');
});

sunIcon.addEventListener('click',function(){    
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none' ;
    bgImg.style.backgroundImage = 'url("/images/bg-desktop-light.jpg")';
    document.body.style.backgroundColor = 'white';
    addTodo.classList.remove('dark');
    todoList.classList.remove('dark');
    document.querySelector('.todo-list').classList.remove('dark');
    document.querySelector('.todo-status').classList.remove('dark');

});

