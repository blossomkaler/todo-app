const addTodo = document.querySelector('.add-todo');
const todoList = document.querySelector('.list-preview');
const todos =[];


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

/*``````````````````````````CHANGE THEME````````````````````````````````*/
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const bgImg = document.querySelector('.bg');

moonIcon.addEventListener('click',function(){    
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block' ;
    bgImg.style.backgroundImage = 'url("/images/bg-desktop-dark.jpg")'
   
});

sunIcon.addEventListener('click',function(){    
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none' ;
    bgImg.style.backgroundImage = 'url("/images/bg-desktop-light.jpg")'
});